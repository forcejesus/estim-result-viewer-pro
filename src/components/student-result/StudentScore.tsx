
import React, { useState, useEffect } from "react";

interface StudentScoreProps {
  moyenne: string;
}

const StudentScore = ({ moyenne }: StudentScoreProps) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Déclencher l'animation de la barre de progression après le chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getColorByMoyenne = (moyenne: string) => {
    const moyenneNum = parseFloat(moyenne);
    
    if (moyenneNum >= 14) return "bg-green-500";
    if (moyenneNum >= 12) return "bg-blue-500";
    if (moyenneNum >= 10) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusLabel = (moyenne: string) => {
    const moyenneNum = parseFloat(moyenne);
    
    if (moyenneNum >= 14) return "Excellent";
    if (moyenneNum >= 12) return "Bien";
    if (moyenneNum >= 10) return "Passable";
    return "Insuffisant";
  };

  return (
    <>
      <div className="text-center mb-4 md:mb-6 transform transition-all duration-500 hover:scale-105 animate-fadeIn">
        <p className="text-sm md:text-base text-gray-500 mb-1">Moyenne Générale</p>
        <div className={`text-2xl md:text-3xl font-bold inline-flex items-center justify-center h-16 w-16 md:h-20 md:w-20 rounded-full text-white ${getColorByMoyenne(moyenne)} shadow-lg transition-all duration-500 ease-in-out animate-fadeInScale`}>
          {moyenne}/20
        </div>
        <p className="mt-2 text-sm md:text-base font-medium text-gray-700 animate-fadeIn slide-in-right">
          {getStatusLabel(moyenne)}
        </p>
      </div>
      
      <div className="w-full bg-gray-100 h-3 md:h-4 rounded-full mt-3 md:mt-4 overflow-hidden shadow-inner animate-fadeIn">
        <div 
          className={`h-3 md:h-4 rounded-full ${getColorByMoyenne(moyenne)} transition-all duration-1500 ease-out`}
          style={{ 
            width: animationComplete ? `${(parseFloat(moyenne) / 20) * 100}%` : '0%',
            animation: "grow 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)" 
          }}
        ></div>
      </div>
      
      <div className="flex justify-between w-full mt-1 text-xs text-gray-500 animate-fadeIn">
        <span>0</span>
        <span>10</span>
        <span>20</span>
      </div>
    </>
  );
};

export default StudentScore;
