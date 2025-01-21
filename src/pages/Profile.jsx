import { useState, useEffect } from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import { getUser, logOut } from "../utilities/users-services";

// Function to fetch chess pieces
const fetchPieces = async () => {
  try {
    const response = await fetch("http://localhost:5052/api/pieces");
    if (!response.ok) {
      throw new Error("Failed to fetch chess pieces");
    }
    const pieces = await response.json();
    return pieces;
  } catch (err) {
    console.error("Error fetching pieces:", err);
    return null;
  }
};

function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [pieces, setPieces] = useState([]); // State to store pieces
  const [showPieces, setShowPieces] = useState(false); // Toggle state for displaying pieces

  useEffect(() => {
    async function fetchUser() {
      const userData = await getUser();
      setUser(userData);
      if (userData) {
        setFormData({
          name: userData.name,
          email: userData.email,
          password: "",
        });
      }
    }
    fetchUser();
  }, []);

  const handleLogout = () => {
    logOut();
    setUser(null); // Clear user state
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const response = await fetch(
          `http://localhost:5052/api/users/${user._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        localStorage.removeItem("token");
        if (response.ok) {
          setUser(null); // Clear user state on successful deletion
          alert("Account deleted successfully.");
        } else {
          alert("Failed to delete account.");
        }
      } catch (err) {
        console.error("Error deleting account:", err);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5052/api/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleFetchPieces = async () => {
    const piecesData = await fetchPieces();
    if (piecesData) {
      setPieces(piecesData);
      setShowPieces(true); // Show the pieces list
    }
  };

  return (
    <>
      {!user ? (
        <>
          <SignUpForm setUser={setUser} />
          <LoginForm setUser={setUser} />
        </>
      ) : (
        <div className="profile">
          <h1>Welcome, {user.name}!</h1>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Log Out</button>
          <button onClick={handleDelete} style={{ color: "red" }}>
            Delete Account
          </button>
          <button onClick={handleEditToggle}>
            {editing ? "Cancel Edit" : "Edit Profile"}
          </button>

          {editing && (
            <form onSubmit={handleUpdate}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Save Changes</button>
            </form>
          )}

          <h2>Your Stats</h2>
          <p>Games Played: 10</p>
          <p>Average Moves Per Game: 35</p>

          <button onClick={handleFetchPieces}>Show Chess Pieces</button>

          {showPieces && (
            <div className="pieces-list">
              <h2>Chess Pieces</h2>
              <ul>
                {pieces.map((piece) => (
                  <li key={piece.name}>
                    {piece.name}: {piece.value} points
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowPieces(false)}>Close</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Profile;
