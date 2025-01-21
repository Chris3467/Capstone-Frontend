import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Training from "./pages/Training";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/training"
          element={
            <PrivateRoute>
              <Training />
            </PrivateRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
