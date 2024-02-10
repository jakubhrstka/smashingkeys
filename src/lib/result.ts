import { GameTextChar } from "@/hooks/useGameText";

interface Result {
  wpm: number;
  acc: number;
  time: number;
}

function getWordPerMinute(wordsCount: number, time: number): number {
  const multiplier = 60 / time;

  return Math.floor(wordsCount * multiplier);
}

function getAccuracy(
  gameText: GameTextChar[][],
  lastTypedWordIndex: number
): number {
  const splicedAndFlattenedText = gameText
    .splice(0, lastTypedWordIndex + 1)
    .flat();

  const textWithoutNotTypedCharacters = splicedAndFlattenedText.splice(
    0,
    splicedAndFlattenedText.findIndex((char) => !char.isTyped)
  );

  const mistakeCounter = textWithoutNotTypedCharacters.reduce((prev, curr) => {
    return !curr.isCorrect ? prev + 1 : prev;
  }, 0);

  return Math.round(
    ((textWithoutNotTypedCharacters.length - mistakeCounter) /
      textWithoutNotTypedCharacters.length) *
      100
  );
}

export function getResult(
  gameText: GameTextChar[][],
  gameTime: number
): Result {
  const lastTypedWordIndex = gameText.findIndex((word) => {
    return word.findIndex((char) => !char.isTyped) !== -1 ? true : false;
  });

  return {
    wpm: getWordPerMinute(lastTypedWordIndex, gameTime),
    acc: getAccuracy(gameText, lastTypedWordIndex),
    time: gameTime,
  };
}
