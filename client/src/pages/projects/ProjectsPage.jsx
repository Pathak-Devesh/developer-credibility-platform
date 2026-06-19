import { useEffect, useState} from "react";
import { getAllProjects } from "../../api/projectApi";
import ProjectCard from "../../components/project/ProjectCard";
import { useLocation } from "react-router-dom";

function ProjectsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    const location = useLocation();

    const isDashboardView =
        location.pathname.startsWith("/dashboard");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);

                const response = await getAllProjects(
                    search,
                    currentPage
                );

                setProjects(response.data.projects);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [search, currentPage]);

    return (
        <section className="mx-auto max-w-7xl px-6 py-16 text-white">
            <h1 className="text-4xl font-bold">
                Projects
            </h1>

            <p className="mt-4 max-w-2xl text-gray-400">
                Explore verified developer projects, discover real
                GitHub-backed work, and evaluate credibility through
                transparent project verification.
            </p>

            <div className="mt-8">
                <input
                    type="text"
                    placeholder="🔍︎ Search by project title, description, or technology..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full md:w-5/12 rounded-xl border border-white/10 bg-gray-950/40 px-4 py-3 text-white outline-none backdrop-blur-md"
                />
            </div>

            {loading ? (
                <div className="mt-12 text-center text-gray-400">
                    Loading projects...
                </div>
            ) : (
                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.length === 0 ? (
                        <div className="col-span-full p-8 text-center">
                            <h3 className="text-xl font-semibold">
                                No projects found :(
                            </h3>

                            <p className="mt-2 text-gray-400">
                                Try searching with a different keyword.
                            </p>
                        </div>
                    ) : (
                        projects.map((project) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                detailsPath={
                                    isDashboardView
                                        ? `/dashboard/all-projects/${project._id}`
                                        : `/projects/${project._id}`
                                }
                            />
                        ))
                    )}
                </div>
            )}

            {!loading && totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-4">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.max(prev - 1, 1)
                            )
                        }
                        disabled={currentPage === 1}
                        className="rounded-md border border-white/10 px-4 py-2 disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span className="text-gray-300">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                        className="rounded-md border border-white/10 px-4 py-2 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </section>
    );
}

export default ProjectsPage;