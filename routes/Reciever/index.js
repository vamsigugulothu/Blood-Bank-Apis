const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const middleware = require("../Middleware")

const { users,bloodRequests } = require("../../models/receiver/user");
const { bloodSample } = require("../../models/hospital/hospital")


router.post("/login", async(req,res) => {
    try{
        const { email, password} = req.body;
        const exist = await users.findOne({email});
        if(!exist) {
            return res.status(400).send("User not exists..please register");
        }
        if(password !== exist.password){
            return res.status(400).send("Invalid password");
        }
        const token = jwt.sign( {id: exist._id },"jwtkey", {expiresIn: '1h'})
        return res.status(200).json(token);

    } catch(err) {
        res.status(400).send("Something went wrong")
    }
})

router.post("/register", async(req,res) => {
    try{
        const { username, email, bloodgroup, password } = req.body;
        const data = await users.findOne({email})
        if(data){
            return res.send("User Already registered");
        }
        let newUser = new users({
            username, email, bloodgroup, password
        })
        newUser.save();
        return res.status(200).send("Registered Successfully",);
    } catch(err) {
        return res.status(400).send("Error")
    }
})

// blood request by user
router.post("/request-blood/:id",middleware, async(req, res) => {
    try{
        const userid = req.userData.id // user id
        const userData = await users.findOne({_id: userid});
        
        const id = req.params.id;  //blood sample id
        const data = await bloodSample.findOne({_id:id})

        const exist = await bloodRequests.find({user_id:userData._id})
        const result = exist?.filter((sample) => sample.hospital_id.equals(data.hospital_id))

        if(!userData) {
            return res.status(400).send("Token error")
        }
        if(!data) {
            return res.status(400).send("Blood sample not found")
        }
        if(result?.length > 0) {
            return res.status(400).send("Multiple requests from same hospital")
        }
        if(userData.bloodgroup !== data.blood_type) {
            return res.status(400).send("Sorry you can't request..Blood group mismatch.")
        }
 
        let requested_blood = new bloodRequests({
            user_id: userData._id,
            hospital_id: data.hospital_id,
            username: userData.username,
            requested_blood: userData.bloodgroup,
            quantity: req.body.quantity
        })

        await requested_blood.save();
        return res.status(200).send("Request sent successfully");
    } catch(err) {
        console.log(err)
        return res.status(400).send("Error")
    }
})

module.exports = router