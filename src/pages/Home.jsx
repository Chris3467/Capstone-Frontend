import { Link } from "react-router";

function Home() {
  return (
    <div className="home-container">
      <h1 className="title">Welcome to ChessTactix!</h1>
      <p className="intro-text">
        Whether you're just starting or looking to improve your game,
        ChessTactix is designed to help new players learn how to play chess.
        Dive into the world of strategy, tactics, and fun as you challenge
        yourself and become a better chess player.
      </p>
      <p className="cta-text">
        Ready to get started? Explore the tutorials, play against our AI, or
        practice your skills with others.
      </p>
      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>Interactive Chessboard</li>
          <li>Step-by-step Tutorials</li>
          <li>Play Against AI or Friends</li>
          <li>Track Your Progress</li>
        </ul>
      </div>
      <div className="start-button-container">
        <Link to="/dashboard">
          <button className="start-button">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
