import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Connected To DB..."))
        .catch((err) => console.log(err))

const app = express()


app.listen(3000, () => {
    console.log(`Server is listening on port 3000...`)
})