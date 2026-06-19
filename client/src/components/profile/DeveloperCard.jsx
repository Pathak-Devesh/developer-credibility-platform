import { Link } from "react-router-dom";

function DeveloperCard({
    id,
    name,
    headline,
    bio,
    skills,
    githubUsername,
    credibilityScore,
    verifiedProjects,
    profilePath,
})  {
    return (
        <div className="rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md border border-gray-800
                bg-gray-900/30 backdrop-blur-md p-6 ">
            <h3 className="text-2xl font-bold text-white">
                {name}
            </h3>

            <p className="mt-2 text-white text-md">
                {headline || "Developer"}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-gray-500">
                {bio || "No bio added yet."}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-md text-gray-400">
                    Skills:
                </span>

                {skills.slice(0, 4).map((skill) => (
                    <span
                        key={skill}
                        className="rounded-md  px-1 py-1 text-xs bg-red-500/10 text-red-400"
                    >
                        {skill}
                    </span>
                ))}
            </div>

            <div className="mt-4 text-md text-gray-400">
                GitHub: <span className="text-white font-semibold">{githubUsername || "Not Connected"}</span>
            </div>

            <div className="mt-2 text-md text-gray-400">
                Projects Verified:
                <span className="font-semibold text-white px-1">
                    {verifiedProjects}
                </span>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-gray-400">
                    Credibility Score
                </span>

                <span className="rounded-lg bg-red-200/15 px-3 py-1 font-bold text-red-400">
                    {credibilityScore}
                </span>
            </div>

            <div className="mt-5">
                <Link
                    to={profilePath || `/developers/${id}`}
                    className="
            inline-block
            px-4 py-2 rounded-md bg-gray-500/30 !text-gray-200 hover:bg-gray-500/50 transition-colors
        "
                >
                    <span className="font-semibold">View Profile</span> ➜
                </Link>
            </div>

        </div>
    );
}

export default DeveloperCard;