import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function DashboardNavbar() {

    const {
        user,
        setUser,
        setToken,
    } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");

        setToken(null);
        setUser(null);

        navigate("/login");
    };

    const navLinkClass = ({ isActive }) =>
        `font-semibold
        ${isActive
            ? "!text-red-400 transition-colors duration-200"
            : "!text-white hover:!text-red-300 transition-colors duration-200"
        }`;

    return (
        <nav className="sticky top-0 z-50 text-white flex items-center justify-between rounded-xl bg-gray-950/30 backdrop-blur-lg max-w-7xl mx-auto px-10 py-4">


            <div>
                <NavLink
                    to="/dashboard"
                    className="text-2xl font-bold !text-white"
                >
                    Developer Credibility
                </NavLink>
            </div>

            <div className="flex gap-6">
                <NavLink
                    to="/dashboard"
                    end
                    className={navLinkClass}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/dashboard/projects"
                    className={navLinkClass}
                >
                    My Projects
                </NavLink>
            </div>

            <div className="flex items-center gap-3">

                <div
                    className="
            h-7 w-7
            rounded-full
            bg-red-400
            text-black
            flex items-center justify-center
            font-semibold
        "
                >
                    {user?.name?.charAt(0).toUpperCase()}
                </div>

                <span className="text-white">
                    {user?.name}
                </span>

                <button
                    onClick={handleLogout}
                    className="
            px-3 py-1
            border border-white/10
            rounded-md
            hover:border-red-400
            hover:text-red-400
            transition-all duration-200
        "
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}