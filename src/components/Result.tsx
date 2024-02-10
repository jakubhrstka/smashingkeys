"use client";

import { Button } from "./Button";
import { getResult } from "@/lib/result";
import { GameTextChar } from "@/hooks/useGameText";
import { useGameStore } from "@/lib/stores/gameStore";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { User } from "next-auth";
import { useMutation } from "@tanstack/react-query";
import { SaveResultPayload } from "@/lib/validators/result";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Loader } from "./Loader";

interface ResultProps {
  gameText: GameTextChar[][];
  onClose: () => void;
  user?: User;
}

export const Result = ({ gameText, onClose, user }: ResultProps) => {
  const { gameTime } = useGameStore();
  const [result] = useState(
    getResult(
      gameText.map((arr) => arr.slice()),
      gameTime
    )
  );

  const { mutate: saveResult, isPending } = useMutation({
    mutationFn: async () => {
      const payload: SaveResultPayload = {
        ...result,
      };

      const { data } = await axios.post("/api/results", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 422)
          return toast.error("Could not save the result. Data are invalid.");

        if (err.response?.status === 401)
          return toast.error("You have to be signed in to save results.");
      }

      return toast.error(
        "Error occured while trying to save the result. Please try again."
      );
    },
    onSuccess: () => {
      toast.success("Your result was successfully saved!");

      onClose();
    },
  });

  return (
    <div className="fixed left-4 right-4 top-[50vh] -translate-y-[50%] flex justify-center items-center">
      <div className="max-w-3xl px-10 bg-tertiary shadow-lg w-full p-4">
        <div className="text-center text-xl font-semibold text-text">
          Result
        </div>

        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="flex items-end gap-4">
            <div className="text-2xl">wpm</div>
            <div className="text-6xl text-primary">{result.wpm}</div>
          </div>
          <div className="flex items-end gap-4">
            <div className="text-2xl">acc</div>
            <div className="text-6xl text-primary">{`${result.acc}%`}</div>
          </div>
          <div className="flex items-end gap-4 mt-4">
            <div className="text-lg">time</div>
            <div className="text-2xl text-primary">{`${result.time}s`}</div>
          </div>
        </div>

        <div className="flex gap-8 justify-around">
          {!user ? (
            <Button
              variant="primary"
              disabled={true}
              data-tooltip-id="not-logged-in-save-button-tooltip"
            >
              Save
            </Button>
          ) : (
            <Button variant="primary" onClick={() => saveResult()}>
              {isPending && <Loader />}
              Save
            </Button>
          )}
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      <Tooltip
        id="not-logged-in-save-button-tooltip"
        place="top"
        content="You have to be signed in to save results"
      />
    </div>
  );
};
