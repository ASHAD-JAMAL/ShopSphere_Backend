const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Please Provide Email",
      });
    }
    if (!password) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Please Provide Password",
      });
    }
    if (!name) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Please Provide name",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something Went Wrong");
    }

    const payload = {
      ...req.body,
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();
    console.log(saveUser);

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User Created Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
