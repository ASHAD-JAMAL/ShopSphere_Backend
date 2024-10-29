const httpStatusCode = require("../../constants/httpStatusCode");
const addToCartModel = require("../../models/cartProduct");

const addToCartViewProduct = async(req, res) => {
  try {
    const currentUser = req.userId;
    const allProducts = await addToCartModel.find({
          userId : userId
    })
    res.status(httpStatusCode.Ok).json({
      data : allProducts,
      success: true,
      error: false
    })
  } catch (error) {
    res.status(httpStatusCode.BAD_REQUEST).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = addToCartViewProduct;
