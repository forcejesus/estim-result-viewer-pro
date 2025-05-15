
import React from "react";
import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center py-8 gap-4">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-blue-200 opacity-30"></div>
        <Loader className="h-16 w-16 text-blue-500 absolute top-0 left-0 animate-spin" />
      </div>
      <p className="text-blue-600 animate-pulse text-lg font-medium">Chargement en cours...</p>
    </div>
  );
};

export default LoadingSpinner;
