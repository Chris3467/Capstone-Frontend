import React, { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const TrainingComponent = () => {
  const [game] = useState(new Chess()); // Chess.js instance
  const [fen, setFen] = useState(game.fen()); // Board position
  const [isWhiteTurn, setIsWhiteTurn] = useState(true); // Track current turn
  const [gameOver, setGameOver] = useState(false); // Game over status
  const [highlightSquares, setHighlightSquares] = useState({}); // Highlighted squares
  const [selectedPieceInfo, setSelectedPieceInfo] = useState(null); // Selected piece info

  // Get the full name of the piece
  const getFullPieceName = (piece) => {
    if (!piece) return "None";
    const color = piece.color === "w" ? "White" : "Black";
    const pieceType = piece.type.charAt(0).toUpperCase() + piece.type.slice(1); // Capitalize first letter
    return `${color} ${pieceType}`;
  };

  // Handle when a square is clicked
  const onSquareClick = (square) => {
    if (gameOver) return;

    // Fetch legal moves for the selected piece
    const moves = game.moves({ square, verbose: true });

    if (moves.length === 0) return; // No legal moves for this piece

    // Highlight squares for legal moves
    const newHighlightSquares = {};
    moves.forEach((move) => {
      newHighlightSquares[move.to] = {
        backgroundColor: "rgba(0, 255, 0, 0.5)", // Green for legal moves
      };
    });

    setHighlightSquares(newHighlightSquares);

    // Set selected piece info (full name and moves)
    const piece = game.get(square); // Get piece info
    const pieceName = getFullPieceName(piece); // Get the full name of the piece
    const pieceMoves = moves.map((move) => move.to);

    setSelectedPieceInfo({ pieceName, pieceMoves });
  };

  const onDrop = (sourceSquare, targetSquare) => {
    if (gameOver) {
      alert("Game is over! Start a new game.");
      return false;
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
        setGameOver(true);
        alert("Checkmate!");
      }

      setHighlightSquares({}); // Clear highlights
      setSelectedPieceInfo(null); // Clear selected piece info
      return true;
    }

    alert("Invalid move!");
    return false; // Prevent invalid move
  };

  const resetGame = () => {
    game.reset(); // Reset game state
    setFen(game.fen()); // Update FEN
    setIsWhiteTurn(true); // Reset turn
    setGameOver(false); // Clear game over status
    setHighlightSquares({}); // Clear highlights
    setSelectedPieceInfo(null); // Clear selected piece info
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          flex: 1,
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
            customSquareStyles={highlightSquares} // Apply highlighted styles
            boardOrientation={isWhiteTurn ? "white" : "black"}
            width={550}
            onSquareClick={onSquareClick} // Handle square clicks to show legal moves
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

      {/* Aside showing selected piece info */}
      {selectedPieceInfo && (
        <aside
          style={{
            width: "250px",
            padding: "20px",
            backgroundColor: "#b59c82",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginRight: "100px",
          }}
        >
          <h3>Selected Piece: {selectedPieceInfo.pieceName}</h3>
          <h4>Legal Moves:</h4>
          <ul>
            {selectedPieceInfo.pieceMoves.map((move, index) => (
              <li key={index}>{move}</li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
};

export default TrainingComponent;
