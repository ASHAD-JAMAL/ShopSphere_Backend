const httpStatusCode = require("../constants/httpStatusCode");
const uploadProductPermission = require("../helpers/permission");
const productModel = require("../models/productModel");

async function uploadProductController(req, res) {
  try {
    
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      return res.status(httpStatusCode.UNAUTHORIZED).json({
        message: "You are not authorized to upload product",
        error: true,
        success: false,
      });
    }

    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();

    res.status(httpStatusCode.CREATED).json({
      message: "Product uploaded successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (error) {
    res.status(httpStatusCode.BAD_REQUEST).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
module.exports = uploadProductController;
