const ProjectCard = ({ project }) => {
    return (
        <div
            className=" rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md border border-gray-800
                bg-gray-900/30 backdrop-blur-md p-6 " >
            <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-xl font-semibold text-white flex-1 break-words">
                    {project.title}
                </h3>

                <span
                    className={`text-xs px-2 py-1 rounded-full shrink-0 ${project.verificationStatus === "verified"
                            ? "bg-green-500/20 text-green-400"
                            : project.verificationStatus === "pending"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                        }
    `}
                >
                    {project.verificationStatus === "verified"
                        ? "VERIFIED"
                        : project.verificationStatus === "pending"
                            ? "PENDING"
                            : "UNVERIFIED"}
                </span>
            </div>

            <p className="text-sm text-gray-400 mb-3">
                by {project.owner?.name}
            </p>

            <p className="text-gray-300 line-clamp-3 mb-4">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack?.slice(0, 4).map((tech) => (
                    <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-md bg-red-500/10 text-red-400"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>
                    ⭐ {project.githubAnalytics?.stars || 0}
                </span>

                <span>
                    🍴 {project.githubAnalytics?.forks || 0}
                </span>
            </div>
        </div>
    );
};

export default ProjectCard;