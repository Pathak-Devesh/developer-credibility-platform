const User = require("../models/User");


const getProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        
        if(!user){
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.json(user);
    }
    catch(error){
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }

};

const onlyAdmin = async (req,res) =>{
    return res.json({
        message: "Welcome admin"
    });
};
module.exports = { getProfile,onlyAdmin };