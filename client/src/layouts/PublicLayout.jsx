import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default PublicLayout;