import { useEffect, useState } from "react";
import { getSavedDevelopers, removeSavedDeveloper, } from "../../api/profileApi";
import SavedDeveloperCard from "../../components/recruiter/SavedDeveloperCard";


function SavedDevelopersPage() {

    const [developers, setDevelopers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSavedDevelopers();
    }, []);

    const handleRemove = async (developerId) => {
        try {

            await removeSavedDeveloper(
                developerId
            );

            setDevelopers((prev) =>
                prev.filter(
                    (item) =>
                        item.developer._id !==
                        developerId
                )
            );

        } catch (error) {
            console.error(error);
        }
    };

    const fetchSavedDevelopers = async () => {
        try {

            const response =
                await getSavedDevelopers();

            console.log(response.data);

            setDevelopers(
                response.data.savedDevelopers
            );

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
    <section className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-white mb-8">
            Saved Developers
        </h1>

        {loading ? (
            <p className="text-gray-400">
                Loading...
            </p>
        ) : developers.length === 0 ? (
            <p className="text-gray-400">
                No saved developers yet.
            </p>
        ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                {developers.map((item) => (
                    <SavedDeveloperCard
                        key={item._id}
                        developer={item.developer}
                        onRemove={handleRemove}
                    />
                ))}

            </div>
        )}

    </section>
);
}

export default SavedDevelopersPage;