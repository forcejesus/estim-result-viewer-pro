
import React from "react";
import { SubjectResult } from "@/types/student";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Star, Award } from "lucide-react";

interface SubjectsTableProps {
  subjects: SubjectResult[];
}

const SubjectsTable = ({ subjects }: SubjectsTableProps) => {
  return (
    <div className="w-full mt-6 md:mt-8 animate-fadeIn">
      <h3 className="text-md md:text-lg font-semibold mb-3 md:mb-4 text-blue-800 flex items-center">
        <Award className="mr-2 h-5 w-5 text-blue-700" /> Détails des matières
      </h3>
      <div className="space-y-3 md:space-y-4 animate-fadeInScale">
        {subjects.map((matiere, index) => {
          const isPass = matiere.moyenne_brute >= 10;
          const progressValue = Math.min(matiere.moyenne_brute * 5, 100);
          
          return (
            <Card 
              key={index}
              className={`overflow-hidden border-l-4 ${
                isPass ? 'border-l-green-500' : 'border-l-red-500'
              } border border-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-white to-blue-50/30`}
            >
              <CardContent className="p-3 md:p-4">
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <h4 className="font-semibold text-sm md:text-base text-blue-800">{matiere.matiere}</h4>
                      {matiere.coefficient > 3 && (
                        <Badge variant="outline" className="ml-2 border-blue-300 bg-blue-50 text-blue-700 text-[10px]">
                          Important
                        </Badge>
                      )}
                    </div>
                    <div className={`flex items-center rounded-full px-3 py-1 text-xs md:text-sm font-medium ${
                      isPass 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {isPass ? 
                        <CheckCircle className="h-3.5 w-3.5 mr-1.5" /> : 
                        <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                      }
                      {matiere.moyenne_brute}/20
                    </div>
                  </div>
                  
                  <div className="mb-1.5">
                    <Progress 
                      value={progressValue} 
                      className={`h-1.5 ${isPass ? 'bg-green-100' : 'bg-red-100'}`} 
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-2 text-xs md:text-sm mt-1.5">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/70 rounded-md p-2 border border-blue-100">
                        <div className="text-gray-500 text-[10px] uppercase font-medium tracking-wider">Devoir</div>
                        <div className="font-medium flex justify-between items-center mt-0.5">
                          <span>{matiere.note_devoir}/20</span>
                          {matiere.note_devoir >= 10 && <Star className="h-3 w-3 text-amber-500 fill-amber-500" />}
                        </div>
                      </div>
                      <div className="bg-white/70 rounded-md p-2 border border-blue-100">
                        <div className="text-gray-500 text-[10px] uppercase font-medium tracking-wider">Examen</div>
                        <div className="font-medium flex justify-between items-center mt-0.5">
                          <span>{matiere.note_examen}/20</span>
                          {matiere.note_examen >= 10 && <Star className="h-3 w-3 text-amber-500 fill-amber-500" />}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-1.5 border-t border-blue-100 flex justify-between text-xs md:text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Badge variant="outline" className="border-blue-200 mr-1.5">
                        Coefficient
                      </Badge>
                      <span>{matiere.coefficient}</span>
                    </span>
                    <span className="font-medium text-blue-700">{matiere.moyenne_ponderee.toFixed(1)} points</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectsTable;
