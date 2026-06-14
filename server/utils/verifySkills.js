const verifySkills = (userSkills, verifiedProjects) => {

    const technologyEvidence = new Set();
    const languageEvidence = new Set();

    for (const project of verifiedProjects) {

        for (const tech of project.detectedTechnologies || []) {
            technologyEvidence.add(tech.toLowerCase());
        }

        if (project.githubAnalytics?.languages) {

            for (const language of project.githubAnalytics.languages.keys()) {
                languageEvidence.add(language.toLowerCase());
            }

        }
    }

    const verificationResults = {};

    for (const skill of userSkills) {

        const foundInTechnologies = technologyEvidence.has(skill.toLowerCase());

        const foundInLanguages = languageEvidence.has(skill.toLowerCase());

        const sources = [];

        if (foundInTechnologies) {
            sources.push("package.json");
        }

        if (foundInLanguages) {
            sources.push("repository-languages");
        }

        verificationResults[skill] = {
            status: foundInTechnologies || foundInLanguages ? "verified" : "not_enough_evidence",
            sources
        };
    }

    return verificationResults;
};

module.exports = verifySkills;