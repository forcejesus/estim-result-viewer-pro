
import React, { useState } from "react";
import type { StudentResult } from "@/types/student";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Loader } from "lucide-react";

interface StudentHeaderProps {
  student: StudentResult;
}

const StudentHeader = ({ student }: StudentHeaderProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-blue-50 p-4 md:p-6 relative">
      <div className="flex items-center justify-between">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full staggered-animation">
          <div className="relative mx-auto md:mx-0 animate-fadeIn hover-lift">
            <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden ring-4 ring-blue-200 transition-all duration-500 hover:ring-blue-400 shadow-lg">
              <AspectRatio ratio={1/1} className="bg-blue-50 flex items-center justify-center">
                {imageLoading && !imageError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-50 z-10">
                    <Loader className="h-6 w-6 md:h-8 md:w-8 animate-spin text-blue-500" />
                  </div>
                )}
                {!imageError ? (
                  <img 
                    src={student.photo} 
                    alt={student.nom_prenom}
                    className={`object-cover w-full h-full transition-all duration-700 ${imageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageLoading(false);
                      setImageError(true);
                    }}
                  />
                ) : (
                  <img 
                    src="/lovable-uploads/3fd38e18-45e3-4c7a-936a-8e6c4427d649.png" 
                    alt="ESTIM Logo"
                    className="object-contain w-3/4 h-3/4 opacity-70 animate-pulse" 
                  />
                )}
              </AspectRatio>
            </div>
          </div>
          <div className="text-center md:text-left animate-fadeIn slide-in-right">
            <h2 className="text-lg md:text-xl font-bold text-blue-800 mb-2">{student.nom_prenom}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-1">
              <Badge variant="outline" className="text-xs md:text-sm bg-blue-50 border-blue-200 hover-lift">
                Matricule: {student.matricule}
              </Badge>
              <Badge className="text-xs md:text-sm bg-blue-500 animate-pulse hover-lift">{student.classe}</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;
