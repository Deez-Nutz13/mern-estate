import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"


dotenv.config()
mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Connected To DB..."))
        .catch((err) => console.log(err))

const app = express()
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.listen(3000, () => {
    console.log(`Server is listening on port 3000...`)
})