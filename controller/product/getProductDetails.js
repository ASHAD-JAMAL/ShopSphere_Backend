const httpStatusCode = require("../../constants/httpStatusCode");
const productModel = require("../../models/productModel");

const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);

    res.status(httpStatusCode.Ok).json({
      data: product,
      message: "product details fetched successfully",
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
};
module.exports = getProductDetails;