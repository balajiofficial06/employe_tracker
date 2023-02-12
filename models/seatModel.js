const mongoose = require("mongoose");

const seatSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    numberOfSeats: {
        type: Number,
        required: true
    },
    roomNumber: {
        type: String,
        rquired: true
    },
    covidProtocol: {
        type: Boolean,
        required: true
    },
    seatsBookedDetails: {
        type: Array,
        default: []
    },
    seatsAvailable: {
        type: Number,
    },
}, {
    timestamps: true,
});


seatSchema.pre('save', function (next) {
    if (this.seatsBookedDetails.length < this.numberOfSeats) {
        this.seatsAvailable = this.numberOfSeats - this.seatsBookedDetails.length;
    } else {
        this.seatsAvailable = 0
    }
    next();
})

const seatModel = mongoose.model("seat", seatSchema);

module.exports = seatModel;
