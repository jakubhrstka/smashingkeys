import { lexend_deca } from "@/app/layout";
import { cn } from "@/lib/utils";
import { Crown, Keyboard, KeyboardMusic, Settings, User } from "lucide-react";
import Link from "next/link";

export const Header = () => {
   return (
      <header className="max-w-7xl p-4 flex items-center flex-wrap gap-6">
         <div className="flex gap-2 items-center">
            <KeyboardMusic
               size={56}
               strokeWidth={1.5}
               className="text-primary"
            />
            <span
               className={cn(
                  "text-text tracking-normal text-3xl",
                  lexend_deca.className
               )}
            >
               smashingkeys
            </span>
         </div>
         <div className="flex items-center grow justify-between gap-6">
            <div className="flex items-center gap-8">
               <button className="b-link">
                  <Keyboard />
               </button>
               <Link href="/leaderboard" className="b-link">
                  <Crown />
               </Link>
               <button className="b-link">
                  <Settings />
               </button>
            </div>

            <Link href="/profile" className="b-link">
               <User />
            </Link>
         </div>
      </header>
   );
};
