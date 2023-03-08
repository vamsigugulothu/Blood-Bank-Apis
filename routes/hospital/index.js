const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const middleware = require("../Middleware")
const {hospital, bloodSample} = require("../../models/hospital/hospital")
const { bloodRequests} = require("../../models/receiver/user");

router.post("/login", async(req,res) => {
    try{
        const { email, password} = req.body;
        const exist = await hospital.findOne({email});
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

//hospital register

router.post("/register", async(req,res) => {
    try{
        const { hospital_name, email, password} = req.body;
        const data = await hospital.findOne({email})
        if(data){
            return res.send("User Already registered");
        }
        let newUser = new hospital({
            hospital_name, email, password
        })
        newUser.save();
        return res.status(200).send("Registered Successfully",);
    } catch(err) {
        return res.status(400).send("Error")
    }
})

//POST endpoint to add the blood sample info

router.post("/blood-sample", middleware, async(req,res) => {
    try {
        const id = req.userData.id;
        const user = await hospital.findOne({ _id: id });
        if(user){
            const bloodData = new bloodSample({
                hospital_id: user._id,
                blood_type:  req.body.blood_type,
                quantity: req.body.quantity
            })
            await bloodData.save().then(() => {
                res.status(200).send("Successfully Added the blood sample",);
            }).catch(err => res.status(400).send(err))
        } else {
            return res.status(400).send("Token ")
        }
    } catch(err) {
        return res.status(400).send("Error")
    }
})

//PUT endpoint to update the respective blood info with id

router.put("/blood-sample/:sampleId", middleware, async(req,res) => {
    try {
        const id = req.params.sampleId;
        const { blood_type, quantity } = req.body;
        // Find the blood sample with the specified ID and update its fields
        const bloodData = await bloodSample.findByIdAndUpdate(id, { blood_type, quantity }, { new: true });
    
        // Check if the blood sample was found and updated
        if (!bloodData) {
          return res.status(404).send('Blood sample not found');
        }
        res.status(200).send("Successfully updated");
      } catch (err) {
        res.status(500).send('Server error');
      }
})

//to get all the blood samples
router.get("/all-blood-sample", async(req,res) => {
    try{
        const bloodSamples = await bloodSample.find();
        res.send(bloodSamples)
    } catch(err){
        res.status(500).send('Server error');
    }
})

// to delete blood sample
router.delete('/delete/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const BloodSample = await bloodSample.findByIdAndDelete(id);
  
      // Check if the blood sample was found and deleted
      if (!BloodSample) {
        return res.status(404).send('Blood sample not found');
      }
      // Return a success message
      res.send('Blood sample deleted successfully');
    } catch (err) {
      res.status(500).send('Server error');
    }
});

//get blood samples of current hospital
router.get("/blood-samples",middleware, async(req,res) => {
    try{
        const id = req.userData.id; //"64077ec52b12ea66d23e6d3c" 
        const mySamples = await bloodSample.find({hospital_id: id});
        return res.send(mySamples)
    } catch(err) {
        res.status(500).send('Server error');
    }
})

//get all the blood requests of current hospital
router.get("/blood-requests",middleware, async(req,res) => {
    try{
        const id = req.userData.id;
        const myRequests = await bloodRequests.find({hospital_id: id})
        return res.status(200).send(myRequests)
    } catch(err){
        res.status(500).send('Server error');
    }
})
  
  

module.exports = router;