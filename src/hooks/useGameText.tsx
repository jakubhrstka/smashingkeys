import { getSentencesApiUrl } from "@/lib/api/sentences";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface GameTextChar {
  char: string;
  isTyped: boolean;
  isCorrect: boolean;
}

/**
 * Hook that handles fetching and setting up text for the game
 */
export const useGameText = () => {
  const [gameText, setGameText] = useState<GameTextChar[][] | null>(null);
  const queryClient = useQueryClient();

  const gameTextQuery = useQuery({
    queryKey: ["gameText"],
    queryFn: async (): Promise<string> => {
      const result = await fetch(getSentencesApiUrl());
      const data = await result.json();

      return data[0];
    },
  });

  const fetchNewGameText = () => {
    queryClient.invalidateQueries({ queryKey: ["gameText"] });
  };

  useEffect(() => {
    if (gameTextQuery.data) {
      const randomWordsArray = gameTextQuery.data.split(" ");
      const enhancedRandomTextArray: GameTextChar[][] = randomWordsArray.map(
        (word) => {
          return word
            .split("")
            .concat("\xa0")
            .map((char) => {
              return { char, isTyped: false, isCorrect: false };
            });
        }
      );

      toast.success("Your game text is ready!");

      setGameText(enhancedRandomTextArray);
    }
  }, [gameTextQuery.data]);

  return {
    gameText,
    setGameText,
    getNewGameText: fetchNewGameText,
    isGameTextFetching: gameTextQuery.isFetching,
  };
};
