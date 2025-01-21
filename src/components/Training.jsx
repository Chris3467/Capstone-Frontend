import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const TrainingComponent = () => {
  const [game] = useState(new Chess()); // Keep a stable Chess instance
  const [isWhiteTurn, setIsWhiteTurn] = useState(true); // Track the current turn
  const [fen, setFen] = useState(game.fen()); // Track board position
  const [gameOver, setGameOver] = useState(false); // Track game over status
  const [highlightSquares, setHighlightSquares] = useState({}); // Track highlighted squares
  const [arrows, setArrows] = useState([]); // Track arrows pointing to legal moves
  const [selectedPiece, setSelectedPiece] = useState(null); // Track selected piece

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
        setGameOver(true);
        alert("Checkmate!");
      }

      // Reset highlight squares and arrows after move
      setHighlightSquares({});
      setArrows([]);
      setSelectedPiece(null);
    } else {
      alert("Invalid move!");
    }
  };

  const resetGame = () => {
    game.reset(); // Reset the chess game state
    setFen(game.fen()); // Update FEN
    setIsWhiteTurn(true); // Reset turn to white
    setGameOver(false); // Clear game over status
    setHighlightSquares({}); // Reset highlighted squares
    setArrows([]); // Clear arrows
    setSelectedPiece(null); // Clear selected piece
  };

  const handleSquareClick = (square) => {
    if (gameOver) {
      alert("Game is over! Start a new game.");
      return;
    }

    // If the square has been selected, reset selection
    if (selectedPiece === square) {
      setSelectedPiece(null);
      setHighlightSquares({});
      setArrows([]);
      return;
    }

    // Get legal moves for the selected piece
    const legalMoves = game.legal_moves || []; // Ensure it's always an array
    const moves = legalMoves.filter((move) => move.from === square);
    const newHighlightSquares = {};
    const newArrows = [];

    // Mark legal and illegal moves
    game.board().forEach((row, rowIndex) => {
      row.forEach((square) => {
        const squareName = square ? square.square : null;
        const isLegal = moves.some((move) => move.to === squareName);
        const isIllegal = !isLegal && squareName;

        if (isLegal) {
          newHighlightSquares[squareName] = {
            backgroundColor: "rgba(0, 255, 0, 0.5)",
          }; // Green for legal moves
        }
        if (isIllegal) {
          newHighlightSquares[squareName] = {
            backgroundColor: "rgba(255, 0, 0, 0.5)",
          }; // Red for illegal moves
        }
      });
    });

    setSelectedPiece(square);
    setHighlightSquares(newHighlightSquares);
    setArrows(newArrows);
  };

  const handlePieceMouseDown = (square) => {
    // Handle the piece click down event to show legal moves
    handleSquareClick(square);
  };

  const renderArrows = () => {
    return arrows.map((arrow, index) => (
      <div
        key={index}
        style={{
          position: "absolute",
          top: `${arrow.source.y * 75 + 12}px`,
          left: `${arrow.source.x * 75 + 12}px`,
          width: "50px",
          height: "50px",
          backgroundColor: "transparent",
          pointerEvents: "none", // Make sure the arrow doesn't block interaction
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10px",
            left: "-10px",
            width: "20px",
            height: "20px",
            borderLeft: "3px solid rgba(0, 255, 0, 0.8)",
            borderTop: "3px solid rgba(0, 255, 0, 0.8)",
            transform: `rotate(${Math.atan2(
              arrow.target.y - arrow.source.y,
              arrow.target.x - arrow.source.x
            )}rad)`,
          }}
        ></div>
      </div>
    ));
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
          position: "relative", // Make the chessboard container relative
        }}
      >
        <Chessboard
          position={fen}
          onPieceDrop={onDrop}
          boardOrientation={isWhiteTurn ? "white" : "black"}
          width={550}
          customSquareStyles={highlightSquares} // Apply custom styles to highlighted squares
          onPieceMouseDown={handlePieceMouseDown} // Show valid moves when holding a piece
        />
        {renderArrows()} {/* Render the arrows */}
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

export default TrainingComponent;
