const Project = require("../models/Project");
const User = require("../models/User");
const extractGithubRepoInfo = require("../utils/githubUtils");
const verifyGithubProject = require("../utils/verifyGithubProject");
const syncGithubAnalytics = require("../utils/syncGithubAnalytics");


const createProject = async (req, res) => {
    try {
        const { title, description, githubUrl, liveUrl, techStack } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required",
            });
        }

        const user = await User.findById(req.user.id);

        const verificationStatus = await verifyGithubProject(user, githubUrl);
        const analytics = await syncGithubAnalytics(githubUrl);

        const project = await Project.create({
            title,
            description,
            githubUrl,
            liveUrl,
            techStack,
            owner: req.user.id,
            verificationStatus,
            githubAnalytics: analytics || undefined
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

        const githubUrlChanged = githubUrl !== undefined && githubUrl !== project.githubUrl;



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

        if (githubUrlChanged) {

            const user = await User.findById(req.user.id);

            project.verificationStatus = await verifyGithubProject(user, githubUrl);

            const analytics = await syncGithubAnalytics(githubUrl);

            if (analytics) {
                project.githubAnalytics = analytics;
            }
            else {
                project.githubAnalytics = undefined;
            }

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

const getAllProjects = async (req, res) => {
    try {

        console.log(req.query);
        console.log(req.query.search);

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";
        const tech = req.query.tech || "";

        const skip = (page - 1) * limit;

        console.log({
            page,
            limit,
            skip
        });

        const filter = {};

        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }
        if (tech) {
            filter.techStack = {
                $regex: `^${tech}$`,
                $options: "i"
            };
        }

        const totalProjects = await Project.countDocuments(filter);
        const totalPages = Math.ceil(totalProjects / limit);

        const projects = await Project.find(filter)
            .populate("owner", "name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);;

        res.status(200).json({
            currentPage: page,
            totalPages,
            totalProjects,
            projects
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { createProject, getMyProjects, getProjectById, updateProject, deleteProject, getAllProjects };