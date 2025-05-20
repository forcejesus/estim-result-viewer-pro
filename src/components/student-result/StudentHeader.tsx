
import React, { useState } from "react";
import type { StudentResult } from "@/types/student";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Loader, GraduationCap, UserRound } from "lucide-react";

interface StudentHeaderProps {
  student: StudentResult;
}

const StudentHeader = ({ student }: StudentHeaderProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-50 p-4 md:p-6 rounded-t-lg shadow-inner relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <GraduationCap className="w-full h-full text-blue-800" />
      </div>
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 w-full staggered-animation">
          <div className="relative mx-auto md:mx-0 animate-fadeIn hover-lift">
            <div className="h-24 w-24 md:h-36 md:w-36 rounded-full overflow-hidden ring-4 ring-blue-300 transition-all duration-500 hover:ring-blue-400 shadow-xl hover:shadow-2xl">
              <AspectRatio ratio={1/1} className="bg-blue-100 flex items-center justify-center">
                {imageLoading && !imageError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-50 z-10">
                    <Loader className="h-6 w-6 md:h-8 md:w-8 animate-spin text-blue-500" />
                  </div>
                )}
                {!imageError ? (
                  <img 
                    src={student.photo || "/lovable-uploads/3fd38e18-45e3-4c7a-936a-8e6c4427d649.png"} 
                    alt={student.nom_prenom}
                    className={`object-cover w-full h-full transition-all duration-700 ${imageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageLoading(false);
                      setImageError(true);
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full w-full bg-blue-100">
                    <UserRound className="h-12 w-12 md:h-16 md:w-16 text-blue-400 mb-1" />
                    <img 
                      src="/lovable-uploads/3fd38e18-45e3-4c7a-936a-8e6c4427d649.png" 
                      alt="ESTIM Logo"
                      className="object-contain w-1/2 h-1/2 opacity-60" 
                    />
                  </div>
                )}
              </AspectRatio>
            </div>
          </div>
          <div className="text-center md:text-left animate-fadeIn slide-in-right flex-1">
            <h2 className="text-lg md:text-2xl font-bold text-blue-800 mb-2 tracking-tight">{student.nom_prenom}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-1">
              <Badge variant="outline" className="text-xs md:text-sm bg-white bg-opacity-70 border-blue-200 text-blue-800 hover-lift">
                Matricule: {student.matricule}
              </Badge>
              <Badge className="text-xs md:text-sm bg-blue-600 shadow-sm hover-lift">
                {student.classe}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;
