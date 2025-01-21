import { Link } from "react-router";
import { getUser } from "../utilities/users-services";
import { useState, useEffect } from "react";

function PrivateRoute({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  if (user === null) {
    return (
      <div style={styles.container}>
        <div style={styles.messageBox}>
          <h2 style={styles.heading}>Access Restricted</h2>
          <p style={styles.text}>
            You need to{" "}
            <Link to="/profile" style={styles.link}>
              sign in
            </Link>{" "}
            to view this page.
          </p>
        </div>
      </div>
    );
  }

  return children;
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#bea58d",
  },
  messageBox: {
    textAlign: "center",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#6b4f3b",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#f0e2c8",
  },
  text: {
    fontSize: "16px",
    color: "#f0e2c8",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default PrivateRoute;
