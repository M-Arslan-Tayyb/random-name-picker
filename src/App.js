"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Shuffle } from "lucide-react";

const ordinals = ["first", "second", "third", "fourth"];

export default function RandomNamePicker() {
  const [names, setNames] = useState([
    "Arslan",
    "Zohaib",
    "Khadija",
    "Zeeshan",
  ]);
  const [currentName, setCurrentName] = useState("");
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedNames, setSelectedNames] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isShuffling) {
      const interval = setInterval(() => {
        setCurrentName(names[Math.floor(Math.random() * names.length)]);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isShuffling, names]);

  const handleClick = () => {
    if (!isShuffling && names.length > 0) {
      setIsShuffling(true);
      setTimeout(() => {
        setIsShuffling(false);
        const winnerIndex = Math.floor(Math.random() * names.length);
        const winner = names[winnerIndex];
        setSelectedNames([...selectedNames, winner]);
        setNames(names.filter((_, index) => index !== winnerIndex));
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }, 2000);
    }
  };

  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 text-center"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Final Results
      </h2>
      {selectedNames.map((name, index) => (
        <motion.p
          key={name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-xl md:text-2xl text-white"
        >
          {ordinals[index]} place: <span className="font-bold">{name}</span>
        </motion.p>
      ))}
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
        Random Name Picker
      </h1>
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentName || "empty"}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.15 }}
            className="text-center mb-8"
          >
            <span className="text-3xl md:text-4xl font-bold text-gray-800">
              {isShuffling
                ? currentName
                : selectedNames.length < 4
                ? "Click to start"
                : "Finished!"}
            </span>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={handleClick}
          disabled={isShuffling || names.length === 0}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={isShuffling ? "Selecting a name" : "Pick a random name"}
        >
          <Shuffle className="mr-2" />
          {isShuffling
            ? "Selecting..."
            : names.length > 0
            ? "Pick a Name"
            : "All names selected"}
        </button>
      </div>
      {selectedNames.length > 0 && !isShuffling && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Congratulations!
          </h2>
          <p className="text-xl md:text-2xl text-white mt-2">
            The {ordinals[selectedNames.length - 1]} person of the committee is{" "}
            <span className="font-bold">
              {selectedNames[selectedNames.length - 1]}
            </span>
          </p>
        </motion.div>
      )}
      {selectedNames.length === 4 && renderResults()}
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
    </div>
  );
}
