import { useNavigate } from "react-router-dom";

function MyProjectCard({ project, onDelete, }) {

    const navigate = useNavigate();

    return (
        <div
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


            <div className="flex items-start justify-between gap-4">

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



            <div className="mt-5">
                <p className="text-sm font-medium text-gray-300 mb-2">
                    Tech Stack
                </p>

                <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 rounded-md text-xs bg-red-500/10 text-red-400"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>



            {project.detectedTechnologies?.length > 0 && (
                <div className="mt-5">
                    <p className="text-sm font-medium text-gray-300 mb-2">
                        Detected Technologies
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {project.detectedTechnologies.map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-1 rounded-md text-xs bg-green-500/10 text-green-400"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            )}



            <div className="mt-5 space-y-3">

                <div>
                    <p className="text-sm font-medium text-gray-300">
                        GitHub
                    </p>

                    {project.githubUrl ? (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm !text-blue-400 hover:!text-blue-300 break-all"
                        >
                            {project.githubUrl}
                        </a>
                    ) : (
                        <p className="text-sm text-gray-500">
                            Not provided
                        </p>
                    )}
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-300">
                        Live URL
                    </p>

                    {project.liveUrl ? (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm !text-blue-400 hover:!text-blue-300 break-all"
                        >
                            {project.liveUrl}
                        </a>
                    ) : (
                        <p className="text-sm text-gray-500">
                            Not deployed
                        </p>
                    )}
                </div>

            </div>

            {/* GitHub Analytics */}

            <div className="mt-5">

                <p className="text-sm font-medium text-gray-300 mb-2">
                    GitHub Analytics
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-400">

                    <span>
                        ⭐ {project.githubAnalytics?.stars || 0}
                    </span>

                    <span>
                        🍴 {project.githubAnalytics?.forks || 0}
                    </span>

                    {project.githubAnalytics?.primaryLanguage && (
                        <span>
                            💻 {project.githubAnalytics.primaryLanguage}
                        </span>
                    )}

                </div>

            </div>

            {/* Actions */}

            <div className="mt-6 flex gap-3">

                <button
                    onClick={() =>
                        navigate(`/dashboard/projects/edit/${project._id}`)
                    }
                    className=" px-4 py-2 rounded-md border border-white/10 text-white hover:border-white/30 transition-colors "
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(project._id)}
                    className="px-4 py-2 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors " >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default MyProjectCard;