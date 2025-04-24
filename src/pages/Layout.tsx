import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="bg-[#F8FAFC] ">
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;