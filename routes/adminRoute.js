const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const managerModel = require("../models/managerModel")
const authMidlleware = require("../middlewares/authMiddleware");

router.get("/userList", authMidlleware, async (req, res) => {
    try {

        const user = await userModel.find({ "isAdmin": false });

        res.status(200).send({ message: "Users fetched successfully", success: true, data: user })

    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ message: "somthing went wrong", success: false });
    }
});

router.get("/managerList", authMidlleware, async (req, res) => {
    try {

        const Manager = await managerModel.find();

        res.status(200).send({ message: "Managers fetched successfully", success: true, data: Manager })

    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ message: "somthing went wrong", success: false });
    }
});

router.post("/change-manager-account-status", authMidlleware, async (req, res) => {
    try {

        const { managerId, status } = req.body;
        const manager = await managerModel.findByIdAndUpdate(managerId, {
            status: status
        });

        const user = await userModel.findOne({ _id: manager.userId });
        console.log(user)
        const unSeenNotifications = user.unSeenNotifications;
        unSeenNotifications.push({
            type: "new-manager-request",
            message: `Your manager account has been ${status}`,
            onclickPath: "/notificaiton",
        });
        user.isManager = status === 'approved' ? true : false;
        await user.save();

        res.status(200).send({
            message: "User is updated as manager",
            success: true,
            data: manager
        });

    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ message: "somthing went wrong", success: false });
    }
});

module.exports = router;