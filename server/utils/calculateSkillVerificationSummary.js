const calculateSkillVerificationSummary = (verificationResults) => {
  const results = Object.values(verificationResults);

  const totalSkills = results.length;

  const verifiedSkills = results.filter(
    (skill) => skill.status === "verified"
  ).length;

  const unverifiedSkills = totalSkills - verifiedSkills;

  const verificationPercentage =
    totalSkills === 0
      ? 0
      : Number(((verifiedSkills / totalSkills) * 100).toFixed(2));

  return {
    totalSkills,
    verifiedSkills,
    unverifiedSkills,
    verificationPercentage,
  };
};

module.exports = calculateSkillVerificationSummary;