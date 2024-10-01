const httpStatusCode = require("../../constants/httpStatusCode");
const productModel = require("../../models/productModel");

const getCategoryProduct = async (req, res) => {
  try {
    const productCategory = await productModel.distinct("category");
    console.log("category is", productCategory);

    //array to store one product from each category
    const productByCategory = [];
    for (const category of productCategory) {
      const product = await productModel.findOne({ category });

      if (product) {
        productByCategory.push(product);
      }
    }

    res.status(httpStatusCode.Ok).json({
      message: "Product By Category",
      data: productByCategory,
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
module.exports = getCategoryProduct;