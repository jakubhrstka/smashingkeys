"use client";

import { useGameText } from "@/hooks/useGameText";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

export const Typearea = () => {
  const { gameText, setGameText, isGameTextLoading, getNewGameText } =
    useGameText();
  const [typedText, setTypedText] = useState("");
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const cursorCoordX =
    typeof window !== "undefined" &&
    document.getElementById(`pos-${wordIndex}-${charIndex}`)?.offsetLeft
      ? document.getElementById(`pos-${wordIndex}-${charIndex}`)?.offsetLeft
      : 0;
  const cursorCoordY =
    typeof window !== "undefined" &&
    document.getElementById(`pos-${wordIndex}-${charIndex}`)?.offsetTop
      ? document.getElementById(`pos-${wordIndex}-${charIndex}`)?.offsetTop
      : 21;

  const lastDisplayedWordIndex = gameText
    ? findLastWordInSentence(Math.floor(gameText.length / 2))
    : 0;

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  if (!gameText || isGameTextLoading)
    return (
      <div className="animate-spin">
        <Loader2 size={32} />
      </div>
    );

  return (
    <div className="py-4 relative text-xl">
      <div
        className={`w-[2px] h-[28px] bg-caret absolute animate-pulse transition-all duration-75`}
        style={{ top: `${cursorCoordY}px`, left: `${cursorCoordX}px` }}
      ></div>

      <label htmlFor="gameTextInput" className="cursor-pointer">
        <input
          id="gameTextInput"
          type="text"
          className="absolute top-0 -left-[9999px]"
          autoFocus={true}
          value={typedText}
          onChange={handleTextTyping}
          onKeyDown={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div
          className={cn("flex flex-wrap transition-opacity", {
            "opacity-20": !isFocused,
          })}
        >
          {gameText &&
            gameText.map((word, wordIdx) => (
              <div
                key={wordIdx}
                className={cn("py-1", {
                  "u-word-underline u-word-underline--error": word.some(
                    (char) =>
                      char.isTyped && !char.isCorrect && wordIdx !== wordIndex
                  ),
                  hidden: wordIdx > lastDisplayedWordIndex,
                })}
              >
                {word.map((char, charIdx) => (
                  <span
                    key={`key-${wordIdx}-${charIdx}`}
                    id={`pos-${wordIdx}-${charIdx}`}
                    className={cn({
                      "text-text": char.isTyped && char.isCorrect,
                      "text-primary": char.isTyped && !char.isCorrect,
                      "bg-primary":
                        char.isTyped && !char.isCorrect && char.char === "\xa0",
                    })}
                  >
                    {char.char}
                  </span>
                ))}
              </div>
            ))}
        </div>
      </label>
    </div>
  );
};
