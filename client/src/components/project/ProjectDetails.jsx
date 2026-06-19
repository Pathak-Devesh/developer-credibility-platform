import { Link, useLocation } from "react-router-dom";
function ProjectDetails({ project }) {

    const languageColors = {
        JavaScript: "bg-yellow-400",
        TypeScript: "bg-blue-500",
        HTML: "bg-orange-500",
        CSS: "bg-cyan-400",
        Python: "bg-green-500",
        Java: "bg-red-500",
        C: "bg-gray-400",
        "C++": "bg-blue-400",
        CSharp: "bg-purple-500",
        PHP: "bg-indigo-500",
        Go: "bg-sky-400",
        Rust: "bg-orange-600",
    };

    const location = useLocation();

    const isDashboardView =
        location.pathname.startsWith("/dashboard");

    const languages =
        project.githubAnalytics?.languages || {};

    const totalBytes =
        Object.values(languages)
            .reduce((sum, value) => sum + value, 0);



    return (
        <section className="max-w-6xl mx-auto px-6 py-12">

            <div className="flex items-start justify-between gap-6">

                <div>

                    <h1 className="text-5xl font-bold text-white">
                        {project.title}
                    </h1>

                    <div className="mt-4 text-lg">

                        <p className="text-gray-300">
                            by{" "}
                            <Link
                                to={
                                    isDashboardView
                                        ? `/dashboard/developers/${project.owner._id}`
                                        : `/developers/${project.owner._id}`
                                }
                            >
                                <span className="font-semibold text-red-400 hover:text-rose-600 transition-colors ">
                                    {project.owner?.name} </span>
                            </Link>
                        </p>

                        {project.owner?.headline && (
                            <p className="text-gray-500 mt-1">
                                {project.owner.headline}
                            </p>
                        )}

                    </div>

                </div>

                <div>

                    {project.verificationStatus === "verified" && (
                        <span className="px-3 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                            VERIFIED
                        </span>
                    )}

                    {project.verificationStatus === "pending" && (
                        <span className="px-3 py-2 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium">
                            PENDING
                        </span>
                    )}

                    {project.verificationStatus === "failed" && (
                        <span className="px-3 py-2 rounded-full bg-red-500/20 text-red-400 text-sm font-medium">
                            UNVERIFIED
                        </span>
                    )}

                </div>



            </div>

            <div className="mt-10">

                <h2 className="text-2xl font-semibold text-white mb-4">
                    Description
                </h2>

                <p className="text-gray-300 leading-relaxed">
                    {project.description}
                </p>

            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-10">

                {/* Project Links */}

                <div
                    className="
            h-full
            rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md
            border border-gray-800
            bg-gray-900/30
            backdrop-blur-md
            p-6
        "
                >
                    <h2 className="text-2xl font-semibold text-white mb-6">
                        Project Links
                    </h2>

                    <div className="space-y-5">

                        <div>
                            <p className="text-sm font-medium text-gray-400 mb-1">
                                GitHub Repository
                            </p>

                            {project.githubUrl ? (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="!text-blue-400 hover:!text-blue-300 break-all"
                                >
                                    {project.githubUrl}
                                </a>
                            ) : (
                                <p className="text-gray-500">
                                    No repository provided
                                </p>
                            )}
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-400 mb-1">
                                Live Project
                            </p>

                            {project.liveUrl ? (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="!text-blue-400 hover:!text-blue-300 break-all"
                                >
                                    {project.liveUrl}
                                </a>
                            ) : (
                                <p className="text-gray-500">
                                    Not deployed
                                </p>
                            )}
                        </div>

                    </div>
                </div>

                {/* Analytics */}

                <div
                    className="
            h-full
            rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md
            border border-gray-800
            bg-gray-900/30
            backdrop-blur-md
            p-6
        "
                >
                    <h2 className="text-2xl font-semibold text-white mb-6">
                        GitHub Analytics
                    </h2>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="rounded-lg bg-black/40 p-4">
                            <p className="text-gray-400 text-sm">
                                Stars
                            </p>

                            <p className="text-xl font-bold text-white mt-1">
                                {project.githubAnalytics?.stars || 0}
                            </p>
                        </div>

                        <div className="rounded-lg bg-black/40 p-4">
                            <p className="text-gray-400 text-sm">
                                Forks
                            </p>

                            <p className="text-xl font-bold text-white mt-1">
                                {project.githubAnalytics?.forks || 0}
                            </p>
                        </div>

                        <div className="rounded-lg bg-black/40 p-4">
                            <p className="text-gray-400 text-sm">
                                Primary Language
                            </p>

                            <p className="text-lg font-semibold text-white mt-1">
                                {project.githubAnalytics?.primaryLanguage || "Unknown"}
                            </p>
                        </div>

                        <div className="rounded-lg bg-black/40 p-4">
                            <p className="text-gray-400 text-sm">
                                Last Synced
                            </p>

                            <p className="text-sm text-white mt-1">
                                {project.githubAnalytics?.lastSyncedAt
                                    ? new Date(
                                        project.githubAnalytics.lastSyncedAt
                                    ).toLocaleDateString()
                                    : "Never"}
                            </p>
                        </div>

                    </div>
                </div>

            </div>

            <div
                className="
        mt-8
        rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md
        border border-gray-800
        bg-gray-900/30
        backdrop-blur-md
        p-6
    "
            >

                <h2 className="text-2xl font-semibold text-white mb-5">
                    Tech Stack
                </h2>

                <div className="flex flex-wrap gap-3">

                    {project.techStack?.length > 0 ? (

                        project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="
                        px-3 py-1
                        rounded-md
                        bg-red-500/10
                        text-red-400
                        text-sm
                    "
                            >
                                {tech}
                            </span>
                        ))

                    ) : (

                        <p className="text-gray-500">
                            No technologies provided
                        </p>

                    )}

                </div>

            </div>

            <div
                className="
        mt-8
        rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md
        border border-gray-800
        bg-gray-900/30
        backdrop-blur-md
        p-6
    "
            >

                <h2 className="text-2xl font-semibold text-white mb-5">
                    Detected Technologies
                </h2>

                <div className="flex flex-wrap gap-3">

                    {project.detectedTechnologies?.length > 0 ? (

                        project.detectedTechnologies.map((tech) => (
                            <span
                                key={tech}
                                className="
                        px-3 py-1
                        rounded-md
                        bg-green-500/10
                        text-green-400
                        text-sm
                    "
                            >
                                ✓ {tech}
                            </span>
                        ))

                    ) : (

                        <p className="text-gray-500">
                            No technologies detected yet
                        </p>

                    )}

                </div>

            </div>



            <div
                className="
        mt-8
        rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md
        border border-gray-800
        bg-gray-900/30
        backdrop-blur-md
        p-6
    "
            >

                <h2 className="text-2xl font-semibold text-white mb-6">
                    Language Distribution
                </h2>

                {Object.keys(languages).length === 0 ? (

                    <p className="text-gray-500">
                        No language data available
                    </p>

                ) : (

                    <div className="space-y-5">

                        {Object.entries(languages).map(
                            ([language, bytes]) => {

                                const percentage =
                                    ((bytes / totalBytes) * 100)
                                        .toFixed(1);

                                const barColor =
                                    languageColors[language] ||
                                    "bg-red-400";

                                return (
                                    <div key={language}>

                                        <div className="flex justify-between mb-2">

                                            <div className="flex items-center gap-2">

                                                <div
                                                    className={`w-3 h-3 rounded-full ${barColor}`}
                                                />

                                                <span className="text-white">
                                                    {language}
                                                </span>

                                            </div>

                                            <span className="text-gray-400">
                                                {percentage}%
                                            </span>

                                        </div>

                                        <div className="h-3 bg-black/20 rounded-full overflow-hidden">

                                            <div
                                                className={`h-full rounded-full ${barColor}`}
                                                style={{
                                                    width: `${percentage}%`
                                                }}
                                            />

                                        </div>

                                    </div>
                                );
                            }
                        )}

                    </div>

                )}

            </div>

        </section>


    );

}

export default ProjectDetails;