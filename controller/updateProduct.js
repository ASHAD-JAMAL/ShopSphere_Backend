const httpStatusCode = require("../constants/httpStatusCode");
const uploadProductPermission = require("../helpers/permission");
const productModel = require("../models/productModel");

async function updateProductController(req, res) {
  try {
    if (!uploadProductPermission(req.userId)) {
      return res.status(httpStatusCode.UNAUTHORIZED).json({
        message: "You are not authorized to upload product",
        error: true,
        success: false,
      });
    }
    const { _id, ...resBody } = req.body;
    const updateProduct = await productModel.findByIdAndUpdate(_id, resBody);

    res.status(httpStatusCode.Ok).json({
      message: "Product updated successfully",
      success: true,
      error: false,
      data: updateProduct,
    });
  } catch (error) {
    res.status(httpStatusCode.BAD_REQUEST).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
module.exports = updateProductController;
