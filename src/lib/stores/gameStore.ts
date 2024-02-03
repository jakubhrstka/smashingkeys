import { create } from "zustand";
import { DEFAULT_PREDEFINED_GAMETIME } from "../constants";

export interface GameState {
  gameTime: number;
  isGameInProgress: boolean;
  isGameEnded: boolean;
  isFocused: boolean;
  setGameTime: (newGameTime: number) => void;
  setIsGameInProgress: (value: boolean) => void;
  setIsGameEnded: (value: boolean) => void;
  setIsFocused: (value: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameTime: DEFAULT_PREDEFINED_GAMETIME,
  isGameInProgress: false,
  isGameEnded: false,
  isFocused: false,
  setGameTime: (newGameTime) => set(() => ({ gameTime: newGameTime })),
  setIsGameInProgress: (value: boolean) =>
    set(() => ({ isGameInProgress: value })),
  setIsGameEnded: (value: boolean) => set(() => ({ isGameEnded: value })),
  setIsFocused: (value: boolean) => set(() => ({ isFocused: value })),
}));
