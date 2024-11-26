import React, { useState, useEffect } from "react";

const ClickerGame = () => {
  const [gamePhase, setGamePhase] = useState("idle"); // idle, countdown, playing, results
  const [timer, setTimer] = useState(5); // Countdown timer
  const [clicks, setClicks] = useState(0); // Click counter during gameplay
  const [maxScore, setMaxScore] = useState(0); // Maximum score
  const [messages, setMessages] = useState([]); // Messages array

  const resetGame = () => {
    setGamePhase("idle"); // Reset to the initial state
    setClicks(0); // Reset clicks
    setTimer(5); // Reset timer
    setMessages([]); // Clear messages
  };

  const startGame = () => {
    resetGame(); // Reset the game (except max score)
    setGamePhase("countdown");
    let currentMessageIndex = 0;
    const countdownMessages = ["Preparados", "Listos", "Ya"];
    const interval = setInterval(() => {
      if (currentMessageIndex < countdownMessages.length) {
        setMessages((prevMessages) => [...prevMessages, countdownMessages[currentMessageIndex]]);
        currentMessageIndex++;
      } else {
        clearInterval(interval);
        setGamePhase("playing");
      }
    }, 1000);
  };

  useEffect(() => {
    let interval = null;
    if (gamePhase === "playing") {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) return prevTimer - 1;
          clearInterval(interval);
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gamePhase]);

  useEffect(() => {
    if (timer === 0 && gamePhase === "playing") {
      setGamePhase("results");
      if (clicks > maxScore) setMaxScore(clicks);
    }
  }, [timer, gamePhase, clicks, maxScore]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        textAlign: "center",
      }}
    >
      {messages.map((msg, index) => (
        <h2 key={index} style={{ margin: "5px" }}>
          {msg}
        </h2>
      ))}

      {gamePhase === "playing" && <h2>Time Left: {timer} seconds</h2>}

      <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
        <button
          style={{
            width: "100px",
            height: "50px",
            backgroundColor: "red",
            color: "white",
            fontSize: "16px",
          }}
          onClick={startGame}
        >
          Red
        </button>
        <button
          style={{
            width: "100px",
            height: "50px",
            backgroundColor: "blue",
            color: "white",
            fontSize: "16px",
          }}
          onClick={() => setClicks((prev) => prev + 1)}
          disabled={gamePhase !== "playing"}
        >
          Blue
        </button>
      </div>

      <h3>Score: {clicks}</h3>
      <h3>Max Score: {maxScore}</h3>
    </div>
  );
};

export default ClickerGame;
