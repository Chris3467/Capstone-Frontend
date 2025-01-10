import React, { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const ChessboardComponent = () => {
  const [game, setGame] = useState(new Chess());
  const [isWhiteTurn, setIsWhiteTurn] = useState(true); // Track whose turn it is
  const [gameOver, setGameOver] = useState(false); // Track game over status

  const onDrop = (sourceSquare, targetSquare) => {
    console.log("Dropped:", sourceSquare, targetSquare); // Debugging

    if (gameOver) {
      alert("Game is over! Start a new game.");
      return;
    }

    // Get the current turn ('w' for White, 'b' for Black)
    const currentTurn = game.turn();
    console.log("Current Turn:", currentTurn); // Debugging
    // Check if it's the correct player's turn
    if (
      (currentTurn === "w" && !isWhiteTurn) ||
      (currentTurn === "b" && isWhiteTurn)
    ) {
      // If it's not the correct player's turn, alert and do nothing
      alert("It's not your turn!");
      return;
    }

    // Attempt to make the move using chess.js
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // Always promote to queen for simplicity
    });

    if (move) {
      setGame(new Chess(game.fen())); // Update game state with the new position
      setIsWhiteTurn(!isWhiteTurn); // Switch turn after a valid move

      // Check if the game is over (checkmate, stalemate, etc.)
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
        position={game.fen()}
        onDrop={onDrop}
        width={600} // Adjust the size as needed
        boardOrientation={isWhiteTurn ? "white" : "black"} // Ensure board is oriented properly
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
