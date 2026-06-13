const User = require("../models/User");
const Project = require("../models/Project");


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

const updateProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        
        if(!user){
            return res.status(404).json({
                message: "User not found",
            });
        }

        const {bio,headline,skills,githubUsername,linkedinUrl,portfolioUrl} = req.body;

        if(bio !== undefined){
            user.bio=bio;
        }
        if(headline !== undefined){
            user.headline=headline;
        }
        if(skills !== undefined){
            user.skills=skills;
        }
        if(githubUsername !== undefined){
            user.githubUsername=githubUsername;
        }
        if(linkedinUrl !== undefined){
            user.linkedinUrl=linkedinUrl;
        }
        if(portfolioUrl !== undefined){
            user.portfolioUrl=portfolioUrl;
        }

        await user.save();

        return res.status(200).json(user);
        
    }
    catch(error){
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getPublicProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select("name headline bio skills githubUsername linkedinUrl portfolioUrl");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const projects = await Project.find({
            owner: user._id
        })
        .select("title description githubUrl liveUrl techStack verificationStatus createdAt")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            user,
            projects
        });

    } catch (error) {
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
module.exports = { getProfile,onlyAdmin,updateProfile,getPublicProfile };