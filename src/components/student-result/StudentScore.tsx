
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Award, TrendingUp, TrendingDown, Star } from "lucide-react";

interface StudentScoreProps {
  moyenne: string;
  nombreMatieres: number;
  totalCoefficient: number;
}

const StudentScore = ({ moyenne, nombreMatieres, totalCoefficient }: StudentScoreProps) => {
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
    
    if (moyenneNum >= 17) return "bg-gradient-to-br from-emerald-400 to-emerald-600";
    if (moyenneNum >= 16) return "bg-gradient-to-br from-green-400 to-green-600";
    if (moyenneNum >= 14) return "bg-gradient-to-br from-blue-400 to-blue-600";
    if (moyenneNum >= 12) return "bg-gradient-to-br from-cyan-400 to-cyan-600";
    if (moyenneNum >= 10) return "bg-gradient-to-br from-yellow-400 to-yellow-600";
    return "bg-gradient-to-br from-red-400 to-red-600";
  };

  const getLightColorByMoyenne = (moyenne: string) => {
    const moyenneNum = parseFloat(moyenne);
    
    if (moyenneNum >= 17) return "bg-emerald-100 text-emerald-800";
    if (moyenneNum >= 16) return "bg-green-100 text-green-800";
    if (moyenneNum >= 14) return "bg-blue-100 text-blue-800";
    if (moyenneNum >= 12) return "bg-cyan-100 text-cyan-800";
    if (moyenneNum >= 10) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getStatusLabel = (moyenne: string) => {
    const moyenneNum = parseFloat(moyenne);
    
    if (moyenneNum >= 17) return "Excellent";
    if (moyenneNum >= 16) return "Très bien";
    if (moyenneNum >= 14) return "Bien";
    if (moyenneNum >= 12) return "Assez bien";
    if (moyenneNum >= 10) return "Passable";
    return "Insuffisant";
  };

  const getStatusIcon = (moyenne: string) => {
    const moyenneNum = parseFloat(moyenne);
    
    if (moyenneNum >= 17) return <Award className="h-5 w-5" />;
    if (moyenneNum >= 16) return <Star className="h-5 w-5" />;
    if (moyenneNum >= 14) return <TrendingUp className="h-5 w-5" />;
    if (moyenneNum >= 12) return <TrendingUp className="h-5 w-5" />;
    if (moyenneNum >= 10) return <Star className="h-5 w-5" />;
    return <TrendingDown className="h-5 w-5" />;
  };

  return (
    <>
      <div className="text-center mb-4 md:mb-8 transform transition-all duration-500 hover:scale-105 animate-fadeIn">
        <p className="text-sm md:text-base text-gray-600 mb-2 font-medium tracking-wide uppercase">Moyenne Générale</p>
        
        <div className="relative inline-block">
          {/* Outer ring animation */}
          <div className={`absolute -inset-2 rounded-full opacity-30 animate-pulse ${getColorByMoyenne(moyenne)}`}></div>
          
          {/* The score circle */}
          <div className={`relative text-2xl md:text-3xl font-bold inline-flex items-center justify-center h-24 w-24 md:h-28 md:w-28 rounded-full text-white ${getColorByMoyenne(moyenne)} shadow-lg transition-all duration-500 ease-in-out animate-fadeInScale p-2 md:p-3 border-4 border-white`}>
            <div className="flex flex-col items-center justify-center">
              <span className="text-3xl md:text-4xl font-bold">{moyenne}</span>
              <span className="text-xs md:text-sm font-medium text-white/80">sur 20</span>
            </div>
          </div>
        </div>
        
        <Badge className={`mt-4 px-3 py-1 font-medium flex items-center gap-1.5 mx-auto ${getLightColorByMoyenne(moyenne)}`}>
          {getStatusIcon(moyenne)}
          <span>{getStatusLabel(moyenne)}</span>
        </Badge>
      </div>
      
      <div className="w-full bg-gray-100 h-3 md:h-4 rounded-full mt-3 md:mt-4 overflow-hidden shadow-inner animate-fadeIn">
        <div 
          className={`h-3 md:h-4 rounded-full ${getColorByMoyenne(moyenne)} transition-all duration-1500 ease-out relative`}
          style={{ 
            width: animationComplete ? `${(parseFloat(moyenne) / 20) * 100}%` : '0%',
            animation: "grow 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)" 
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        </div>
      </div>
      
      <div className="flex justify-between w-full mt-2 mb-4 text-xs md:text-sm text-gray-600 font-medium animate-fadeIn">
        <span className="bg-white px-2 py-0.5 rounded shadow-sm">0</span>
        <span className="bg-white px-2 py-0.5 rounded shadow-sm">10</span>
        <span className="bg-white px-2 py-0.5 rounded shadow-sm">20</span>
      </div>
    </>
  );
};

export default StudentScore;
