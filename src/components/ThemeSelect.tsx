"use client";

import { useGameStore } from "@/lib/stores/gameStore";
import { cn } from "@/lib/utils";
import { SaveThemePayload } from "@/lib/validators/theme";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ChevronDown, Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Loader } from "./Loader";

const THEME_NAMES = ["bento", "emerald"];

export const ThemeSelect = ({ isSignedIn }: { isSignedIn: boolean }) => {
  const { themeName, setThemeName } = useGameStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { mutate: saveThemeName, isPending } = useMutation({
    mutationFn: async (name: string) => {
      const payload: SaveThemePayload = {
        name,
      };

      const { data } = await axios.post("/api/user/theme", payload);
      return data as string;
    },
    onError: () => {
      return toast.error(
        "Error occured while trying to save the theme. Theme has been set but not saved."
      );
    },
    onSuccess: () => {
      toast.success("Your theme has been saved to your preferences.");
    },
  });

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
      setShowDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => setShowDropdown((state) => !state)}
      >
        <Palette size={20} />
        {themeName}
        <ChevronDown size={18} />
      </div>
      {showDropdown && (
        <div className="absolute -top-[78px] bg-tertiary p-2 w-full rounded-md">
          {THEME_NAMES.map((name, idx) => (
            <div
              key={idx}
              className={cn(
                "flex items-center gap-1 my-1 cursor-pointer hover:text-primary",
                {
                  "text-primary font-semibold": name === themeName,
                },
                {
                  "pointer-events-none": isPending,
                }
              )}
              onClick={() => {
                setThemeName(name);
                if (isSignedIn) saveThemeName(name);
              }}
            >
              {name}
              {themeName === name && isPending && <Loader size={16} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
