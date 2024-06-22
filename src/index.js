// require('dotenv').config({path: './env'})
import dotenv from 'dotenv'

import connectDB from "./db/index.js";

dotenv.config({
    path: './.env'
})

connectDB()






/*
import express from 'express'
const app = express()
import mongoose, { connect } from "mongoose";
import { DB_NAME } from "./constants";

;(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("errror",(error) => {
            console.log("ERRROR: ",error);

            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on {process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR: ",error)
        throw error
    }
})() 
*/