const express = require("express");
const router = express.Router();

const hospital = require("./hospital/index");
const reciver = require("./Reciever/index")

router.get("/", (req,res) => {
    res.send("inside")
})

router.use("/hospital",hospital)
router.use("/user",reciver);

module.exports = router