import React, { useState } from "react";
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

  return (
    <div className="chessboard-container">
      <Chessboard
        className="board"
        position={fen}
        onPieceDrop={onDrop}
        boardOrientation={isWhiteTurn ? "white" : "black"}
        width={550}
      />
      <div className="turn">
        {gameOver
          ? "Game Over!"
          : isWhiteTurn
          ? "White's Turn"
          : "Black's Turn"}
      </div>
    </div>
  );
};

export default ChessboardComponent;
