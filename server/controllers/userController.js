const User = require("../models/User");
const Project = require("../models/Project");
const axios = require("axios");
const verifySkills = require("../utils/verifySkills");
const calculateSkillVerificationSummary = require("../utils/calculateSkillVerificationSummary");
const calculateCredibilityScore = require("../utils/calculateCredibilityScore");


const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }

};

const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const {
            bio,
            headline,
            skills,
            githubUsername,
            linkedinUrl,
            portfolioUrl,
            company,
            designation
        } = req.body;

        if (bio !== undefined) {
            user.bio = bio;
        }
        if (headline !== undefined) {
            user.headline = headline;
        }
        if (skills !== undefined) {
            user.skills = skills;
        }
        if (githubUsername !== undefined) {
            user.githubUsername = githubUsername;
        }
        if (linkedinUrl !== undefined) {
            user.linkedinUrl = linkedinUrl;
        }
        if (portfolioUrl !== undefined) {
            user.portfolioUrl = portfolioUrl;
        }
        if (company !== undefined) {
            user.company = company;
        }

        if (designation !== undefined) {
            user.designation = designation;
        }

        await user.save();

        return res.status(200).json(user);

    }
    catch (error) {
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

        const projects = await Project.find({ owner: user._id })
            .select("title description githubUrl liveUrl techStack verificationStatus createdAt detectedTechnologies githubAnalytics")
            .sort({ createdAt: -1 });

        const verifiedProjects = projects.filter((project) => project.verificationStatus === "verified");

        const skillVerification = verifySkills(user.skills, verifiedProjects);

        const skillSummary = calculateSkillVerificationSummary(skillVerification);

        const credibility = calculateCredibilityScore(user, skillSummary, verifiedProjects.length);

        return res.status(200).json({
            user,
            projects,
            credibility,
            skillVerification,
            skillSummary,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getGithubProfile = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!user.githubUsername) {
            return res.status(400).json({
                message: "GitHub username not configured"
            });
        }

        const profileUrl =
            `https://api.github.com/users/${user.githubUsername}`;

        const reposUrl =
            `https://api.github.com/users/${user.githubUsername}/repos`;

        const [profileResponse, reposResponse] = await Promise.all([
            axios.get(profileUrl),
            axios.get(reposUrl)
        ]);

        const profile = {
            login: profileResponse.data.login,
            name: profileResponse.data.name,
            avatarUrl: profileResponse.data.avatar_url,
            profileUrl: profileResponse.data.html_url,
            bio: profileResponse.data.bio,
            location: profileResponse.data.location,
            publicRepos: profileResponse.data.public_repos,
            followers: profileResponse.data.followers,
            following: profileResponse.data.following,
            createdAt: profileResponse.data.created_at
        };

        const repositories = reposResponse.data
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 10)
            .map(repo => ({
                name: repo.name,
                description: repo.description,
                htmlUrl: repo.html_url,
                language: repo.language,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                updatedAt: repo.updated_at
            }));

        return res.status(200).json({
            profile,
            repositories
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch GitHub profile",
            error: error.message
        });

    }
};

const getSkillVerification = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const verifiedProjects = await Project.find({ owner: user._id, verificationStatus: "verified" });

        const skillVerification = verifySkills(user.skills, verifiedProjects);
        const summary = calculateSkillVerificationSummary(skillVerification);

        return res.status(200).json({
            user: {
                id: user._id,
                name: user.name
            },
            verification: skillVerification,
            summary
        });


    }
    catch (error) {

        return res.status(500).json({
            message: "Failed to verify skills",
            error: error.message
        });

    }
};

const getAllDevelopers = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";

        const skip = (page - 1) * limit;

        const filter = {
            role: "developer"
        };

        if (search) {
            filter.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    headline: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    skills: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        const totalDevelopers =
            await User.countDocuments(filter);

        const totalPages =
            Math.ceil(totalDevelopers / limit);

        const users = await User.find(filter)
            .select(
                "name headline skills githubUsername linkedinUrl portfolioUrl bio"
            )
            .sort({ createdAt: -1, _id: -1 })
            .skip(skip)
            .limit(limit);

        const developers = await Promise.all(
            users.map(async (user) => {

                const verifiedProjects = await Project.find({
                    owner: user._id,
                    verificationStatus: "verified"
                });

                const skillVerification = verifySkills(
                    user.skills,
                    verifiedProjects
                );

                const skillSummary =
                    calculateSkillVerificationSummary(
                        skillVerification
                    );

                const credibility =
                    calculateCredibilityScore(
                        user,
                        skillSummary,
                        verifiedProjects.length
                    );

                return {
                    _id: user._id,
                    name: user.name,
                    headline: user.headline,
                    bio: user.bio,
                    skills: user.skills,
                    githubUsername: user.githubUsername,
                    credibility,
                    verifiedProjects: verifiedProjects.length
                };
            })
        );

        return res.status(200).json({
            currentPage: page,
            totalPages,
            totalDevelopers,
            developers
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const saveDeveloper = async (req, res) => {
    try {

        const recruiter = await User.findById(req.user.id);

        if (!recruiter) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (recruiter.role !== "recruiter") {
            return res.status(403).json({
                message: "Only recruiters can save developers"
            });
        }

        const developer = await User.findById(req.params.developerId);

        if (!developer || developer.role !== "developer") {
            return res.status(404).json({
                message: "Developer not found"
            });
        }

        const alreadySaved = recruiter.savedDevelopers.some(
            (item) =>
                item.developer.toString() === developer._id.toString()
        );

        if (alreadySaved) {
            return res.status(400).json({
                message: "Developer already saved"
            });
        }

        recruiter.savedDevelopers.push({
            developer: developer._id
        });

        await recruiter.save();

        return res.status(200).json({
            message: "Developer saved successfully"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};

const removeSavedDeveloper = async (req, res) => {
    try {

        const recruiter = await User.findById(req.user.id);

        if (!recruiter) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        recruiter.savedDevelopers =
            recruiter.savedDevelopers.filter(
                (item) =>
                    item.developer.toString() !==
                    req.params.developerId
            );

        await recruiter.save();

        return res.status(200).json({
            message: "Developer removed successfully"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};

const getSavedDevelopers = async (req, res) => {
    try {

        const recruiter = await User.findById(req.user.id)
            .populate({
                path: "savedDevelopers.developer",
                select:
                    "name headline skills githubUsername bio"
            });

        if (!recruiter) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            savedDevelopers: recruiter.savedDevelopers
        });

    } catch (error) {

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};

const onlyAdmin = async (req, res) => {
    return res.json({
        message: "Welcome admin"
    });
};
module.exports = { getProfile, onlyAdmin, updateProfile, getPublicProfile, getGithubProfile,
     getSkillVerification, getAllDevelopers ,saveDeveloper,removeSavedDeveloper,getSavedDevelopers};