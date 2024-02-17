import { create } from "zustand";
import { DEFAULT_PREDEFINED_GAMETIME, DEFAULT_THEME_NAME } from "../constants";

export interface GameState {
  gameTime: number;
  isGameInProgress: boolean;
  isGameEnded: boolean;
  isFocused: boolean;
  themeName: string;
  setGameTime: (newGameTime: number) => void;
  setIsGameInProgress: (value: boolean) => void;
  setIsGameEnded: (value: boolean) => void;
  setIsFocused: (value: boolean) => void;
  setThemeName: (value: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameTime: DEFAULT_PREDEFINED_GAMETIME,
  isGameInProgress: false,
  isGameEnded: false,
  isFocused: false,
  themeName: DEFAULT_THEME_NAME,
  setGameTime: (newGameTime) => set(() => ({ gameTime: newGameTime })),
  setIsGameInProgress: (value: boolean) =>
    set(() => ({ isGameInProgress: value })),
  setIsGameEnded: (value: boolean) => set(() => ({ isGameEnded: value })),
  setIsFocused: (value: boolean) => set(() => ({ isFocused: value })),
  setThemeName: (value: string) => {
    localStorage.setItem("theme", value);
    set(() => ({ themeName: value }));
  },
}));
