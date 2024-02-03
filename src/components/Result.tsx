"use client";

import { GameTimer } from "@/hooks/useTimer";
import { Button } from "./Button";

interface ResultProps {
  timer: GameTimer;
  onClose: () => void;
}

export const Result = ({ timer, onClose }: ResultProps) => {
  return (
    <div className="fixed left-4 right-4 top-[50vh] -translate-y-[50%] flex justify-center items-center">
      <div className="max-w-3xl px-10 bg-tertiary shadow-lg w-full p-4">
        <div className="text-center text-xl font-semibold text-text">
          Result
        </div>

        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="flex items-end gap-4">
            <div className="text-2xl">wpm</div>
            <div className="text-6xl text-primary">97</div>
          </div>
          <div className="flex items-end gap-4">
            <div className="text-2xl">acc</div>
            <div className="text-6xl text-primary">94%</div>
          </div>
          <div className="flex items-end gap-4 mt-4">
            <div className="text-lg">time</div>
            <div className="text-2xl text-primary">15s</div>
          </div>
        </div>

        <div className="flex gap-8 justify-around">
          <Button variant="primary">Save</Button>
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
