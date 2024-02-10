import { LeaderboardResult } from "@/lib/types/result/types";
import { Result } from "@prisma/client";
import Image from "next/image";
import { ComponentProps } from "react";

interface ResultTableProps {
  results: Result[] | LeaderboardResult[];
}

export const ResultTable = ({ results }: ResultTableProps) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-secondary text-tertiary">
          {"authorName" in results[0] && <td>USER</td>}
          <td>DATE</td>
          <td>WPM</td>
          <td>ACC</td>
          <td>TIME</td>
        </tr>
      </thead>
      <tbody>
        {results.map((result) => (
          <tr key={result.id} className="even:bg-tertiary">
            {"authorName" in result && (
              <td className="py-2 px-1 flex items-center gap-2">
                {result.authorImage && (
                  <Image
                    src={result.authorImage}
                    alt={`Profile picture of user ${result.authorName}`}
                    width={32}
                    height={32}
                  />
                )}
                {result.authorName}
              </td>
            )}
            <td className="py-2 px-1">
              {new Date(result.createdAt).toLocaleDateString("en-US")}
            </td>
            <td className="py-2 px-1">{result.wpm}</td>
            <td className="py-2 px-1">{`${result.acc}%`}</td>
            <td className="py-2 px-1">{`${result.time}`}s</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
