import { useEffect, useState } from "react";
import { getMyProjects } from "../../api/projectApi";
import MyProjectCard from "../../components/project/MyProjectCard";
import { useNavigate } from "react-router-dom";

function MyProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getMyProjects();

                setProjects(response.data);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load projects"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">

            <div className="flex items-center justify-between mb-8">

                <h1 className="text-4xl font-bold text-white">
                    My Projects
                </h1>

                <button
                    onClick={() => navigate("/dashboard/projects/new")}
                    className=" px-4 py-2 rounded-lg bg-red-400 text-black font-semibold hover:bg-rose-500"
                >
                    Create Project
                </button>

            </div>

            {loading && (
                <p className="text-white">
                    Loading projects...
                </p>
            )}

            {error && (
                <p className="text-red-400">
                    {error}
                </p>
            )}

            {!loading && projects.length === 0 && (
                <div className="text-center py-16">
                    <h2 className="text-2xl text-white">
                        No Projects Yet
                    </h2>

                    <p className="text-gray-400 mt-2">
                        Create your first project to start building credibility.
                    </p>
                </div>
            )}

            {!loading && projects.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <MyProjectCard
                            key={project._id}
                            project={project}
                        />
                    ))}
                </div>
            )}

        </section>
    );
}

export default MyProjectsPage; 