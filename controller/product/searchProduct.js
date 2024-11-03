const httpStatusCode = require("../../constants/httpStatusCode");
const productModel = require("../../models/productModel");

const SearchProduct = async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, "i", "g");

    const product = await productModel.find({
      $or: [
        {
          productName: regex,
        },
        {
          category: regex,
        },
      ],
    });
    res.status(httpStatusCode.Ok).json({
      data: product,
      success: true,
      error: false,
      message: "Product searched successfully",
    });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};
module.exports = SearchProduct;
