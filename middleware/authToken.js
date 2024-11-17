const jwt = require("jsonwebtoken");
const httpStatusCode = require("../constants/httpStatusCode");

async function authToken(req, res, next) {
  try {
    // const token = req.cookies?.token;
    const token = req.headers.authorization.split(" ")[1];
    console.log("token--", token);

    if (!token) {
      return res.status(httpStatusCode.Ok).json({
        message: "Please Login...!",
        error: true,
        success: false,
      });
    }
    jwt.verify(token, process.env.SECRET_KEY, function (error, decoded) {
      console.log(error);
      console.log("decoded---", decoded);

      if (error) {
        console.log("error auth-", error);
      }
      req.userId = decoded?._id;
      next();
    });
  } catch (error) {
    res.status(httpStatusCode.BAD_REQUEST).json({
      message: error.message || error,
      data: [],
      error: true,
      success: false,
    });
  }
}
module.exports = authToken;
