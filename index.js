const express = require("express");
const mongoose = require("mongoose")
const app = express();

const PORT = process.env.PORT || 8000;

const router = require("./routes/index")
app.use(express.json());

const dbUri = "mongodb+srv://vamsig:vamsig@cluster0.bp6fp64.mongodb.net/?retryWrites=true&w=majority"
const connectDb = async () => {
    await mongoose.connect(dbUri).then(() => {
            console.info(`Connected to database`)
        },
        error => {
            console.error(`Connection error: ${error.stack}`)
            process.exit(1)
        }
    )
}

connectDb().catch(error => console.error(error))

app.get("/data", (req,res) => {
    res.send("Hello")
})

app.use("/api",router);

app.listen(PORT, () => console.log("server running"));