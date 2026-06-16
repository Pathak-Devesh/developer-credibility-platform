import { Outlet } from "react-router-dom";
import backgroundImage from "../assets/images/background.png";
import Footer from "../components/common/Footer";

import DashboardNavbar from "../components/dashboard/DashboardNavbar";

function DashboardLayout() {
  return (
   <div className="min-h-screen"
            style={{ backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "25% top",
            backgroundSize: "130%",backgroundAttachment: "fixed", backgroundRepeat: "no-repeat",backgroundColor: "#141416",}}>
      <DashboardNavbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default DashboardLayout;