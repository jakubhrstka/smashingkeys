import packagejson from "../../package.json";
import { GitMerge, Github, Linkedin, Palette } from "lucide-react";
import { ThemeSelect } from "./ThemeSelect";
import { getAuthSession } from "@/lib/auth";

export const Footer = async () => {
  const session = await getAuthSession();

  return (
    <footer className="max-w-7xl w-full mx-auto px-4 py-6 text-sm flex flex-wrap gap-4 justify-center sm:justify-between mt-8">
      <div className="flex gap-4 order-1">
        <a
          href="https://github.com/jakubhrstka"
          target="_blank"
          rel="noopener"
          className="flex gap-2"
        >
          <Github size={20} />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/hrstkajakub/"
          target="_blank"
          rel="noopener"
          className="flex gap-2"
        >
          <Linkedin size={20} />
          Linkedin
        </a>
      </div>
      <div className="order-2 w-full text-center sm:order-1 sm:w-auto">
        portfolio purposes only
      </div>
      <div className="flex gap-4 order-1">
        <ThemeSelect isSignedIn={!!session?.user} />
        <div className="flex gap-2">
          <GitMerge size={20} />v{packagejson.version}
        </div>
      </div>
    </footer>
  );
};
