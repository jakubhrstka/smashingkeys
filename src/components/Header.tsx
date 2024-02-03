import { LEXEND_DECA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Crown, Keyboard, Settings, User } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="max-w-7xl w-full mx-auto px-4 py-6 flex items-center flex-wrap gap-6 mb-8">
      <div className="flex gap-2 items-center">
        <Link
          href="/"
          className={cn(
            "text-text tracking-normal text-3xl",
            LEXEND_DECA.className
          )}
        >
          smashingkeys
        </Link>
      </div>
      <div className="flex items-center grow justify-between gap-6">
        <div className="flex items-center gap-8">
          <Link href="/leaderboard" className="b-link" prefetch={false}>
            <Crown />
          </Link>
        </div>

        <Link href="/profile" className="b-link">
          <User />
        </Link>
      </div>
    </header>
  );
};
