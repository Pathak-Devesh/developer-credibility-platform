import { Link, NavLink } from "react-router-dom";

export default function Navbar() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    const navLinkClass = ({ isActive }) =>` font-semibold
    ${isActive
        ? "!text-red-400 transition-colors duration-200 "
        : "!text-white hover:!text-red-300 transition-colors duration-200"}`;
    
    return (
        <nav className="sticky top-0 z-50 text-white flex items-center justify-between rounded-xl bg-gray-950/30 backdrop-blur-lg max-w-7xl mx-auto px-10 py-4">
            <div>
                <NavLink to="/" className="text-2xl font-bold" onClick={scrollToTop}>Developer Credibility</NavLink>
            </div>
            <div className="flex gap-6">
                <NavLink to="/" end onClick={scrollToTop} className={navLinkClass}>Home</NavLink>
                <NavLink to="/developers" className={navLinkClass}>Developers</NavLink>
                <NavLink to="/projects" className={navLinkClass}>Projects</NavLink>
            </div>
            <div className="flex gap-1">
                <NavLink to="/login" className={ ({isActive}) => `px-2  border-2 rounded-bl-md rounded-tr-md rounded-br-xs rounded-tl-xs transition-all duration-200
                ${isActive ? "!border-white !text-black !bg-white ":"!text-white hover:!text-black hover:!bg-white hover:!border-white" }`}>login</NavLink>

                <NavLink to="/register" className={({ isActive }) =>`px-2 rounded-tl-md rounded-br-md rounded-tr-xs rounded-bl-xs !text-black transition-all duration-200 ${
            isActive
                ? "bg-rose-500"
                : "bg-red-400 hover:bg-rose-500"
        }`
    }>register</NavLink>
            </div>
        </nav>
    )
};

// "px-2  border-2 rounded-bl-md rounded-tr-md rounded-br-xs rounded-tl-xs "