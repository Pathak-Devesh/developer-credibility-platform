function DeveloperCard({
    name,
    headline,
    bio,
    skills,
    githubUsername,
    credibilityScore,
    verifiedProjects,
}) {
    return (
        <div className="rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md border border-white/10 bg-gray-950/40 p-6 backdrop-blur-md">
            <h3 className="text-2xl font-bold text-red-300">
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
                        className="rounded-md bg-white/10 px-2 py-2 text-xs text-gray-300"
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
            
        </div>
    );
}

export default DeveloperCard;