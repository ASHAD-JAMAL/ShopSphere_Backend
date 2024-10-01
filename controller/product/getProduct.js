const httpStatusCode = require("../../constants/httpStatusCode");
const productModel = require("../../models/productModel");

const getProductController = async (req, res) => {
  try {
    const allProducts = await productModel.find().sort({ createdAt: -1 });

    res.status(httpStatusCode.Ok).json({
      message: "All Products",
      success: true,
      error: false,
      data: allProducts,
    });
  } catch (error) {
    res.status(httpStatusCode.BAD_REQUEST).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = getProductController;
