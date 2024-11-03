const httpStatusCode = require("../../constants/httpStatusCode");
const addToCartModel = require("../../models/cartProduct");

const deleteAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const productId = req.body._id;

    const deleteProduct = await addToCartModel.deleteOne({
      _id: productId,
    });
    res.status(httpStatusCode.Ok).json({
      message: "Product Deleted Successfully",
      error: false,
      success: true,
      data: deleteProduct,
    });
  } catch (error) {
    res.status(httpStatusCode.BAD_REQUEST).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = deleteAddToCartProduct;
