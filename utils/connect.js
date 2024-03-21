import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URL


export const connect = async () => {

    try{
       await mongoose.connect(MONGODB_URL);
       console.log('Connected to DB')
    } catch(error) {
        console.log('Error connect to DB', error)
    }
}