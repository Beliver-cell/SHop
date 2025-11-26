import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async () => {
    try {
        if (!process.env.CLOUDINARY_NAME || process.env.CLOUDINARY_NAME === 'your_cloudinary_name') {
            console.log('⚠️  Cloudinary not configured. Please set CLOUDINARY_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_SECRET_KEY environment variables.')
            console.log('⚠️  Image upload features will not work until Cloudinary is configured.')
            return;
        }
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY,
        })
        console.log('✅ Cloudinary configured successfully')
    } catch (error) {
        console.log('Cloudinary configuration failed:', error.message)
    }
}

export default connectCloudinary;