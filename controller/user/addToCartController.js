const httpStatusCode = require("../../constants/httpStatusCode");
const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;

    const isProductAvailable = await addToCartModel.findOne({
      productId,
      userId: currentUser,
    });

    if (isProductAvailable) {
      return res.status(httpStatusCode.CONFLICT).json({
        message: "Allready Exists in Cart",
        success: false,
        error: true,
      });
    }
    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    res.status(httpStatusCode.CREATED).json({
      message: "Product-added to cart successfully",
      success: true,
      error: false,
      data: saveProduct,
    });
  } catch (error) {
    res.status(httpStatusCode.BAD_REQUEST).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = addToCartController;
