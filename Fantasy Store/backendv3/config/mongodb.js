import mongoose from 'mongoose'
import prouductModel from '../models/productModel.js';

const connectDB = async() => {
    mongoose.connection.on('connected', ()=>{
        // MongoDB connected
    })
    
    mongoose.connection.on('error', (err)=>{
        // MongoDB connection error
    })
    
    try {
        if (!process.env.mongodb_URI || process.env.mongodb_URI === 'mongodb://localhost:27017/fantasy-store') {
            return;
        }
        await mongoose.connect(`${process.env.mongodb_URI}`)
    } catch (error) {
        // MongoDB connection failed - server will continue running
    }
}

export default connectDB;