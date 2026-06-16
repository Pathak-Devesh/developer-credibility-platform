import { Link } from "react-router-dom";

function Footer() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <footer className="mt-20 border-t border-white/10 bg-gray-950/40 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-6 py-12">

                <div className="grid gap-10 md:grid-cols-3">

                  
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-xl font-bold text-white">
                            Developer Credibility
                        </h3>

                        <p className="max-w-sm text-sm leading-relaxed text-gray-400">
                            Showcase verified projects, verified skills, and
                            GitHub-backed evidence to build trust and credibility
                            as a developer.
                        </p>
                    </div>

                   
                    <div className="flex flex-col space-y-4">
                        <h4 className="font-semibold text-white">
                            Quick Links
                        </h4>

                        <div className="flex flex-col space-y-2 text-sm text-gray-400">
                            <Link
                                to="/"
                                className="transition hover:!text-white"
                                onClick={scrollToTop}
                            >
                                Home
                            </Link>

                            <Link
                                to="/developers"
                                className="transition hover:!text-white"
                            >
                                Developers
                            </Link>

                            <Link
                                to="/projects"
                                className="transition hover:!text-white"
                            >
                                Projects
                            </Link>
                        </div>
                    </div>

                    
                    <div className="flex flex-col space-y-4">
                        <h4 className="font-semibold text-white">
                            Account
                        </h4>

                        <div className="flex flex-col space-y-2 text-sm text-gray-400">
                            <Link
                                to="/login"
                                className="transition hover:!text-white"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="transition hover:!text-white"
                            >
                                Register
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
                    © 2026 Developer Credibility. All rights reserved.
                </div>

            </div>
        </footer>
    );
}

export default Footer;