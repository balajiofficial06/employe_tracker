const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMidlleware = require("../middlewares/authMiddleware");
const managerModel = require("../models/managerModel");
const seatModel = require("../models/seatModel");

router.post("/register", async (req, res) => {
  try {
    const userExists = await userModel.findOne({ email: req.body.email });

    if (userExists) {
      res
        .status(200)
        .send({ message: "user is already created", success: true });
    } else {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);

      req.body.password = await bcrypt.hash(password, salt);
      const newuser = new userModel(req.body);
      await newuser.save();
      res
        .status(200)
        .send({ message: "user is created successfully", success: true });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "error while creating the user", success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res
        .status(200)
        .send({ message: "user mail id is not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      res.status(200).send({ message: "password is invalid", success: false });
    } else {
      const token = await jwt.sign({ user: user._id }, process.env.JWTSECRET, {
        expiresIn: "1d",
      });

      res
        .status(200)
        .send({ message: "logined successfully", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error while logging in", success: false, error });
  }
});

router.post("/get-user-info", authMidlleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "user is not found", success: false });
    } else {
      return res.status(200).send({ data: user, success: true });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "somthing went wrong", success: false });
  }
});

router.post("/apply-manager-account", authMidlleware, async (req, res) => {
  try {
    const newManager = new managerModel({ ...req.body, status: "pending" });
    await newManager.save((err, res) => {
      if (err) return handleError(err);
      else return console.log("Result: ", res);
    });
    console.log(newManager);
    const admin = await userModel.findOne({ isAdmin: true });

    const unSeenNotifications = admin.unSeenNotifications;
    unSeenNotifications.push({
      type: "new-manager-request",
      message: `${newManager.firstName} ${newManager.lastName} has applied for manager`,
      data: {
        managerId: newManager._id,
        name: newManager.firstName + " " + newManager.lastName,
      },
      onclickPath: "/admin/manager",
    });
    await userModel.findByIdAndUpdate(admin._id, { unSeenNotifications });
    res
      .status(200)
      .send({ message: "User is created successfully", success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "somthing went wrong", success: false });
  }
});

router.post("/mark-all-notification-as-seen", authMidlleware, async (req, res) => {
  try {

    const user = await userModel.findById(req.body.userId)
    const unSeenNotifications = user.unSeenNotifications;
    const seenNotifications = user.seenNotifications;
    seenNotifications.push(...unSeenNotifications)
    user.unSeenNotifications = []
    user.seenNotifications = seenNotifications
    console.log(user.SeenNotifications)

    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notification marked as seen",
      data: updatedUser
    })

  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "somthing went wrong", success: false });
  }
});

router.post("/delete-all-notification", authMidlleware, async (req, res) => {
  try {

    const user = await userModel.findById(req.body.userId)
    user.unSeenNotifications = []
    user.seenNotifications = []
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Deleted all the messages",
      data: updatedUser
    })

  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "somthing went wrong", success: false });
  }
});

router.get("/block-seats", authMidlleware, async (req, res) => {
  try {

    const seats = await seatModel.find();

    res.status(200).send({ message: "Seat details have fetched", success: true, data: seats })
    //change it json format while sending the data

  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "somthing went wrong", success: false });
  }
});

router.post("/bookSeat", authMidlleware, async (req, res) => {
  try {
    const seat = await seatModel.findById(req.body.id,)
    if (seat.seatsAvailable != 0) {
      const userDetails = {
        name: req.body.user.name,
        seatNumber: seat.numberOfSeats - seat.seatsAvailable
      }
      seat.seatsBookedDetails.push(userDetails)
      await seat.save()
      const notification = {
        type: "Seat-booking-confimation",
        message: `Your seat confirmation number is ${seat.roomNumber} seat -${userDetails.seatNumber} LW`,
        onclickPath: "/notificaiton",
      }
      const user = await userModel.updateOne({ _id: req.userId }, { $push: { bookedSeat: seat._id, unSeenNotifications: notification } })

      res.status(200).send({ message: "Seat Booked successfully", success: true, data: userDetails.seatNumber })
    }
    else {
      res.status(200).send({ message: "Sloat is full", success: false })
    }

  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "somthing went wrong", success: false });
  }
});

module.exports = router;
