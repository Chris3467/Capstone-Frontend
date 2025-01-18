import React, { useState } from "react";
import { Chessboard } from "react-chessboard";

// ErrorBoundary for debugging unexpected issues
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>Something went wrong. Please check the console for details.</h1>
      );
    }
    return this.props.children;
  }
}

const TrainingComponent = () => {
  const [step, setStep] = useState(0); // Tracks the tutorial step
  const [highlightSquares, setHighlightSquares] = useState({}); // Tracks highlighted squares

  // Tutorial steps
  const tutorialSteps = [
    {
      message: "Welcome to Chess! Let's start with the Pawn.",
      position: "start", // Initial board position
      highlights: { e2: "rgba(0, 255, 0, 0.5)", e4: "rgba(255, 255, 0, 0.5)" },
    },
    {
      message: "This is the Rook. It moves vertically or horizontally.",
      position: "start", // Initial board position
      highlights: { a1: "rgba(0, 255, 0, 0.5)", a4: "rgba(255, 255, 0, 0.5)" },
    },
    {
      message: "Great! Now explore the game on your own.",
      position: "start", // Initial board position
      highlights: {},
    },
  ];

  const handleNextStep = () => {
    const nextStep = Math.min(step + 1, tutorialSteps.length - 1);
    const nextHighlights = tutorialSteps[nextStep]?.highlights || {};

    // Ensure valid highlight styles
    const validHighlights = Object.fromEntries(
      Object.entries(nextHighlights).filter(
        ([key, value]) => typeof value === "string"
      )
    );

    setStep(nextStep);
    setHighlightSquares(validHighlights);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h1>Chess Training</h1>
      <p
        style={{
          marginBottom: "10px",
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {tutorialSteps[step]?.message || "Loading..."}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "10px",
            backgroundColor: "#2225",
            border: "solid",
            borderRadius: "10px",
          }}
        >
          <Chessboard
            position={tutorialSteps[step]?.position || "start"}
            customSquareStyles={highlightSquares}
            width={550}
          />
        </div>
        <button
          onClick={handleNextStep}
          style={{
            marginLeft: "20px",
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
          Next Step
        </button>
      </div>
    </div>
  );
};

// Wrap the TrainingComponent in an ErrorBoundary
export default function App() {
  return (
    <ErrorBoundary>
      <TrainingComponent />
    </ErrorBoundary>
  );
}
