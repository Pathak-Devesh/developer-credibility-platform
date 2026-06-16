import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../api/projectApi";

function CreateProjectPage() {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            setError("Title and description are required");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const techStackArray = techStack
                .split(",")
                .map((tech) => tech.trim())
                .filter(Boolean);

            await createProject({
                title,
                description,
                githubUrl,
                liveUrl,
                techStack: techStackArray,
            });

            navigate("/dashboard/projects");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to create project"
            );

        } finally {
            setLoading(false);
        }
    };

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [techStack, setTechStack] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    return (
        <section className="max-w-5xl mx-auto px-6 py-16">

            <div className="mb-10">

                <p className="inline-block bg-red-400/20 text-red-300 px-3 py-1 rounded-full mb-4">
                    Project Management
                </p>

                <h1 className="text-4xl font-bold text-white">
                    Create Project
                </h1>

                <p className="mt-4 text-gray-400 max-w-2xl">
                    Add a project to your profile. Verified GitHub projects
                    contribute to your credibility score and skill verification.
                </p>

            </div>

            <div
                className="
                    bg-gray-900/30
                    backdrop-blur-md
                    border border-gray-800
                    p-8
                    rounded-bl-3xl
                    rounded-tr-3xl
                    rounded-br-md
                    rounded-tl-md
                "
            >

                <form className="space-y-6" onSubmit={handleSubmit}>

                    {/* Title */}

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Project Title *
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            placeholder="Developer Credibility Platform"
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-lg
                                bg-black/20
                                border border-white/10
                                text-white
                                outline-none
                            "
                        />
                    </div>

                    {/* Description */}

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Description *
                        </label>

                        <textarea
                            rows="5"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            placeholder="Describe your project..."
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-lg
                                bg-black/20
                                border border-white/10
                                text-white
                                outline-none
                                resize-none
                            "
                        />
                    </div>

                    {/* GitHub URL */}

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            GitHub URL
                        </label>

                        <input
                            type="url"
                            value={githubUrl}
                            onChange={(e) =>
                                setGithubUrl(e.target.value)
                            }
                            placeholder="https://github.com/username/repository"
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-lg
                                bg-black/20
                                border border-white/10
                                text-white
                                outline-none
                            "
                        />
                    </div>

                    {/* Live URL */}

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Live URL
                        </label>

                        <input
                            type="url"
                            value={liveUrl}
                            onChange={(e) =>
                                setLiveUrl(e.target.value)
                            }
                            placeholder="https://your-project.com"
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-lg
                                bg-black/20
                                border border-white/10
                                text-white
                                outline-none
                            "
                        />
                    </div>

                    {/* Tech Stack */}

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Tech Stack
                        </label>

                        <input
                            type="text"
                            value={techStack}
                            onChange={(e) =>
                                setTechStack(e.target.value)
                            }
                            placeholder="React, Node.js, Express, MongoDB"
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-lg
                                bg-black/20
                                border border-white/10
                                text-white
                                outline-none
                            "
                        />

                        <p className="text-xs text-gray-500 mt-2">
                            Separate technologies using commas.
                        </p>
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            py-3
                            rounded-lg
                            bg-red-400
                            text-black
                            font-semibold
                            hover:bg-rose-500
                            transition-colors
                        "
                    >
                        {loading
                            ? "Creating Project..."
                            : "Create Project"}
                    </button>

                </form>

            </div>

        </section>
    );
}

export default CreateProjectPage;