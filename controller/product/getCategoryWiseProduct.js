const httpStatusCode = require("../../constants/httpStatusCode");
const productModel = require("../../models/productModel");

const getCategoryWiseProduct = async (req, res) => {
  try {
    const { category } = req?.body || req?.query;
    const product = await productModel.find({ category });

    res.status(httpStatusCode.Ok).json({
      message: "Product By Category",
      data: product,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(httpStatusCode.BAD_REQUEST).json({
      message: error.messgae || error,
      error: true,
      success: false,
    });
  }
};
module.exports = getCategoryWiseProduct;