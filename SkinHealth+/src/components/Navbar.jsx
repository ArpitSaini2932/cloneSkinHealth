import { Link } from "react-router-dom";
import img from '../import/import';
import Home from "../pages/Home";
const Navbar = () => {
  return (
    <nav className="bg-gray-50 text-black p-4">
      <div className="container mx-auto flex justify-between items-center  text-[17px] font-medium">
      <Link to="/">
      <img className="w-44 transition duration-300 " src={img.skinHealth} alt="" /></Link>
        <ul className="flex gap-10 ">
          <li><Link to="/skin-analysis" className="text-white hover:tracking-wide font-inter bg-gradient-to-r from-[#1273FF] to-[#00CCFF] px-7.5 py-3.5 rounded-4xl hover:text-black hover:bg-white border-blue-700 hover:brightness-110 hover:scale-110 transition duration-300 ">Ai Analysis</Link></li>
          <li><Link to="/scan-page" className="hover:brightness-110 hover:tracking-wide transition duration-300 hover:text-gray-400">Derma Call</Link></li>
          <li><Link to="/community" className="hover:brightness-110 hover:tracking-wide transition duration-300 hover:text-gray-400">Community</Link></li>
          <li><Link to="/chat" className="hover:brightness-110 hover:tracking-wide transition duration-300 hover:text-gray-400">Live Chat</Link></li>
          <li><Link to="/about" className="hover:brightness-110 hover:tracking-wide transition duration-300 hover:text-gray-400">About Us</Link></li>
        </ul>
        <ul className="flex gap-8 mr+[30px]">
          <li><Link to ="/login" className="hover:brightness-110 hover:tracking-wide transition duration-300 shadow-lg px-6 py-3 rounded-4xl">Log in</Link></li>
          <li><Link to ="/Signup" className="hover:brightness-110 hover:tracking-wide transition duration-300 text-white  shadow-lg bg-black px-5.5 py-2.5 rounded-4xl ">Sign Up</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
