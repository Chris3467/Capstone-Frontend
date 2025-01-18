import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const ChessboardComponent = () => {
  const [game] = useState(new Chess()); // Keep a stable Chess instance
  const [isWhiteTurn, setIsWhiteTurn] = useState(true); // Track the current turn
  const [fen, setFen] = useState(game.fen()); // Track board position
  const [gameOver, setGameOver] = useState(false); // Track game over status

  const onDrop = (sourceSquare, targetSquare) => {
    if (gameOver) {
      alert("Game is over! Start a new game.");
      return;
    }

    // Attempt to make the move
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // Auto promote to queen
    });

    if (move) {
      setFen(game.fen()); // Update board position
      setIsWhiteTurn(!isWhiteTurn); // Switch turn

      // Check if the game is over
      if (game.isGameOver()) {
        // Correct method call for chess.js
        setGameOver(true);
        alert("Checkmate!");
      }
    } else {
      alert("Invalid move!");
    }
  };

  const resetGame = () => {
    game.reset(); // Reset the chess game state
    setFen(game.fen()); // Update FEN
    setIsWhiteTurn(true); // Reset turn to white
    setGameOver(false); // Clear game over status
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        className="turn"
        style={{
          backgroundColor: isWhiteTurn ? "#fff" : "#000",
          color: isWhiteTurn ? "#000" : "#fff",
          padding: "10px 20px",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "bold",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        {gameOver
          ? "Game Over!"
          : isWhiteTurn
          ? "White's Turn"
          : "Black's Turn"}
      </div>
      <div
        style={{
          padding: "10px",
          height: "600px",
          width: "600px",
          backgroundColor: "#2225",
          border: "solid",
          borderRadius: "10px",
        }}
      >
        <Chessboard
          position={fen}
          onPieceDrop={onDrop}
          boardOrientation={isWhiteTurn ? "white" : "black"}
          width={550}
        />
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={resetGame}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6b4f3b",
            color: "#f0e2c8",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
          }}
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default ChessboardComponent;
