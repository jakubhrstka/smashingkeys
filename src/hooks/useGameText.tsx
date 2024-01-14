import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type TGameTextChar = {
  char: string;
  isTyped: boolean;
  isCorrect: boolean;
};

export const useGameText = () => {
  const [gameText, setGameText] = useState<TGameTextChar[][] | null>(null);
  const queryClient = useQueryClient();

  const gameTextQuery = useQuery({
    queryKey: ["gameText"],
    queryFn: async () => {
      const result = await fetch("http://metaphorpsum.com/sentences/10");
      const data = await result.text();

      return data;
    },
  });

  const fetchNewGameText = () => {
    queryClient.invalidateQueries({ queryKey: ["gameText"] });
  };

  useEffect(() => {
    if (gameTextQuery.data) {
      const randomWordsArray = gameTextQuery.data.split(" ");
      const enhancedRandomTextArray: TGameTextChar[][] = randomWordsArray.map(
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
    isGameTextLoading: gameTextQuery.isLoading,
  };
};
