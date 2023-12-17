"use client";

import { gameTimeAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { Timer, Wrench } from "lucide-react";
import { Modal } from "./Modal";
import React, { useRef, useState } from "react";
import { PREDEFINED_GAMETIMES } from "@/lib/constants";

export const GameSettings = () => {
   const [gameTime, setGameTime] = useAtom(gameTimeAtom);
   const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
   const inputRef = useRef<HTMLInputElement | null>(null);

   const handleTimeClick = (value: number) => {
      if (value !== gameTime) setGameTime(value);
   };

   const handleGameTimeModalConfirm = () => {
      if (inputRef.current && Number(inputRef.current.value) > 0) {
         setGameTime(Number(inputRef.current.value));
         setIsModalOpened(false);
      }
   };

   return (
      <>
         <div className="max-w-3xl w-full mx-auto px-4 py-3 bg-tertiary rounded-md text-sm flex items-center justify-center">
            <div className="flex gap-4 items-center">
               <Timer size={16} className="text-primary" />

               {PREDEFINED_GAMETIMES.map((time) => (
                  <button
                     className={cn("b-link", {
                        "text-text": time === gameTime,
                     })}
                     key={time}
                     onClick={() => handleTimeClick(time)}
                  >
                     {time}
                  </button>
               ))}

               <button
                  className={cn("b-link", {
                     "text-primary": !PREDEFINED_GAMETIMES.includes(gameTime),
                  })}
                  onClick={() => setIsModalOpened(true)}
               >
                  <Wrench size={16} />
               </button>
            </div>
         </div>

         {isModalOpened && (
            <Modal onClose={() => setIsModalOpened(false)}>
               <div className="flex flex-col gap-4">
                  <div className="text-2xl">Test duration</div>
                  <div className="text-sm">Total time: x seconds</div>
                  <input
                     ref={inputRef}
                     type="text"
                     name="customGameTime"
                     placeholder="time in seconds"
                     autoFocus={true}
                     defaultValue={
                        !PREDEFINED_GAMETIMES.includes(gameTime) ? gameTime : ""
                     }
                     onKeyDown={(e: React.KeyboardEvent) =>
                        e.code === "Enter" && handleGameTimeModalConfirm()
                     }
                  />
                  <button
                     className="c-btn c-btn--primary"
                     onClick={handleGameTimeModalConfirm}
                  >
                     ok
                  </button>
               </div>
            </Modal>
         )}
      </>
   );
};
