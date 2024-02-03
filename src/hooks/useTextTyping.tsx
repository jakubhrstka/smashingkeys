import React, { useEffect, useState } from "react";
import { useGameStore } from "@/lib/stores/gameStore";
import { GameTimer } from "./useTimer";
import { GameTextChar } from "./useGameText";
import {
  CURSOR_ELEMENT_HEIGHT,
  LAST_DISPLAYED_WORD_INDEX_SAFE_AREA,
} from "@/lib/constants";

/**
 * Hook to handle text typing
 * - navigating in text, validation
 */

export const useTextTyping = (
  gameText: GameTextChar[][] | null,
  setGameText: React.Dispatch<React.SetStateAction<GameTextChar[][] | null>>,
  timer: GameTimer
) => {
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [lastDisplayedWordIndex, setLastDisplayedWordIndex] = useState(
    gameText ? gameText.length / 2 : 0
  );
  const { isGameInProgress, setIsGameInProgress } = useGameStore();

  const cursorCoordX =
    typeof window !== "undefined" &&
    document.getElementById(`pos-${wordIndex}-${charIndex}`)?.offsetLeft
      ? document.getElementById(`pos-${wordIndex}-${charIndex}`)?.offsetLeft
      : 0;

  const cursorCoordY =
    typeof window !== "undefined" &&
    document.getElementById(`pos-${wordIndex}-${charIndex}`)?.offsetTop
      ? (document.getElementById(`pos-${wordIndex}-${charIndex}`)?.offsetTop ??
          0) +
        CURSOR_ELEMENT_HEIGHT / 2
      : 21;

  function findLastWordInSentence(fromWordIndex: number): number {
    let lastWordIndex = fromWordIndex;

    if (gameText) {
      if (
        gameText[fromWordIndex][gameText[fromWordIndex].length - 2].char === "."
      )
        return lastWordIndex;

      for (let i = lastWordIndex; i < gameText.length; i++) {
        if (gameText[i][gameText[i].length - 2].char === ".") {
          lastWordIndex = i;
          return i;
        }
      }
    }

    return -1;
  }

  const handleTextTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;

    if (!isGameInProgress) {
      setIsGameInProgress(true);
      timer.startTimer();
    }

    if (inputText.length > typedText.length && gameText) {
      const lastTypedChar = e.target.value[e.target.value.length - 1];
      const currentCharCopy = {
        ...gameText[wordIndex][charIndex],
      };
      const gameTextCopy = JSON.parse(JSON.stringify(gameText));

      gameTextCopy[wordIndex][charIndex].isTyped = true;
      gameTextCopy[wordIndex][charIndex].isCorrect =
        currentCharCopy.char ===
        (lastTypedChar === " " ? "\xa0" : lastTypedChar);

      if (gameText[wordIndex].length - 1 === charIndex) {
        setWordIndex((prev) => prev + 1);
        setCharIndex(0);
      } else {
        setCharIndex((prev) => prev + 1);
      }

      setGameText(gameTextCopy);
    }

    setTypedText(inputText);
  };

  const isAnyTypedCharIncorrect = (currentWordIndex: number): boolean => {
    if (gameText) {
      for (let i = currentWordIndex; i >= 0; i--) {
        if (gameText[i].some((char) => char.isTyped && !char.isCorrect))
          return true;
      }
    }

    return false;
  };

  const handleFocusedKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Backspace" && gameText) {
      const newGameText = JSON.parse(JSON.stringify(gameText));
      const currentWordIndex = wordIndex;
      const currentCharIndex = charIndex;

      if (currentCharIndex > 0) {
        setCharIndex(currentCharIndex - 1);
        newGameText[currentWordIndex][currentCharIndex - 1].isTyped = false;
      } else if (
        currentCharIndex === 0 &&
        isAnyTypedCharIncorrect(currentWordIndex)
      ) {
        setWordIndex(currentWordIndex - 1);
        setCharIndex(gameText[currentWordIndex - 1].length - 1);
        newGameText[currentWordIndex - 1][
          gameText[currentWordIndex - 1].length - 1
        ].isTyped = false;
      }

      setGameText(newGameText);
    }
  };

  const resetProgress = () => {
    setTypedText("");
    setWordIndex(0);
    setCharIndex(0);
  };

  useEffect(() => {
    if (gameText) {
      if (
        wordIndex >
        gameText.length / 2 - LAST_DISPLAYED_WORD_INDEX_SAFE_AREA
      ) {
        setLastDisplayedWordIndex(gameText.length - 1);
      } else {
        setLastDisplayedWordIndex(gameText.length / 2);
      }
    }
  }, [gameText, wordIndex]);

  return {
    cursorCoordX,
    cursorCoordY,
    lastDisplayedWordIndex,
    typedText,
    handleTextTyping,
    handleFocusedKeyPress,
    currentWordIndex: wordIndex,
    resetTypingProgress: resetProgress,
  };
};
