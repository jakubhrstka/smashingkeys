import { ResultTable } from "@/components/ResultTable";
import { getLeaderboardResults } from "@/lib/data";
import Image from "next/image";

export default async function LeaderboardPage() {
  const results = await getLeaderboardResults();

  return (
    <div className="grow w-full max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
      <h1 className="text-3xl">Leaderboard</h1>
      {results && results.length ? (
        <ResultTable results={results} />
      ) : (
        <div>There are no saved results to show yet.</div>
      )}
    </div>
  );
}
