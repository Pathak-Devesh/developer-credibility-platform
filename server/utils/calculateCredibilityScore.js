const calculateCredibilityScore = (user,skillSummary,verifiedProjectCount) => {

    // Verified Skill Count (0 - 30)
    const verifiedSkillCountScore = Math.min(skillSummary.verifiedSkills, 10) / 10 * 30;

    // Skill Verification Percentage (0-30)

    const skillVerificationScore = (skillSummary.verificationPercentage / 100) * 30;

    // Verified Projects (0 - 30)

    const verifiedProjectsScore = Math.min(verifiedProjectCount, 5) / 5 * 30;

    // Profile Completeness (0 - 10)
    const profileFields = [
        user.bio,
        user.headline,
        user.githubUsername,
        user.linkedinUrl,
        user.portfolioUrl
    ];

    let completedFields = profileFields.filter(
        (field) => field && field.trim() !== ""
    ).length;

    if (user.skills && user.skills.length > 0) {
        completedFields++;
    }

    const profileCompletenessScore =
        (completedFields / 6) * 10;

    // Final Score

    const totalScore =
        verifiedSkillCountScore +
        skillVerificationScore +
        verifiedProjectsScore +
        profileCompletenessScore;

    return {
        score: Math.round(totalScore),

        breakdown: {
            verifiedSkillCount: Number(
                verifiedSkillCountScore.toFixed(2)
            ),

            skillVerification: Number(
                skillVerificationScore.toFixed(2)
            ),

            verifiedProjects: Number(
                verifiedProjectsScore.toFixed(2)
            ),

            profileCompleteness: Number(
                profileCompletenessScore.toFixed(2)
            )
        }
    };
};

module.exports = calculateCredibilityScore;