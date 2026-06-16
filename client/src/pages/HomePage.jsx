import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-10 pt-24 pb-10 ">
        <div className="flex flex-col gap-6">
          <p> <span className="inline-block bg-rose-400/30 rounded-2xl px-3 py-1 text-gray-100 ">GitHub-Backed Developer Verification</span> </p>

          <h1 className="text-6xl font-bold leading-tight text-white">
            Build Trust Through
            <br />
            Verified Skills
          </h1>

          <p className="max-w-2xl text-xl text-gray-300">
            Showcase your work with confidence through GitHub-backed project verification,
            skill validation, and transparent evidence. Build a professional profile that
            goes beyond claims and proves what you can actually do through{" "}

            <span className="text-red-300 font-semibold">"verified projects"</span>,{" "}
            <span className="text-red-300 font-semibold">"verified skills"</span>,{" "} and a credibility score based on real developer
            activity.
          </p>

          <div className="flex gap-4">
            <Link to ="/register" className="px-4 py-2 rounded-lg font-semibold bg-red-400 text-black hover:!bg-rose-500 ">Get Started</Link>
            <Link to = "/developers" className="px-4 py-2 rounded-lg border-2 font-semibold border-white !text-white hover:!text-black hover:!bg-white ">Explore Developers</Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-10 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">
            Everything You Need To Prove Your Skills
          </h2>

          <p className="text-gray-400 mt-4">
            Build credibility through evidence, not claims.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-gray-900/30 backdrop-blur-md rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-3">
              Verified Projects
            </h3>

            <p className="text-gray-400">
              Connect GitHub repositories and showcase projects backed by real code and activity.
            </p>
          </div>

          <div className="bg-gray-900/30 backdrop-blur-md rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-3">
              Verified Skills
            </h3>

            <p className="text-gray-400">
              Validate technologies and skills using project evidence and GitHub data.
            </p>
          </div>

          <div className="bg-gray-900/30 backdrop-blur-md rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-3">
              Credibility Score
            </h3>

            <p className="text-gray-400">
              Build trust with a transparent score based on verified work and profile completeness.
            </p>
          </div>

        </div>
      </section>

      <section className="max-w-7xl mx-auto px-10 py-20">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">
            How It Works
          </h2>

          <p className="text-gray-400 mt-4">
            Three simple steps to build a trusted developer profile.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-gray-900/30 backdrop-blur-md rounded-xl p-6 border border-gray-800">
            <div className="text-red-300 text-3xl font-bold mb-4">01</div>

            <h3 className="text-xl font-semibold text-white mb-3">
              Connect GitHub
            </h3>

            <p className="text-gray-400">
              Link your GitHub account and repositories to provide real development evidence.
            </p>
          </div>

          <div className="bg-gray-900/30 backdrop-blur-md rounded-xl p-6 border border-gray-800">
            <div className="text-red-300 text-3xl font-bold mb-4">02</div>

            <h3 className="text-xl font-semibold text-white mb-3">
              Verify Projects
            </h3>

            <p className="text-gray-400">
              Analyze technologies, validate ownership, and generate skill evidence.
            </p>
          </div>

          <div className="bg-gray-900/30 backdrop-blur-md rounded-xl p-6 border border-gray-800">
            <div className="text-red-300 text-3xl font-bold mb-4">03</div>

            <h3 className="text-xl font-semibold text-white mb-3">
              Build Credibility
            </h3>

            <p className="text-gray-400">
              Earn a credibility score backed by verified skills, projects, and profile completeness.
            </p>
          </div>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-10 py-20">

        <div className="max-w-4xl">
          <p className="inline-block bg-rose-400/30 rounded-2xl px-3 py-1 text-gray-100 mb-6">
            Why Developer Credibility?
          </p>

          <h2 className="text-5xl font-bold text-white leading-tight mb-8">
            Portfolios Tell.
            <br />
            Evidence Proves.
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
            Traditional portfolios showcase projects and skills, but they often rely
            on claims that are difficult to verify. Developer Credibility bridges
            that gap by connecting real GitHub activity with project verification,
            technology detection, and evidence-backed skill validation.
          </p>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mt-6">
            Instead of simply stating what you know, demonstrate it through
            <span className="text-red-300 font-semibold">
              {" "}verified projects
            </span>,
            <span className="text-red-300 font-semibold">
              {" "}verified skills
            </span>,
            and a transparent
            <span className="text-red-300 font-semibold">
              {" "}credibility score
            </span>
            {" "}generated from real development work.
          </p>
        </div>

      </section>

      <section className="max-w-7xl mx-auto px-10 py-20">

        <div className="bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-2xl p-12 text-center">

          <h2 className="text-5xl font-bold text-white mb-6">
            Ready To Build Your Verified Developer Profile?
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Connect your GitHub projects, verify your skills, and showcase
            evidence-backed credibility to recruiters and collaborators.
          </p>

          <Link to ="/register" className="px-6 py-3 rounded-lg font-semibold bg-red-400 text-black hover:!bg-rose-500">
            Get Started
          </Link>

        </div>

      </section>



    </>
  );
}

export default HomePage;