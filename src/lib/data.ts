import { Result } from "@prisma/client";
import { db } from "./db";
import { LeaderboardResult } from "./types/result/types";

export async function getUserResults(userId: string): Promise<Result[] | null> {
  if (userId) {
    const data = await db.result.findMany({
      where: {
        authorId: userId,
      },
    });

    return data;
  }

  return null;
}

export async function getLeaderboardResults(): Promise<
  LeaderboardResult[] | null
> {
  const highestWPMResults = await db.result.groupBy({
    by: ["authorId"],
    _max: {
      wpm: true,
    },
  });

  if (highestWPMResults && highestWPMResults.length) {
    const resultDetails = await Promise.all(
      highestWPMResults.map(async (result) => {
        if (result._max.wpm) {
          const resultDetail = await db.result.findFirst({
            where: {
              authorId: result.authorId,
              wpm: result._max.wpm,
            },
          });

          if (resultDetail) return resultDetail;
        }
      })
    );

    const leaderboardResults = await Promise.all(
      resultDetails.map(async (result) => {
        if (result) {
          const author = await db.user.findFirst({
            where: {
              id: result.authorId,
            },
            select: {
              name: true,
              image: true,
            },
          });

          if (author) {
            return {
              authorName: author.name,
              authorImage: author.image,
              ...result,
            };
          }
        }
      })
    );

    return leaderboardResults.filter(
      (result): result is LeaderboardResult => !!result
    );
  }

  return null;
}
