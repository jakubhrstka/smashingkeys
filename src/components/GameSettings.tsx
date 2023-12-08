import { Timer, Wrench } from "lucide-react";

export const GameSettings = () => {
   return (
      <div className="max-w-3xl w-full mx-auto px-4 py-3 bg-tertiary rounded-md text-sm flex items-center justify-center">
         <div className="flex gap-4 items-center">
            <Timer size={16} className="text-primary" />
            <button className="b-link">15</button>
            <button>30</button>
            <button>60</button>
            <button>120</button>
            <button className="b-link">
               <Wrench size={16} />
            </button>
         </div>
      </div>
   );
};
