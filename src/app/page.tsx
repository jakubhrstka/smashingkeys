import { GameSettings } from "@/components/GameSettings";
import { Globe2 } from "lucide-react";

export default function Home() {
   return (
      <div className="grow max-w-7xl px-4 flex flex-col">
         <GameSettings />
         <div className="flex flex-col grow items-center justify-center">
            <div className="flex gap-2 items-center">
               <Globe2 size={20} />
               english
            </div>
         </div>
      </div>
   );
}
