import { useEffect, useState } from "react";
import { getAllDevelopers } from "../api/userApi";
import DeveloperCard from "../components/profile/DeveloperCard";

function DevelopersPage() {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [developers, setDevelopers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchDevelopers = async () => {
            try {
                const response = await getAllDevelopers(search, currentPage);

                console.log(response.data);

                setDevelopers(response.data.developers);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDevelopers();
    }, [search, currentPage]);

    return (
        <section className="mx-auto max-w-7xl px-6 py-16 text-white">
            <h1 className="text-4xl font-bold">
                Developers
            </h1>

            <p className="mt-4 max-w-2xl text-gray-400">
                Browse verified developers, explore their skills,
                and discover credibility backed by real projects.
            </p>

            <div className="mt-8">
                <input
                    type="text"
                    placeholder="🔍︎ Search developers by name, headline, or skill...  "
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    className="w-4/12 rounded-xl border border-white/10 bg-gray-950/40 px-4 py-3 text-white outline-none backdrop-blur-md"
                />
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {developers.length === 0 ? (
                    <div className="col-span-full  p-8 text-center">
                        <h3 className="text-xl font-semibold text-white">
                            No developers found :(
                        </h3>

                        <p className="mt-2 text-gray-400">
                            Try searching with a different name, skill, or headline.
                        </p>
                    </div>
                ) : (
                    developers.map((developer) => (
                        <DeveloperCard
                            key={developer._id}
                            name={developer.name}
                            headline={developer.headline}
                            bio={developer.bio}
                            skills={developer.skills}
                            githubUsername={developer.githubUsername}
                            credibilityScore={developer.credibility.score}
                            verifiedProjects={developer.verifiedProjects}
                        />
                    ))
                )}
            </div>

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

        </section>
    );
}

export default DevelopersPage;