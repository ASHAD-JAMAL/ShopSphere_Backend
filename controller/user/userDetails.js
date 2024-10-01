const httpStatusCode = require("../../constants/httpStatusCode");
const userModel = require("../../models/userModel");

async function userDetailsController(req, res) {
  try {
    console.log("userId-", req.userId);
    const user = await userModel.findById(req.userId);
    res.status(httpStatusCode.Ok).json({
      data: user,
      error: false,
      success: true,
      message: "User Details",
    });
    console.log("user", user);
  } catch (error) {
    res.status(httpStatusCode.BAD_REQUEST).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
module.exports = userDetailsController;
