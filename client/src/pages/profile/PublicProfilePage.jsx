import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


import { getDeveloperProfile, getGithubProfile, } from "../../api/userApi";

export default function PublicProfilePage() {

    const { id } = useParams();

    const [profile, setProfile] = useState(null);
    const [githubData, setGithubData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProfile = async () => {



            try {
                const response = await getDeveloperProfile(id);
                setProfile(response.data);
            } catch (error) {
                setError(error.response?.data?.message ||
                    "Failed to load profile");
            }
            try {

                const githubResponse =
                    await getGithubProfile(id);

                setGithubData(githubResponse.data);

            } catch (error) {

                console.error(
                    "GitHub profile fetch failed",
                    error.response?.data || error.message
                );

            }

            finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, [id]);

    if (loading) {
        return (
            <p className="text-white p-10">
                Loading profile...
            </p>
        );
    }

    if (error) {
        return (
            <p className="text-red-400 p-10">
                {error}
            </p>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">

            {/* Hero */}

            <div>

                <h1 className="text-5xl font-bold text-white">
                    {profile.user.name}
                </h1>

                <p className="mt-4 text-xl text-red-400">
                    {profile.user.headline || "Developer"}
                </p>

                <p className="mt-4 text-lg text-gray-300 max-w-4xl leading-relaxed">
                    {profile.user.bio || "No bio available."}
                </p>

            </div>


            {/* Summary Cards */}

            <div className="grid lg:grid-cols-2 gap-6 mt-12">

                {/* Links */}

                <div
                    className="
            rounded-bl-3xl
            rounded-tr-3xl
            rounded-br-md
            rounded-tl-md
            border border-gray-800
            bg-gray-900/30
            backdrop-blur-md
            p-8
        "
                >

                    <h2 className="text-3xl font-bold text-white mb-8">
                        Developer Links
                    </h2>

                    <div className="space-y-6">

                        <div>

                            <div className="text-gray-400 font-medium mb-2 ms-2">
                                GitHub :

                                {profile.user.githubUsername ? (
                                    <a
                                        href={`https://github.com/${profile.user.githubUsername}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="!text-blue-400 hover:!text-blue-300 break-all ms-2"
                                    >
                                        github.com/{profile.user.githubUsername}
                                    </a>
                                ) : (
                                    <p className="text-gray-500">
                                        Not connected
                                    </p>
                                )}
                            </div>

                        </div>

                        <div>

                            <div className="text-gray-400 font-medium mb-2 ms-2">
                                LinkedIn :


                                {profile.user.linkedinUrl ? (
                                    <a
                                        href={profile.user.linkedinUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="!text-blue-400 hover:!text-blue-300 break-all ms-2"
                                    >
                                        {profile.user.linkedinUrl}
                                    </a>
                                ) : (
                                    <p className="text-gray-500">
                                        Not provided
                                    </p>
                                )}
                            </div>

                        </div>

                        <div>

                            <div className="text-gray-400 font-medium mb-2 ms-2">
                                Portfolio :


                                {profile.user.portfolioUrl ? (
                                    <a
                                        href={profile.user.portfolioUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="!text-blue-400 hover:!text-blue-300 break-all m-2"
                                    >
                                        {profile.user.portfolioUrl}
                                    </a>
                                ) : (
                                    <p className="text-gray-500">
                                        Not provided
                                    </p>
                                )}
                            </div>
                        </div>

                    </div>

                </div>


                {/* Credibility */}

                <div
                    className="
            rounded-bl-3xl
            rounded-tr-3xl
            rounded-br-md
            rounded-tl-md
            border border-gray-800
            bg-gray-900/30
            backdrop-blur-md
            p-8
        "
                >

                    <h2 className="text-3xl font-bold text-white mb-4">
                        Credibility Report
                    </h2>

                    <div className="grid grid-cols-2 gap-3">

                        <div className="rounded-xl bg-black/30 p-3">

                            <p className="text-gray-400 text-sm">
                                Credibility Score
                            </p>

                            <p className="text-2xl font-bold text-red-400 mt-1">
                                {profile.credibility.score}
                            </p>

                        </div>

                        <div className="rounded-xl bg-black/30 p-3">

                            <p className="text-gray-400 text-sm">
                                Verification Rate
                            </p>

                            <p className="text-2xl font-bold text-white mt-1">
                                {profile.skillSummary.verificationPercentage}%
                            </p>

                        </div>

                        <div className="rounded-xl bg-black/30 p-3">

                            <p className="text-gray-400 text-sm">
                                Verified Skills
                            </p>
                            <p>
                                <span className="text-2xl font-bold text-white mt-1 me-2">
                                    {profile.skillSummary.verifiedSkills}
                                </span>

                                <span className="text-gray-500 text-sm">
                                    of {profile.skillSummary.totalSkills}
                                </span>
                            </p>
                        </div>

                        <div className="rounded-xl bg-black/30 p-3">

                            <p className="text-gray-400 text-sm">
                                Verified Projects
                            </p>

                            <p className="text-2xl font-bold text-white mt-1">
                                {
                                    profile.projects.filter(
                                        project =>
                                            project.verificationStatus === "verified"
                                    ).length
                                }
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            <div className="mt-12">

                <h2 className="text-3xl font-bold text-white mb-6">
                    Skill Verification
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">

                    {Object.entries(profile.skillVerification).map(
                        ([skill, details]) => (

                            <div
                                key={skill}
                                className="
                        bg-gray-900/30
                        backdrop-blur-md
                        border border-gray-800
                        p-5
                        rounded-bl-3xl
                        rounded-tr-3xl
                        rounded-br-md
                        rounded-tl-md
                    "
                            >

                                <div className="flex items-center justify-between">

                                    <h3 className="text-lg font-semibold text-white">
                                        {skill}
                                    </h3>

                                    {details.status === "verified" ? (
                                        <span className="text-green-400 text-sm font-medium">
                                            VERIFIED
                                        </span>
                                    ) : (
                                        <span className="text-yellow-400 text-sm font-medium">
                                            NOT ENOUGH EVIDENCE
                                        </span>
                                    )}

                                </div>

                                {details.sources.length > 0 ? (

                                    <p className="text-gray-400 text-sm mt-2">

                                        Source:

                                        <span
                                            className="
                                    ml-2 ms-1
                                    px-2 py-1
                                    rounded-md
                                    text-xs
                                    text-red-400
                                    bg-red-500/10
                                "
                                        >
                                            {details.sources.join(", ")}
                                        </span>

                                    </p>

                                ) : (

                                    <p className="text-gray-500 text-sm mt-2">
                                        No evidence found
                                    </p>

                                )}

                            </div>

                        )
                    )}

                </div>

            </div>

            <div className="mt-12">

                <div className="flex items-center justify-between mb-6">

                    <h2 className="text-3xl font-bold text-white">
                        Projects
                    </h2>

                    <span className="text-gray-400">
                        {profile.projects.length} Project(s)
                    </span>

                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {profile.projects.map((project) => (

                        <div
                            key={project._id}
                            className="
                    rounded-bl-3xl
                    rounded-tr-3xl
                    rounded-br-md
                    rounded-tl-md
                    border border-gray-800
                    bg-gray-900/30
                    backdrop-blur-md
                    p-6
                "
                        >

                            <div className="flex items-start justify-between gap-3">

                                <h3 className="text-xl font-semibold text-white break-words flex-1">
                                    {project.title}
                                </h3>

                                {project.verificationStatus === "verified" && (
                                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400 whitespace-nowrap">
                                        VERIFIED
                                    </span>
                                )}

                                {project.verificationStatus === "pending" && (
                                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400 whitespace-nowrap">
                                        PENDING
                                    </span>
                                )}

                                {project.verificationStatus === "failed" && (
                                    <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400 whitespace-nowrap">
                                        UNVERIFIED
                                    </span>
                                )}

                            </div>

                            <p className="text-gray-400 mt-4 line-clamp-3">
                                {project.description}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2">

                                {project.techStack?.slice(0, 4).map((tech) => (

                                    <span
                                        key={tech}
                                        className="
                                px-2 py-1
                                rounded-md
                                text-xs
                                bg-red-500/10
                                text-red-400
                            "
                                    >
                                        {tech}
                                    </span>

                                ))}

                            </div>

                            <div className="mt-5 flex gap-4 text-sm text-gray-400">

                                <span>
                                    ⭐ {project.githubAnalytics?.stars || 0}
                                </span>

                                <span>
                                    🍴 {project.githubAnalytics?.forks || 0}
                                </span>

                            </div>

                            <div className="mt-6">

                                <Link
                                    to={`/projects/${project._id}`}
                                    className="inline-block  px-4 py-2 rounded-md bg-gray-500/30 !text-gray-200 hover:bg-gray-500/50 transition-colors"
                                >
                                    View Details →
                                </Link>

                            </div>



                        </div>



                    ))}

                </div>

            </div>

            {githubData && (

                <div className="mt-12">

                    <h2 className="text-3xl font-bold text-white mb-6">
                        GitHub Overview
                    </h2>

                    <div className="grid md:grid-cols-4 gap-4">

                        <div className="bg-gray-900/30 border border-gray-800 backdrop-blur-md p-6 rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md">

                            <p className="text-gray-400">
                                Followers
                            </p>

                            <p className="text-3xl font-bold text-white mt-2">
                                {githubData.profile.followers}
                            </p>

                        </div>

                        <div className="bg-gray-900/30 border border-gray-800 backdrop-blur-md p-6 rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md">

                            <p className="text-gray-400">
                                Following
                            </p>

                            <p className="text-3xl font-bold text-white mt-2">
                                {githubData.profile.following}
                            </p>

                        </div>

                        <div className="bg-gray-900/30 border border-gray-800 backdrop-blur-md p-6 rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md">

                            <p className="text-gray-400">
                                Public Repositories
                            </p>

                            <p className="text-3xl font-bold text-white mt-2">
                                {githubData.profile.publicRepos}
                            </p>

                        </div>

                        <div className="bg-gray-900/30 border border-gray-800 backdrop-blur-md p-6 rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md">

                            <p className="text-gray-400">
                                Location
                            </p>

                            <p className="text-xl font-semibold text-white mt-3">
                                {githubData.profile.location || "Not specified"}
                            </p>

                        </div>

                    </div>

                </div>

            )}

            {githubData?.repositories?.length > 0 && (

                <div className="mt-12">

                    <h2 className="text-3xl font-bold text-white mb-6">
                        Top GitHub Repositories
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {githubData.repositories
                            .slice(0, 3)
                            .map((repo) => (

                                <a
                                    key={repo.name}
                                    href={repo.htmlUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                            block
                            rounded-bl-3xl
                            rounded-tr-3xl
                            rounded-br-md
                            rounded-tl-md
                            border border-gray-800
                            bg-gray-900/30
                            backdrop-blur-md
                            p-6
                            hover:border-red-400
                            transition-colors
                        "
                                >

                                    <h3 className="text-lg font-semibold text-white">
                                        {repo.name}
                                    </h3>

                                    <p className="text-gray-400 mt-3 line-clamp-3">
                                        {repo.description || "No description provided"}
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-400">

                                        <span>
                                            ⭐ {repo.stars}
                                        </span>

                                        <span>
                                            🍴 {repo.forks}
                                        </span>

                                        {repo.language && (
                                            <span>
                                                💻 {repo.language}
                                            </span>
                                        )}

                                    </div>

                                </a>

                            ))}

                    </div>

                </div>

            )}

        </section>
    );
}