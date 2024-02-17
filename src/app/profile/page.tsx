export const dynamic = "force-dynamic";
export const revalidate = 30;

import { ResultTable } from "@/components/ResultTable";
import { getAuthSession } from "@/lib/auth";
import { getUserResults } from "@/lib/data";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const authSession = await getAuthSession();

  if (!authSession?.user) redirect("/");

  const userResults = await getUserResults(authSession.user.id);

  return (
    <div className="grow w-full max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
      {authSession.user.image && (
        <Image
          className="border-[1px] border-secondary drop-shadow-lg"
          src={authSession.user.image}
          alt={authSession.user.name ?? "Logged In user"}
          width={164}
          height={164}
        />
      )}
      <div className="text-center mb-8">
        <div className="font-bold text-2xl">{authSession.user.name}</div>
        <div>{authSession.user.email}</div>
      </div>
      <h1 className="text-3xl">Saved results</h1>
      {userResults && !!userResults.length ? (
        <ResultTable results={userResults} />
      ) : (
        <div>{"You haven't saved any results yet."}</div>
      )}
    </div>
  );
}
