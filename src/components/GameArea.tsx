"use client";

import { useGameText } from "@/hooks/useGameText";
import { useTextTyping } from "@/hooks/useTextTyping";
import { useTimer } from "@/hooks/useTimer";
import { useGameStore } from "@/lib/stores/gameStore";
import { cn, isMobile } from "@/lib/utils";
import { Loader2, RotateCcw } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Result } from "./Result";
import { CURSOR_ELEMENT_HEIGHT } from "@/lib/constants";
import { User } from "next-auth";
import { Loader } from "./Loader";

interface GameAreaProps {
  user?: User;
}

export const GameArea = ({ user }: GameAreaProps) => {
  const { isFocused, setIsFocused, isGameEnded, setIsGameEnded } =
    useGameStore();
  const { gameText, setGameText, isGameTextFetching, getNewGameText } =
    useGameText();
  const timer = useTimer();
  const {
    currentWordIndex,
    cursorCoordX,
    cursorCoordY,
    handleFocusedKeyPress,
    handleTextTyping,
    lastDisplayedWordIndex,
    typedText,
    resetTypingProgress,
  } = useTextTyping(gameText, setGameText, timer);
  const textInputRef = useRef<HTMLInputElement | null>(null);

  const resetGame = () => {
    setIsFocused(false);
    getNewGameText();
    timer.cancelTimer && timer.cancelTimer();
    timer.resetTimer();
    resetTypingProgress();
    setIsGameEnded(false);
  };

  if (!gameText || isGameTextFetching) return <Loader size={32} />;

  if (isGameEnded)
    return <Result gameText={gameText} onClose={resetGame} user={user} />;

  return (
    <>
      <div className="py-4 relative text-xl">
        <div
          className={cn("absolute -top-8 -left-1 text-primary text-3xl", {
            "opacity-20": !isFocused,
          })}
        >
          {timer.timeToDisplay}
        </div>

        <div
          className={cn(
            `w-[2px] h-[${CURSOR_ELEMENT_HEIGHT}px] bg-caret absolute animate-pulse transition-all duration-[25ms]`,
            {
              invisible: !isFocused,
            }
          )}
          style={{ top: `${cursorCoordY}px`, left: `${cursorCoordX}px` }}
        ></div>

        <div
          className="cursor-pointer relative"
          onClick={() => !isFocused && textInputRef.current?.focus()}
        >
          <input
            ref={textInputRef}
            id="gameTextInput"
            type="text"
            className="absolute top-0 -left-[9999px]"
            value={typedText}
            onChange={handleTextTyping}
            onKeyDown={handleFocusedKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {!isFocused && (
            <div className="absolute inset-0 flex justify-center items-center text-center text-primary">
              {isMobile() ? (
                <span>
                  Smashingkeys app is designed to be used with keyboard. Switch
                  to device with dedicated keyboard to have the best experience.
                  Tap here to gain focus if you still want to continue.
                </span>
              ) : (
                <span>Click here to focus</span>
              )}
            </div>
          )}

          <div
            className={cn("flex flex-wrap transition-opacity", {
              "opacity-50 blur-sm": !isFocused,
            })}
          >
            {gameText &&
              gameText.map((word, wordIdx) => (
                <div
                  key={wordIdx}
                  className={cn("py-1", {
                    "group is-error": word.some(
                      (char) =>
                        char.isTyped &&
                        !char.isCorrect &&
                        wordIdx !== currentWordIndex
                    ),
                    hidden: wordIdx > lastDisplayedWordIndex,
                  })}
                >
                  {word.map((char, charIdx) => (
                    <span
                      key={`key-${wordIdx}-${charIdx}`}
                      id={`pos-${wordIdx}-${charIdx}`}
                      className={cn(
                        {
                          "text-text": char.isTyped && char.isCorrect,
                          "text-primary": char.isTyped && !char.isCorrect,
                          "bg-primary":
                            char.isTyped &&
                            !char.isCorrect &&
                            char.char === "\xa0",
                        },
                        "group-[.is-error]:border-b-2 group-[.is-error]:border-primary"
                      )}
                    >
                      {char.char}
                    </span>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>

      <RotateCcw
        className="cursor-pointer"
        onClick={() => {
          resetGame();
        }}
      />
    </>
  );
};
