import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        &copy; {currentYear} ChessTactix. All rights reserved.
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: "center",
    padding: "10px 0",
    backgroundColor: "#6b4f3b",
    position: "fixed",
    bottom: 0,
    width: "100%",
    borderTop: "1px solid #e0e0e0",
  },
  text: {
    margin: 0,
    fontSize: "14px",
    color: "#f0e2c8",
  },
};

export default Footer;
