import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { getDashboard } from "../../api/dashboardApi";
import { getGithubProfile } from "../../api/profileApi";
import RecruiterDashboard from "./RecruiterDashboard";


function DashboardPage() {

    const { user } = useContext(AuthContext);

    const [dashboard, setDashboard] = useState(null);
    const [githubData, setGithubData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchDashboard = async () => {


            try {

                const response =
                    await getDashboard();

                setDashboard(response.data);

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Failed to load dashboard"
                );

            }
            try {

                if (user?._id && user?.githubUsername) {

                    const githubResponse =
                        await getGithubProfile(user._id);

                    setGithubData(githubResponse.data);

                }

            } catch (error) {

                console.error(
                    "GitHub fetch failed:",
                    error.response?.data || error.message
                );

            }
            finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, [user]);

    if (loading) {
        return (
            <p className="text-white p-10">
                Loading dashboard...
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

    if (user?.role === "recruiter") {
        return <RecruiterDashboard />;
    }

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">

            {/* Header */}

            <h1 className="text-4xl font-bold text-white">
                Welcome Back, {user?.name}
            </h1>

            <p className="text-gray-400 mt-2">
                Here's a summary of your developer profile.
            </p>

            {/* Stats */}

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

                <div className="bg-gray-900/30 border  backdrop-blur-md border-gray-800 p-6 rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md">
                    <p className="text-gray-400">
                        Projects
                    </p>

                    <p className="text-3xl font-bold text-white mt-2">
                        {dashboard.stats.totalProjects}
                    </p>
                </div>

                <div className="bg-gray-900/30 border  backdrop-blur-md border-gray-800 p-6 rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md">
                    <p className="text-gray-400">
                        Verified Projects
                    </p>

                    <p className="text-3xl font-bold text-green-400 mt-2">
                        {dashboard.stats.verifiedProjects}
                    </p>
                </div>

                <div className="bg-gray-900/30 border  backdrop-blur-md border-gray-800 p-6 rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md">
                    <p className="text-gray-400">
                        Pending Projects
                    </p>

                    <p className="text-3xl font-bold text-yellow-400 mt-2">
                        {dashboard.stats.pendingProjects}
                    </p>
                </div>

                <div className="bg-gray-900/30 border  backdrop-blur-md border-gray-800 p-6 rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md">
                    <p className="text-gray-400">
                        Credibility Score
                    </p>

                    <p className="text-3xl font-bold text-red-400 mt-2">
                        {dashboard.stats.credibilityScore}
                    </p>
                </div>

            </div>

            {/* Skills */}

            <div className="mt-12">

                <h2 className="text-3xl font-bold text-white mb-6">
                    Skill Verification
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">

                    {dashboard.skills.map((skill) => (

                        <div
                            key={skill.skill}
                            className="
                                bg-gray-900/30  backdrop-blur-md
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
                                    {skill.skill}
                                </h3>

                                {skill.status === "verified" ? (
                                    <span className="text-green-400 text-sm font-medium">
                                        VERIFIED
                                    </span>
                                ) : (
                                    <span className="text-yellow-400 text-sm font-medium">
                                        NOT ENOUGH EVIDENCE
                                    </span>
                                )}

                            </div>

                            {skill.sources.length > 0 ? (

                                <p className="text-gray-400 text-sm mt-2 ">
                                    Source: <span className="ms-1 px-2 py-1 rounded-md text-xs text-red-400 bg-red-500/10">{skill.sources.join(", ")}</span>
                                </p>

                            ) : (

                                <p className="text-gray-500 text-sm mt-2">
                                    No evidence found
                                </p>

                            )}

                        </div>

                    ))}

                </div>

            </div>

            {githubData && (
                <div className="mt-12">

                    <h2 className="text-3xl font-bold text-white mb-6">
                        GitHub Overview
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="bg-gray-900/30 border border-gray-800 backdrop-blur-md p-5 rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md">
                            <p className="text-gray-400">
                                Followers
                            </p>

                            <p className="text-3xl font-bold text-white mt-2">
                                {githubData.profile.followers}
                            </p>
                        </div>

                        <div className="bg-gray-900/30 border border-gray-800 backdrop-blur-md p-5 rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md">
                            <p className="text-gray-400">
                                Following
                            </p>

                            <p className="text-3xl font-bold text-white mt-2">
                                {githubData.profile.following}
                            </p>
                        </div>

                        <div className="bg-gray-900/30 border border-gray-800 backdrop-blur-md p-5 rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md">
                            <p className="text-gray-400">
                                Public Repositories
                            </p>

                            <p className="text-3xl font-bold text-white mt-2">
                                {githubData.profile.publicRepos}
                            </p>
                        </div>

                        <div className="bg-gray-900/30 border border-gray-800 backdrop-blur-md p-5 rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md">
                            <p className="text-gray-400">
                                GitHub Username
                            </p>

                            <p className="text-lg font-semibold text-white mt-2">
                                {githubData.profile.login}
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
                            bg-gray-900/30
                            border border-gray-800
                            backdrop-blur-md
                            p-5
                            rounded-bl-3xl
                            rounded-tr-3xl
                            rounded-br-md
                            rounded-tl-md
                            hover:border-red-400
                            transition-colors
                        "
                                >

                                    <h3 className="text-lg font-semibold text-white">
                                        {repo.name}
                                    </h3>

                                    <p className="text-gray-400 text-sm mt-3 line-clamp-2">
                                        {repo.description || "No description"}
                                    </p>

                                    <div className="flex gap-4 mt-4 text-sm text-gray-400">

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

            {/* Recent Projects */}

            <div className="mt-12">

                <div className="flex items-center justify-between mb-6">

                    <h2 className="text-3xl font-bold text-white">
                        Recent Projects
                    </h2>

                    <Link
                        to="/dashboard/projects"
                        className="!text-red-400 hover:!text-red-300"
                    >
                        View All →
                    </Link>

                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {dashboard.recentProjects.map((project) => (

                        <div
                            key={project._id}
                            className="
                                bg-gray-900/30  backdrop-blur-md
                                border border-gray-800
                                p-5
                                rounded-bl-3xl
                                rounded-tr-3xl
                                rounded-br-md
                                rounded-tl-md
                            "
                        >

                            <h3 className="text-white font-semibold text-lg">
                                {project.title}
                            </h3>

                            <p className="text-gray-400 text-sm mt-3">
                                {project.description.length > 100
                                    ? `${project.description.slice(0, 100)}...`
                                    : project.description}
                            </p>

                            <div className="mt-4">

                                {project.verificationStatus === "verified" && (
                                    <span className="text-green-400 text-sm font-medium">
                                        VERIFIED
                                    </span>
                                )}

                                {project.verificationStatus === "pending" && (
                                    <span className="text-yellow-400 text-sm font-medium">
                                        PENDING
                                    </span>
                                )}

                                {project.verificationStatus === "failed" && (
                                    <span className="text-red-400 text-sm font-medium">
                                        UNVERIFIED
                                    </span>
                                )}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default DashboardPage;