import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token){
            return res.json({success : false, message: "Not Authorized Login Again"})
        }
        const token_decode = jwt.verify(token, process.env.jwtSecret);
        if(token_decode !== process.env.admin_Email + process.env.admin_Password) {
            return res.json({success : false, message: "Not Authorized Login Again"})
        }
        next()
    }
    catch (error){
        console.log(error)
        res.json({ success: false, message: error.message})
    }
}

export default adminAuth