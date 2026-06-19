import { Link } from "react-router-dom";

function SavedDeveloperCard({
    developer,
    onRemove,
}) {

    return (
        <div
            className="
                rounded-bl-3xl rounded-tr-3xl
                rounded-br-md rounded-tl-md
                border border-gray-800
                bg-gray-900/30
                backdrop-blur-md
                p-6
            "
        >

            <h3 className="text-2xl font-bold text-white">
                {developer.name}
            </h3>

            <p className="mt-2 text-white text-md">
                {developer.headline || "Developer"}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-gray-500 line-clamp-2">
                {developer.bio || "No bio added yet."}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">

                <span className="text-md text-gray-400">
                    Skills:
                </span>

                {developer.skills?.slice(0, 5).map((skill) => (
                    <span
                        key={skill}
                        className="
                            rounded-md
                            px-1 py-1
                            text-xs
                            bg-red-500/10
                            text-red-400
                        "
                    >
                        {skill}
                    </span>
                ))}

            </div>

            <div className="mt-6 flex gap-3">

                <Link
                    to={`/dashboard/developers/${developer._id}`}
                    className="
                        inline-block
                        px-4 py-2
                        rounded-md
                        bg-gray-500/30
                        !text-gray-200
                        hover:bg-gray-500/50
                        transition-colors
                    "
                >
                    <span className="font-semibold">
                        View Complete Profile
                    </span>{" "}
                    ➜
                </Link>

                <button
                    onClick={() =>
                        onRemove(developer._id)
                    }
                    className="
                        px-4 py-2
                        rounded-md
                        border border-red-400/30
                        text-red-400
                        hover:bg-red-400/10
                    "
                >
                    Remove
                </button>

            </div>

        </div>
    );
}

export default SavedDeveloperCard;