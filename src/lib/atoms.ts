import { atom } from "jotai";
import { DEFAULT_PREDEFINED_GAMETIME } from "./constants";

export const gameTimeAtom = atom<number>(DEFAULT_PREDEFINED_GAMETIME);
