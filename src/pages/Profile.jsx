import { useState, useEffect } from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import { getUser } from "../utilities/users-services";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const userData = await getUser();
      setUser(userData);
    }
    fetchUser();
  }, []);

  // Dummy stats for demonstration purposes
  const stats = {
    gamesPlayed: 10,
    movesPerGame: 35,
  };

  const handleLogout = () => {
    setUser(null); // Clear user state
  };

  return (
    <>
      {!user ? (
        <>
          <h1>Welcome to the Profile Page</h1>
          <SignUpForm setUser={setUser} />
          <LoginForm setUser={setUser} />
        </>
      ) : (
        <div>
          <h1>Welcome, {user.name}!</h1>
          <p>Email: {user.email}</p>
          <h2>Your Stats</h2>
          <p>Games Played: {stats.gamesPlayed}</p>
          <p>Average Moves Per Game: {stats.movesPerGame}</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </>
  );
}

export default Profile;
