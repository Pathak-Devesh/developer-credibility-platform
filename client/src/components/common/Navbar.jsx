import { Link, NavLink } from "react-router-dom";

export default function Navbar() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <nav className="sticky top-0 z-50 text-white flex items-center justify-between rounded-xl bg-gray-950/30 backdrop-blur-lg max-w-7xl mx-auto px-10 py-4">
            <div>
                <NavLink to="/" className="text-2xl font-bold" onClick={scrollToTop}>Developer Credibility</NavLink>
            </div>
            <div className="flex gap-6">
                <NavLink to="/" onClick={scrollToTop} >Home</NavLink>
                <NavLink to="/developers">Developers</NavLink>
                <NavLink to="/projects">Projects</NavLink>
            </div>
            <div className="flex gap-1">
                <NavLink to="/login" className="px-2  border-2 rounded-bl-md rounded-tr-md rounded-br-xs rounded-tl-xs ">login</NavLink>
                <NavLink to="/register" className=" px-2 rounded-tl-md rounded-br-md rounded-tr-xs rounded-bl-xs bg-red-400 !text-black">register</NavLink>
            </div>
        </nav>
    )
};