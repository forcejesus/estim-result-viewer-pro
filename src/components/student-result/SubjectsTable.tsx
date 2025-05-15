
import React from "react";
import { SubjectResult } from "@/types/student";
import { Card, CardContent } from "@/components/ui/card";

interface SubjectsTableProps {
  subjects: SubjectResult[];
}

const SubjectsTable = ({ subjects }: SubjectsTableProps) => {
  return (
    <div className="w-full mt-6 md:mt-8 animate-fadeIn">
      <h3 className="text-md md:text-lg font-semibold mb-3 md:mb-4 text-blue-800">Détails des matières</h3>
      <div className="space-y-3 md:space-y-4 animate-fadeInScale">
        {subjects.map((matiere, index) => (
          <Card 
            key={index}
            className="overflow-hidden border border-blue-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="p-3 md:p-4">
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-sm md:text-base text-blue-800">{matiere.matiere}</h4>
                  <div className={`rounded-full px-2 py-0.5 text-xs md:text-sm font-medium ${
                    matiere.moyenne_brute >= 10 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {matiere.moyenne_brute}/20
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Devoir:</span>
                    <span className="font-medium">{matiere.note_devoir}/20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Examen:</span>
                    <span className="font-medium">{matiere.note_examen}/20</span>
                  </div>
                </div>
                
                <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between text-xs md:text-sm">
                  <span className="text-gray-500">Coefficient:</span>
                  <span className="font-medium">{matiere.coefficient}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubjectsTable;
