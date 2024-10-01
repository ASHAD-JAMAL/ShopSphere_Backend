const httpStatusCode = require("../../constants/httpStatusCode");
const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { name, email, password} = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        error: true,
        success: false,
        message: "User Already Exist",
      });
    }

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
    if (!name) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        error: true,
        success: false,
        message: "Please Provide Name",
      });
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something Went Wrong");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(httpStatusCode.CREATED).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User Created Successfully!",
    });
    
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
