"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

const mockText =
   "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Et harum quidem rerum facilis est et expedita distinctio. Sed convallis magna eu sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Aliquam erat volutpat. Nulla non arcu lacinia neque faucibus fringilla.";

const mockTextWordsArray = mockText.split(" ");

type TGameTextChar = {
   char: string;
   isTyped: boolean;
   isCorrect: boolean;
};

const enhancedMockTextArray: TGameTextChar[][] = mockTextWordsArray.map(
   (word) => {
      return word
         .split("")
         .concat("\xa0")
         .map((char) => {
            return { char, isTyped: false, isCorrect: false };
         });
   }
);

export const Typearea = () => {
   const [gameText, setGameText] = useState(enhancedMockTextArray);
   const [typedText, setTypedText] = useState("");
   const [isFocused, setIsFocused] = useState<boolean>(true);
   const [wordIndex, setWordIndex] = useState(0);
   const [charIndex, setCharIndex] = useState(0);
   const cursorCoordX =
      typeof window !== "undefined" &&
      document.getElementById(`pos-${wordIndex}-${charIndex}`)?.offsetLeft
         ? document.getElementById(`pos-${wordIndex}-${charIndex}`)?.offsetLeft
         : 4;
   const cursorCoordY =
      typeof window !== "undefined" &&
      document.getElementById(`pos-${wordIndex}-${charIndex}`)?.offsetTop
         ? document.getElementById(`pos-${wordIndex}-${charIndex}`)?.offsetTop
         : 21;

   const handleTextTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputText = e.target.value;

      if (inputText.length > typedText.length) {
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

   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Backspace") {
         const newGameText = JSON.parse(JSON.stringify(gameText));
         const currentWordIndex = wordIndex;
         const currentCharIndex = charIndex;

         if (currentCharIndex > 0) {
            setCharIndex(currentCharIndex - 1);
            newGameText[currentWordIndex][currentCharIndex - 1].isTyped = false;
         } else if (
            currentCharIndex === 0 &&
            gameText[currentWordIndex - 1].some((char) => !char.isCorrect)
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

   return (
      <div className="py-4 relative text-xl">
         <div
            className={`w-[2px] h-[28px] bg-caret absolute animate-pulse transition-all duration-75`}
            style={{ top: `${cursorCoordY}px`, left: `${cursorCoordX}px` }}
         ></div>

         <label htmlFor="gameTextInput">
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
               {gameText.map((word, wordIdx) => (
                  <div key={wordIdx} className="py-1">
                     {word.map((char, charIdx) => (
                        <span
                           key={`key-${wordIdx}-${charIdx}`}
                           id={`pos-${wordIdx}-${charIdx}`}
                           className={cn({
                              "text-text": char.isTyped && char.isCorrect,
                              "text-primary": char.isTyped && !char.isCorrect,
                              "bg-primary":
                                 char.isTyped &&
                                 !char.isCorrect &&
                                 char.char === "\xa0",
                           })}
                        >
                           {char.char}
                        </span>
                     ))}
                  </div>
               ))}
            </div>
         </label>

         <div className="relative text-text break-all">
            <div className="absolute left-0 top-[140px] right-0">
               {typedText}
            </div>
         </div>
      </div>
   );
};
