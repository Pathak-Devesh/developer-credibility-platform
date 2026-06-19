import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { getSavedDevelopers } from "../../api/profileApi";

function RecruiterDashboard() {

    const { user } = useContext(AuthContext);

    const [savedDevelopers, setSavedDevelopers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedDevelopers = async () => {
            try {

                const response =
                    await getSavedDevelopers();

                setSavedDevelopers(
                    response.data.savedDevelopers
                );

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedDevelopers();
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">

            <h1 className="text-4xl font-bold text-white">
                Welcome Back, {user?.name}
            </h1>

            <p className="text-gray-400 mt-2">
                Manage and track saved developers.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-10">

                <div
                    className="
                        bg-gray-900/30
                        border border-gray-800
                        backdrop-blur-md
                        p-6
                        rounded-bl-3xl
                        rounded-tr-3xl
                        rounded-br-md
                        rounded-tl-md
                    "
                >
                    <p className="text-gray-400">
                        Company
                    </p>

                    <p className="text-2xl font-bold text-white mt-2">
                        {user?.company || "Not Set"}
                    </p>
                </div>

                <div
                    className="
                        bg-gray-900/30
                        border border-gray-800
                        backdrop-blur-md
                        p-6
                        rounded-bl-3xl
                        rounded-tr-3xl
                        rounded-br-md
                        rounded-tl-md
                    "
                >
                    <p className="text-gray-400">
                        Designation
                    </p>

                    <p className="text-2xl font-bold text-white mt-2">
                        {user?.designation || "Not Set"}
                    </p>
                </div>

                <div
                    className="
                        bg-gray-900/30
                        border border-gray-800
                        backdrop-blur-md
                        p-6
                        rounded-bl-3xl
                        rounded-tr-3xl
                        rounded-br-md
                        rounded-tl-md
                    "
                >
                    <p className="text-gray-400">
                        Saved Developers
                    </p>

                    <p className="text-2xl font-bold text-red-400 mt-2">
                        {savedDevelopers.length}
                    </p>
                </div>

            </div>

            <div
                className="
                    mt-12
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

                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-white">
                        Recently Saved Developers
                    </h2>

                    <Link
                        to="/dashboard/saved-developers"
                        className="
                            !text-red-400
                            hover:!text-red-300
                            font-medium
                        "
                    >
                        View All →
                    </Link>

                </div>

                {loading ? (

                    <p className="mt-6 text-gray-400">
                        Loading...
                    </p>

                ) : savedDevelopers.length === 0 ? (

                    <p className="mt-6 text-gray-400">
                        No developers saved yet.
                    </p>

                ) : (

                    <div className="grid md:grid-cols-3 gap-4 mt-6">

                        {savedDevelopers
                            .slice(0, 3)
                            .map((item) => {

                                const developer =
                                    item.developer;

                                return (
                                    <div
                                        key={item._id}
                                        className="
                                            border border-white/10
                                            rounded-xl
                                            p-4
                                            bg-black/20
                                        "
                                    >

                                        <h3 className="font-semibold text-lg text-red-400">
                                            {developer.name}
                                        </h3>

                                        <p className="text-sm text-gray-400 mt-1">
                                            {developer.headline ||
                                                "Developer"}
                                        </p>

                                        <Link
                                            to={`/dashboard/developers/${developer._id}`}
                                            className="
                                                inline-block mt-2
            px-2 py-1 rounded-md bg-gray-500/30 !text-gray-200 hover:bg-gray-500/50 transition-colors
                                            "
                                        >
                                            View Profile →
                                        </Link>

                                    </div>
                                );
                            })}

                    </div>

                )}

            </div>

            <div className="flex flex-wrap gap-4 mt-10">

                <Link
                    to="/dashboard/developers"
                    className="
                        px-5 py-3
                        rounded-lg
                        bg-red-400
                        text-black
                        font-semibold
                        hover:bg-red-300
                    "
                >
                    Browse Developers
                </Link>

                <Link
                    to="/dashboard/saved-developers"
                    className="
                        px-5 py-3 rounded-lg font-semibold bg-gray-500/30 !text-gray-200 hover:bg-gray-500/50 transition-colors
                    "
                >
                    View Saved Developers
                </Link>

            </div>

        </section>
    );
}

export default RecruiterDashboard;