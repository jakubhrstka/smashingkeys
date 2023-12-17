import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}
export const PREDEFINED_GAMETIMES: number[] = [15, 30, 60, 120];
export const DEFAULT_PREDEFINED_GAMETIME: number = 15;

export const mockText =
   "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Et harum quidem rerum facilis est et expedita distinctio. Sed convallis magna eu sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Aliquam erat volutpat. Nulla non arcu lacinia neque faucibus fringilla.";
export const mockWords = mockText.split(" ");

// const mockTextWordsArray = mockText.split(" ");

// export const enhancedMockTextArray = mockTextWordsArray.map((word) => {
//    return word.split("").map((char) => {
//       return { char, isTyped: false, isCorrect: false };
//    });
// });
