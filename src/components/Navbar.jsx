import { Link } from "react-router"; // Make sure you're using "react-router-dom"
import { GiChessKnight } from "react-icons/gi";

function Navbar() {
  return (
    <div className="nav">
      <Link to="/">
        <GiChessKnight size={30} style={{ color: "#f0e2c8" }} />{" "}
        {/* Adjust size and color as needed */}
      </Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/training">Training</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
}

export default Navbar;
