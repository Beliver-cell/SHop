import mongoose from 'mongoose'
import prouductModel from '../models/productModel.js';

const connectDB = async() => {
    mongoose.connection.on('connected', ()=>{
        console.log('Connected to MongoDB')
    })
    await mongoose.connect(`${process.env.mongodb_URI}`)
}

export default connectDB;