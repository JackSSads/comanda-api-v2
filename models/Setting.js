const mongoose = require('mongoose');

const Settings = mongoose.model("Settings", {
    establishmentName: {
        type: String,
        required: true
    },
    serviceCharge: {
        type: Boolean,
        default: false
    },
    serviceChargePercentage: {
        type: Number,
        default: 0
    },
    imagePix: {
        type: String,
        default: ""
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = Settings;