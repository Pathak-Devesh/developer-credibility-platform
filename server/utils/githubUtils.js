function extractGithubRepoInfo(githubUrl) {

    if (!githubUrl) {
        return null;
    }

    try {

        const url = new URL(githubUrl);

        const pathParts = url.pathname
            .split("/")
            .filter(Boolean);

        if (pathParts.length < 2) {
            return null;
        }

        return {
            owner: pathParts[0],
            repo: pathParts[1]
        };

    } catch (error) {

        return null;

    }
}

module.exports = extractGithubRepoInfo;