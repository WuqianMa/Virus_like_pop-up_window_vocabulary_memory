import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Papa from "papaparse"; // CSV Parser
import "./App.css";

const CARD_SIZE_RATIO = 0.3; // 30% of the viewport size
const FONT_SIZE_RATIO = 2; // 300% of the smaller dimension of the card
const DEFAULT_INTERVAL = 500; // Default interval in ms

const getRandomPosition = () => {
  return {
    top: Math.random() * (1 - CARD_SIZE_RATIO) * 100 + "vh",
    left: Math.random() * (100 - CARD_SIZE_RATIO * 100) + "vw",
  };
};

const getRandomColor = () => {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#A833FF", "#33FFF5", "#FFC300",
    "#FF914D", "#FFD700", "#ADFF2F", "#7FFFD4", "#6495ED", "#DC143C", "#00FA9A", "#9370DB",
    "#8A2BE2", "#20B2AA", "#FF4500", "#B22222", "#00CED1", "#D2691E", "#FF1493", "#DAA520", "#40E0D0"];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Modified Card component to show two lines
const Card = ({ word, translation }) => {
  const [position] = useState(getRandomPosition());
  const cardWidth = CARD_SIZE_RATIO * 100 + "vw";
  const cardHeight = CARD_SIZE_RATIO * 100 + "vh";
  const fontSize = `${Math.min(parseFloat(cardWidth), parseFloat(cardHeight)) * 0.8}px`; // Adjust factor as needed
  const [bgColor] = useState(getRandomColor());

  return (
    <div
      className="card"
      style={{
        ...position,
        width: cardWidth,
        height: cardHeight,
        backgroundColor: bgColor,
        fontSize,
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "black",
        border: "5px solid black",
        borderRadius: "10px",
        boxShadow: "4px 4px 15px rgba(0, 0, 0, 0.2)",
        flexDirection: "column", // Ensures text appears in two lines
      }}
    >
      <div>{word}</div>
      <div style={{ marginTop: "5px" }}>{translation}</div> {/* Second line with spacing */}
    </div>
  );
};

const App = () => {
  const [vocabulary, setVocabulary] = useState([]); // Array of objects { word, translation }
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [intervalTime, setIntervalTime] = useState(DEFAULT_INTERVAL);

  // Load CSV file
  useEffect(() => {
    const fetchVocabulary = async () => {
      const response = await fetch("/EnWords.csv"); // Ensure this file is in the `public` folder
      const reader = response.body.getReader();
      const result = await reader.read();
      const text = new TextDecoder().decode(result.value);
      const parsedData = Papa.parse(text, { header: true }).data; // Parse CSV
      const words = parsedData.map((row) => ({
        word: row["word"], // First column
        translation: row["translation"], // Second column
      }));
      setVocabulary(words);
    };
    fetchVocabulary();
  }, []);

  // Ensure words exist before starting interval
  useEffect(() => {
    if (vocabulary.length === 0) return;

    let repeatCount = 0;
    const interval = setInterval(() => {
      setCards((prev) => {
        if (repeatCount < 9) {
          repeatCount++;
        } else {
          repeatCount = 0;
          setCurrentWordIndex((prev) => (prev + 1) % vocabulary.length);
        }
        const newCard = {
          word: vocabulary[currentWordIndex]?.word || "Loading...",
          translation: vocabulary[currentWordIndex]?.translation || "",
          id: Date.now()
        };
        const updatedCards = [...prev, newCard];
        return updatedCards.length > 30 ? updatedCards.slice(1) : updatedCards;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [vocabulary, currentWordIndex, intervalTime]);

  return (
    <div className="app">
      {cards.map((card) => (
        <Card key={card.id} word={card.word} translation={card.translation} />
      ))}
    </div>
  );
};

export default App;
