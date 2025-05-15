import React from "react";
import type { StudentResult as StudentResultType } from "@/types/student";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface StudentResultProps {
  student: StudentResultType;
}

const StudentResult = ({ student }: StudentResultProps) => {
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

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="overflow-hidden border-2 border-blue-100 shadow-lg animate-fadeIn">
        <CardHeader className="bg-blue-50 flex flex-row items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-blue-200">
              <AvatarImage src={student.photo} alt={student.nom_prenom} />
              <AvatarFallback className="bg-blue-500 text-white">
                {getInitials(student.nom_prenom)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{student.nom_prenom}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="bg-blue-50">
                  Matricule: {student.matricule}
                </Badge>
                <Badge className="bg-blue-500">{student.classe}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center">
            <div className="text-center mb-4">
              <p className="text-gray-500 mb-1">Moyenne Générale</p>
              <div className={`text-2xl font-bold inline-flex items-center justify-center h-16 w-16 rounded-full text-white ${getColorByMoyenne(student.moyenne_generale)}`}>
                {student.moyenne_generale}/20
              </div>
            </div>
            
            <div className="w-full bg-gray-100 h-4 rounded-full mt-6">
              <div 
                className={`h-4 rounded-full ${getColorByMoyenne(student.moyenne_generale)}`}
                style={{ width: `${(parseFloat(student.moyenne_generale) / 20) * 100}%` }}
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
