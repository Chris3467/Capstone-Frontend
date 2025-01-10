import React, { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const ChessboardComponent = () => {
  const [game] = useState(new Chess()); // Keep a single instance of Chess
  const [isWhiteTurn, setIsWhiteTurn] = useState(true); // Track the current turn
  const [gameOver, setGameOver] = useState(false); // Track game over status
  const [fen, setFen] = useState(game.fen()); // Track board position

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
      if (game.game_over()) {
        setGameOver(true);
        alert("Game over!");
      }
    } else {
      alert("Invalid move!");
    }
  };

  return (
    <div className="chessboard-container">
      <Chessboard
        position={fen}
        onPieceDrop={onDrop} // Callback for react-chessboard
        boardOrientation={isWhiteTurn ? "white" : "black"} // Orient the board
        width={600} // Adjust size as needed
      />
      <div>
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
