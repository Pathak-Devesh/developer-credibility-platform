const axios = require("axios");
const extractGithubRepoInfo = require("./githubUtils");

const technologyMap = {
  react: ["React"],

  axios: ["Axios"],

  express: ["Express", "Node.js"],

  mongoose: ["MongoDB"],

  mongodb: ["MongoDB"],

  "react-router-dom": ["React Router", "React"],

  redux: ["Redux"],

  next: ["Next.js", "React"],

  vue: ["Vue.js"],

  angular: ["Angular"],

  typescript: ["TypeScript"],

  tailwindcss: ["Tailwind CSS"],
};

const detectRepositoryTechnologies = async (githubUrl) => {
  try {
    const { owner, repo } = extractGithubRepoInfo(githubUrl);

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/package.json`
    );

    const encodedContent = response.data.content;

    const packageJsonText = Buffer.from(encodedContent,"base64").toString("utf-8");

    const packageJson = JSON.parse(packageJsonText);

    const allDependencies  = {
      ...(packageJson.dependencies || {}),
      ...(packageJson.devDependencies || {}),
    };

    const detectedTechnologies = [];

    for (const dependency of Object.keys(allDependencies )) {
      if (technologyMap[dependency]) {
        detectedTechnologies.push(...technologyMap[dependency]);
        }       
    }

    return [...new Set(detectedTechnologies)];
  } catch (error) {
    return [];
  }
};

module.exports = detectRepositoryTechnologies;