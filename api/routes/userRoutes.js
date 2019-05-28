// Require the package ============
let express = require("express");
let router = express.Router();

// routes all api ======

let userApi = require("../controllers/userController");


router.post("/addUser", userApi.addUser);
router.post("/createOrder", userApi.createOrder);
router.get("/orderDetails", userApi.orderDetails);
router.post("/updateUsersDetail", userApi.updateUsersDetail);
// for single updation
router.post("/updateUser", userApi.updateUser);




module.exports = router;