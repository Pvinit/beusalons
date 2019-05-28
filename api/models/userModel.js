'use strict';

// user schema definition (Active)

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    userSchema = new Schema({

        name: {
            type: String,
            trim: true
        },
        gender: {
            type: String  // Male , Female
        },
        noOfOrders: {
            type: Number, default: 0
        },
        status: {
            type: String
            , default: 'ACTIVE', uppercase: true
        }
    }, {
            timestamps: true
        });
module.exports = mongoose.model('user', userSchema, 'user');

