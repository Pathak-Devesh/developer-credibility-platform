const Project = require("../models/Project");

const createProject = async (req, res) => {
    try {
        const {title,description,githubUrl,liveUrl,techStack} = req.body;
        if (!title || !description){
            return res.status(400).json({
                message: "Title and description are required",
            });
        }

        const project = await Project.create({
            title,
            description,
            githubUrl,
            liveUrl,
            techStack,
            owner: req.user.id
        });

        return res.status(201).json({
            message: "Project was created",
            project
        });
    }
    catch(error){
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getMyProjects = async (req, res) => {
    try{
        const projects = await Project.find({
            owner: req.user.id
        });

        return res.status(200).json(projects);
    }
    catch(error){
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = { createProject,getMyProjects };