import packagejson from "../../package.json";
import { GitMerge, Github, Linkedin, Palette } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="max-w-7xl w-full mx-auto px-4 py-6 text-sm flex gap-4 justify-between mt-8">
      <div className="flex gap-4">
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
      <div>portfolio purposes only</div>
      <div className="flex gap-4">
        <div className="flex gap-2">
          <Palette size={20} />
          bento
        </div>
        <div className="flex gap-2">
          <GitMerge size={20} />v{packagejson.version}
        </div>
      </div>
    </footer>
  );
};
