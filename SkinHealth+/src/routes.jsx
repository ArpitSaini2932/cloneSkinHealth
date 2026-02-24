import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SkinScan from "./pages/SkinScan";
import Consult from "./pages/Consult";
import AboutUs from "./pages/AboutUs";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCall from "./pages/videoCall";
import Community from "./pages/Community";
import SkinAnalysis from "./pages/SkinAnalysis";
import Chat from "./pages/Chat";
import Navbar from "./components/Navbar";
import SkinScanPage from "./pages/SkinScanPage";
import Footer from "./components/footer";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppWrapper = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/skin-analysis" element={<SkinAnalysis />} />
        <Route path="/scan" element={<SkinScan />} />
        <Route path="/consult" element={<Consult />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/community" element={<Community />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/video-call" element={<VideoCall />} />
        <Route path="/scan-page" element={<SkinScanPage />} />
      </Routes>
      {!hideNavbar && <Footer/>}
    </>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default AppRoutes;
