import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useRef, useEffect } from "react";


export default function DashboardNavbar() {

    const {
        user,
        setUser,
        setToken,
    } = useContext(AuthContext);

    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");

        setToken(null);
        setUser(null);

        navigate("/login");
    };

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

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

                {user?.role === "developer" && (
                    <NavLink
                        to="/dashboard/projects"
                        className={navLinkClass}
                    >
                        My Projects
                    </NavLink>
                )}

                {user?.role === "recruiter" && (
                    <>
                        <NavLink
                            to="/dashboard/developers"
                            className={navLinkClass}
                        >
                            Developers
                        </NavLink>

                        <NavLink
                            to="/dashboard/all-projects"
                            className={navLinkClass}
                        >
                            Projects
                        </NavLink>

                        <NavLink
                            to="/dashboard/saved-developers"
                            className={navLinkClass}
                        >
                            Saved Developers
                        </NavLink>
                    </>
                )}

            </div>

            <div className="relative">

                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="
            flex items-center gap-3 
            rounded-br-xl rounded-tl-xl rounded-bl-sm rounded-tr-sm
            border border-gray-800 bg-gray-950
            px-3 py-2
            hover:border-red-400
            transition-all duration-200
        "
                >

                    <div
                        className="
                h-6 w-6
                rounded-full
                bg-red-400
                text-black
                flex items-center justify-center
                font-semibold
            "
                    >
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>

                    <span className="text-white min-w-[30px]">
                        {user?.name}
                    </span>

                    <span className="text-xs text-gray-400">
                        {isDropdownOpen ? "▲" : "▼"}
                    </span>

                </button >

                {isDropdownOpen && (
                    <div ref={dropdownRef}
                        className="
            absolute right-0 mt-1 w-full 
            overflow-hidden
            rounded-lg 
            border border-gray-800
            bg-gray-950
            shadow-xl
        "
                    >

                        <NavLink
                            to="/dashboard/profile"
                            onClick={() => setIsDropdownOpen(false)}
                            className="
        block w-full
        px-4 py-3
        text-left
        hover:bg-white/10
        transition-colors
    "
                        >
                            My Profile
                        </NavLink>

                        <button
                            onClick={handleLogout}
                            className="
                block w-full
                px-4 py-3
                text-left
                text-red-400
                hover:bg-white/10
                hover:text-red-500
                transition-colors
            "
                        >
                            Logout ➜]
                        </button>

                    </div>
                )}

            </div>

        </nav>
    );
}