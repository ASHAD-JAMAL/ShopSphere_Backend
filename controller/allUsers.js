const httpStatusCode = require("../constants/httpStatusCode");
const userModel = require("../models/userModel");

async function allUsers(req, res) {
  try {
    console.log("userId::--", req.userId);
    const allUser = await userModel.find();
    res.json({
      message: "All User",
      data: allUser,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(httpStatusCode.BAD_REQUEST).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
module.exports = allUsers;
