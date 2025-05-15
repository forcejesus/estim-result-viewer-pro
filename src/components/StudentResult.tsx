
import React, { useState } from "react";
import type { StudentResult as StudentResultType } from "@/types/student";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";

interface StudentResultProps {
  student: StudentResultType;
}

const StudentResult = ({ student }: StudentResultProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  
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
    <div className="w-full max-w-md mx-auto">
      <Card className="overflow-hidden border-2 border-blue-100 shadow-lg animate-fadeIn transition-all duration-300 hover:shadow-xl">
        <CardHeader className="bg-blue-50 p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full">
              <div className="relative mx-auto md:mx-0">
                <div className="h-32 w-32 rounded-full overflow-hidden ring-4 ring-blue-200 transition-all duration-300 hover:scale-105 shadow-lg">
                  <AspectRatio ratio={1/1} className="bg-blue-50 flex items-center justify-center">
                    {imageLoading && !imageError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-blue-50 z-10">
                        <Loader className="h-8 w-8 animate-spin text-blue-500" />
                      </div>
                    )}
                    {!imageError ? (
                      <img 
                        src={student.photo} 
                        alt={student.nom_prenom}
                        className={`object-cover w-full h-full transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setImageLoading(false)}
                        onError={(e) => {
                          setImageLoading(false);
                          setImageError(true);
                        }}
                      />
                    ) : (
                      <img 
                        src="/lovable-uploads/3fd38e18-45e3-4c7a-936a-8e6c4427d649.png" 
                        alt="ESTIM Logo"
                        className="object-contain w-3/4 h-3/4 opacity-70" 
                      />
                    )}
                  </AspectRatio>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-xl font-bold text-blue-800">{student.nom_prenom}</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-1">
                  <Badge variant="outline" className="bg-blue-50 border-blue-200">
                    Matricule: {student.matricule}
                  </Badge>
                  <Badge className="bg-blue-500 animate-pulse">{student.classe}</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 bg-gradient-to-b from-white to-blue-50">
          <div className="flex flex-col items-center justify-center">
            <div className="text-center mb-6 transform transition-all duration-300 hover:scale-105">
              <p className="text-gray-500 mb-1">Moyenne Générale</p>
              <div className={`text-3xl font-bold inline-flex items-center justify-center h-20 w-20 rounded-full text-white ${getColorByMoyenne(student.moyenne_generale)} shadow-lg transition-transform duration-300 ease-in-out`}>
                {student.moyenne_generale}/20
              </div>
              <p className="mt-2 font-medium text-gray-700">
                {getStatusLabel(student.moyenne_generale)}
              </p>
            </div>
            
            <div className="w-full bg-gray-100 h-4 rounded-full mt-4 overflow-hidden shadow-inner">
              <div 
                className={`h-4 rounded-full ${getColorByMoyenne(student.moyenne_generale)} transition-all duration-1000 ease-out`}
                style={{ 
                  width: `${(parseFloat(student.moyenne_generale) / 20) * 100}%`,
                  animation: "grow 1s ease-out" 
                }}
              ></div>
            </div>
            
            <div className="flex justify-between w-full mt-1 text-xs text-gray-500">
              <span>0</span>
              <span>10</span>
              <span>20</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentResult;
