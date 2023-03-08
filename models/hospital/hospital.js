const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    hospital_name: {
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

//blood samples data posted by hospitals
const bloodSampleSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  blood_type: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true
  }
});


const hospital = mongoose.model("hospitals", hospitalSchema)
const bloodSample = mongoose.model("BloodSamples", bloodSampleSchema)
module.exports = {hospital, bloodSample};
