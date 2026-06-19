const axios = require("axios");
const extractGithubRepoInfo = require("./githubUtils");

const verifyGithubProject = async (user, githubUrl) => {

    let verificationStatus = "pending";

    if (!githubUrl || !user.githubUsername) {
        return verificationStatus;
    }

    const repoInfo = extractGithubRepoInfo(githubUrl);

    if (!repoInfo) {
        return verificationStatus;
    }

    try {

        const repoResponse = await axios.get(
            `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`
        );

        const githubOwner =
            repoResponse.data.owner.login;

        if (
            githubOwner.toLowerCase() ===
            user.githubUsername.toLowerCase()
        ) {
            verificationStatus = "verified";
        } else {
            verificationStatus = "failed";
        }

    } catch (error) {

        console.log(
            "GitHub Verification Error:",
            error.response?.data || error.message
        );

        verificationStatus = "pending";

    }

    return verificationStatus;
};

module.exports = verifyGithubProject;