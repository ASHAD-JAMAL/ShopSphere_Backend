const httpStatusCode = require("../../constants/httpStatusCode");
const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req,res) => {
    try{
        const userId = req.userId;
        const count = await addToCartModel.countDocuments({
            userId : userId
        })
        res.status(httpStatusCode.Ok).json({
            data : {
                count : count
            },
            message : "Ok",
            error : false,
            success : true
        })

    }catch(error){
        res.status(httpStatusCode.BAD_REQUEST).json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
}
module.exports = countAddToCartProduct;