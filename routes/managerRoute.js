const express = require("express");
const router = express.Router();
const managerModel = require("../models/managerModel")
const seatModel = require("../models/seatModel");
const authMidlleware = require("../middlewares/authMiddleware");

router.post("/seat-allocation", async (req, res) => {
    try {
        const seat = new seatModel(req.body)
        seat.save()
        res.status(200).send({ message: "Seat allocated successfully", success: true })
    } catch (error) {
        res
            .status(500)
            .send({ message: "error while creating the user", success: false });
    }
});

router.get("/managerDetails", authMidlleware, async (req, res) => {
    try {

        const Manager = await managerModel.find();

        res.status(200).send({ message: "Managers fetched successfully", success: true, data: Manager })
        //change it json format while sending the data

    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ message: "somthing went wrongr", success: false });
    }
});

module.exports = router