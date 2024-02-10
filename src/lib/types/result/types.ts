import { Result } from "@prisma/client";

export interface LeaderboardResult extends Result {
  authorName: string | null;
  authorImage: string | null;
}
