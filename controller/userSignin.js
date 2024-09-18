const httpStatusCode = require("../constants/httpStatusCode");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        error: true,
        success: false,
        message: "Please Provide Email",
      });
    }
    if (!password) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        error: true,
        success: false,
        message: "Please Provide Password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        error: true,
        success: false,
        message: "User Not Found",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    console.log("checkPassword", checkPassword);
    
    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      const tokenOption = {
        httpOnly: true,
        secure: true,
      };
      res.cookie("token", token, tokenOption).status(httpStatusCode.Ok).json({
        message: "User Logged In Successfully",
        data: token,
        success: true,
        error: false,
      });

    } else {
      return res.status(httpStatusCode.UNAUTHORIZED).json({
        error: true,
        success: false,
        message: "Please check your password",
      });
    }
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
module.exports = userSignInController;
