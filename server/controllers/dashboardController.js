const User = require("../models/User");
const Project = require("../models/Project");

const verifySkills = require("../utils/verifySkills");
const calculateSkillVerificationSummary = require("../utils/calculateSkillVerificationSummary");
const calculateCredibilityScore = require("../utils/calculateCredibilityScore");

const getDashboard = async (req, res) => {

    try {

        const user =
            await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const projects =
            await Project.find({
                owner: user._id
            })
            .sort({ createdAt: -1 });

        const verifiedProjects =
            projects.filter(
                (project) =>
                    project.verificationStatus === "verified"
            );

        const pendingProjects =
            projects.filter(
                (project) =>
                    project.verificationStatus === "pending"
            );

        const skillVerification =
            verifySkills(
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

        const skills =
            Object.entries(skillVerification)
                .map(([skill, data]) => ({
                    skill,
                    status: data.status,
                    sources: data.sources
                }));

        return res.status(200).json({

            stats: {
                totalProjects: projects.length,
                verifiedProjects:
                    verifiedProjects.length,
                pendingProjects:
                    pendingProjects.length,
                credibilityScore:
                    credibility.score
            },

            skills,

            recentProjects:
                projects.slice(0, 3)

        });

    } catch (error) {

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};

module.exports = {
    getDashboard
};