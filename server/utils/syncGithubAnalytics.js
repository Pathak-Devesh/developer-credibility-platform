const axios = require("axios");
const extractGithubRepoInfo = require("./githubUtils");

const syncGithubAnalytics = async (githubUrl) => {

    if (!githubUrl) {
        return null;
    }

    const repoInfo = extractGithubRepoInfo(githubUrl);

    if (!repoInfo) {
        return null;
    }

    try {

        const [repoResponse, languagesResponse] =
            await Promise.all([
                axios.get(
                    `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`
                ),
                axios.get(
                    `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/languages`
                )
            ]);

        return {
            stars: repoResponse.data.stargazers_count,
            forks: repoResponse.data.forks_count,
            primaryLanguage: repoResponse.data.language || "",
            languages: languagesResponse.data,
            lastSyncedAt: new Date()
        };

    } catch (error) {

    return null;
}
};

module.exports = syncGithubAnalytics;