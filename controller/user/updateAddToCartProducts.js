const httpStatusCode = require("../../constants/httpStatusCode");
const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProducts = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const addToCartProductId = req.body._id;

    const qty = req.body.quantity;

    const updateProduct = await addToCartModel.findOneAndUpdate(
      { _id: addToCartProductId },
      {
        ...(qty && { quantity: qty }),
      }
    );

    res.status(httpStatusCode.Ok).json({
      message: "Product updated successfully",
      data: updateProduct,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(httpStatusCode.BAD_REQUEST).json({
      message: error?.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = updateAddToCartProducts;
