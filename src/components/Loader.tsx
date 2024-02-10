import { Loader2 } from "lucide-react";

interface LoaderProps {
  size?: number;
}

export const Loader = ({ size = 24 }: LoaderProps) => {
  return (
    <div className="inline-block animate-spin">
      <Loader2 size={size} />
    </div>
  );
};
