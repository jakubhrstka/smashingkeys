import { Roboto_Mono, Lexend_Deca } from "next/font/google";

export const ROBOTO_MONO = Roboto_Mono({ subsets: ["latin"], display: "swap" });
export const LEXEND_DECA = Lexend_Deca({ subsets: ["latin"], display: "swap" });

export const PREDEFINED_GAMETIMES: number[] = [15, 30, 60, 120];
export const DEFAULT_PREDEFINED_GAMETIME: number = 15;
