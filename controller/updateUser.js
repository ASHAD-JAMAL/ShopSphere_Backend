const userModel = require("../models/userModel");
const httpStatusCode = require("../constants/httpStatusCode");

async function updateUser(req,res){
    try {
        const sessionUser = req.userId;
        const {userId,email,name,role} = req.body;

        const payload = {
            ...(email && {email : email}),
            ...(name && {name : name}),
            ...(role && {role : role}),
        }

        const user = await userModel.findById(sessionUser);
        console.log("user role",user.role);

        const updateUser = await userModel.findByIdAndUpdate(userId,payload);

        res.json({
            data:updateUser,
            message : "User Updates Successfully",
            success : true,
            error : false
        })
        
    } catch (error) {
        res.status(httpStatusCode.BAD_REQUEST).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
module.exports = updateUser;