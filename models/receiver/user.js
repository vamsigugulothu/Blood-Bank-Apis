const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    bloodgroup: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
})

const requestSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    hospital_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    requested_blood: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['request','pending','approved'],
        default: 'pending'
    },
})

const users = mongoose.model("users", userSchema)
const bloodRequests = mongoose.model("bloodRequests", requestSchema)
module.exports = {users, bloodRequests};
