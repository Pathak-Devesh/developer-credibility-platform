import backgroundImage from "../assets/images/background.png";
import ScrollToTop from "../components/common/ScrollToTop";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div className="min-h-screen"
         style={{ backgroundImage: `url(${backgroundImage})`,
         backgroundPosition: "25% top",
         backgroundSize: "130%",backgroundAttachment: "fixed", }}>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;