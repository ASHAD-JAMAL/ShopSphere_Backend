const httpStatusCode = require("../../constants/httpStatusCode");
const productModel = require("../../models/productModel");
const filterProductController = async (req, res) => {
  try {
    const categoryList = req?.body?.category || [];

    const product = await productModel.find({
      category: {
        $in: categoryList,
      },
    });
    res.status(httpStatusCode.Ok).json({
      data: product,
      message: "Product filter successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = filterProductController;
