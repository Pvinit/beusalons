
// Require all MiddleWare  ============
var apiResponseHandler = require("../../middleWares/responseHandler");

// Require all mongodb schema==========
const user = require("../models/userModel");
const order = require("../models/orderModel");
const mongoose = require("mongoose");
const moment = require("moment");
var async = require("async");

var userApi = {

    "addUser": (req, res) => {
        try {
            var saveUserDetail = new user(req.body);
            saveUserDetail.save((err, success) => {
                if (err) {
                    apiResponseHandler.responseWithOutData(res, 500, "Server error");
                } else {
                    apiResponseHandler.responseWithObjectData(res, 200, "user add successfully", success);
                }
            });
        }
        catch (e) {
            console.log("error----addUser | POST" + e);
            apiResponseHandler.responseWithOutData(res, 500, "Something went wrong ");
        }
    },
    "createOrder": (req, res) => {
        try {
            req.body['date'] = moment(req.body.date).format('MMMM Do YYYY')
            var saveOrderDetail = new order(req.body);
            saveOrderDetail.save((err, success) => {
                if (err) {
                    apiResponseHandler.responseWithOutData(res, 500, "Server error");
                } else {
                    apiResponseHandler.responseWithObjectData(res, 200, "order save successfully", success);
                }
            });
        } catch (e) {
            console.log("error----add Order | POST" + e);
            apiResponseHandler.responseWithOutData(res, 500, "Something went wrong ");
        }
    },
    "orderDetails": (req, res) => {
        order.aggregate([
            {
                $lookup: {
                    from: "user",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $group: {
                    _id: "$userId",
                    "userId": { $first: "$user._id" },
                    "name": { $first: "$user.name" },
                    "noOfOrders": { $sum: 1 },
                    "totalSubtotal": { $sum: "$subtotal" }
                }
            },
            {
                $project: {
                    _id: 0,
                    "userId": "$userId",
                    "name": "$name",
                    "noOfOrders": "$noOfOrders",
                    "averageBillValue": { $trunc: { $divide: ["$totalSubtotal", "$noOfOrders"] } }
                }
            }
        ]).exec((err, data) => {
            if (err) {
                apiResponseHandler.responseWithOutData(res, 500, "Server error");
            } else {

                apiResponseHandler.responseWithObjectData(res, 200, "order List", data);
            }
        })
    },
    "updateUsersDetail": (req, res) => {
        try {
            // if userList array to update multiple user details
            if (req.body.userList.length > 0) {
                async.eachSeries(req.body.userList, function updateObject(obj, done) {
                    user.update({ "_id": mongoose.Types.ObjectId(obj.userId) },
                        {
                            $set: { "noOfOrders": obj.noOfOrders }
                        }, done);
                }, function allDone(err, success) {
                    if (err) apiResponseHandler.responseWithOutData(res, 500, "Server error");
                    return res.status(200).send({
                        "success": true,
                        "responseMessage": "Successfully updated."
                    });
                });
            }
            // you provide single object to update single user detail
            else {
                apiResponseHandler.responseWithOutData(res, 403, "user List array not found!");
            }
        } catch (e) {
            console.log("error----update User | POST" + e);
            apiResponseHandler.responseWithOutData(res, 500, "Something went wrong ");
        }
    },
    "updateUser": (req, res) => {
        user.update({ "_id": mongoose.Types.ObjectId(req.body.userId) },
            {
                $set: { "noOfOrders": req.body.noOfOrders }
            }, (err, success) => {
                if (err) apiResponseHandler.responseWithOutData(res, 500, "Server error");
                return res.status(200).send({
                    "success": true,
                    "responseMessage": "Successfully updated."
                });
            });
    }
};

module.exports = userApi;