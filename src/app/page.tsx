import { GameArea } from "@/components/GameArea";
import { GameSettings } from "@/components/GameSettings";
import { Globe2, RotateCcw } from "lucide-react";

export default function Home() {
  return (
    <div className="grow w-full max-w-7xl mx-auto px-4 flex flex-col">
      <GameSettings />

      <div className="flex flex-col grow items-center justify-center gap-4">
        <div className="flex gap-2 items-center">
          <Globe2 size={20} />
          english
        </div>

        <GameArea />

        {/* <button className="b-link">
               <RotateCcw size={24} className="mt-4" />
            </button> */}
      </div>
    </div>
  );
}
