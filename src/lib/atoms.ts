import { atom } from "jotai";
import { DEFAULT_PREDEFINED_GAMETIME } from "./utils";

export const gameTimeAtom = atom<number>(DEFAULT_PREDEFINED_GAMETIME);
