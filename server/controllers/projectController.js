const Project = require("../models/Project");

const createProject = async (req, res) => {
    try {
        const { title, description, githubUrl, liveUrl, techStack } = req.body;
        if (!title || !description) {
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
    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getMyProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            owner: req.user.id
        });

        return res.status(200).json(projects);
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        return res.status(200).json(project);

    }
    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const { title, description, githubUrl, liveUrl, techStack } = req.body;

        if (title !== undefined) {
            project.title = title;
        }
        if (description !== undefined) {
            project.description = description;
        }
        if (githubUrl !== undefined) {
            project.githubUrl = githubUrl;
        }
        if (liveUrl !== undefined) {
            project.liveUrl = liveUrl;
        }
        if (techStack !== undefined) {
            project.techStack = techStack;
        }
        await project.save();

        return res.status(200).json({
            message: "Project updated successfully",
            project
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        await project.deleteOne();

        return res.status(200).json({
            message: "Project deleted successfully"
        });

    }
    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = { createProject, getMyProjects, getProjectById, updateProject, deleteProject };