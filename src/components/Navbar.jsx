import { Link } from "react-router";

function Navbar() {
  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/training">Training</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
}

export default Navbar;
