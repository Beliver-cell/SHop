import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      response: "Not authorized ! Please try again",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.jwtSecret);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    res.json({
      success: false,
      msg: error.message,
    });
  }
};

export default authUser;
