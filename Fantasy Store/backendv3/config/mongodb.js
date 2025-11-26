import mongoose from 'mongoose'
import prouductModel from '../models/productModel.js';

const connectDB = async() => {
    mongoose.connection.on('connected', ()=>{
        console.log('Connected to MongoDB')
    })
    
    mongoose.connection.on('error', (err)=>{
        console.log('MongoDB connection error:', err.message)
    })
    
    try {
        if (!process.env.mongodb_URI || process.env.mongodb_URI === 'mongodb://localhost:27017/fantasy-store') {
            console.log('⚠️  MongoDB URI not configured. Please set the mongodb_URI environment variable.')
            console.log('⚠️  The server will run but database features will not work until MongoDB is connected.')
            return;
        }
        await mongoose.connect(`${process.env.mongodb_URI}`)
    } catch (error) {
        console.log('MongoDB connection failed:', error.message)
        console.log('⚠️  The server will continue running but database features will not work.')
    }
}

export default connectDB;