
import React from "react";
import type { StudentResult as StudentResultType } from "@/types/student";
import StudentHeader from "./StudentHeader";
import StudentScore from "./StudentScore";
import SubjectsTable from "./SubjectsTable";
import ShareButton from "./ShareButton";
import SuccessConfetti from "../SuccessConfetti";

interface StudentResultProps {
  student: StudentResultType;
}

const StudentResult = ({ student }: StudentResultProps) => {
  return (
    <div className="w-full max-w-full mx-auto">
      <SuccessConfetti moyenne={student.moyenne_generale} studentName={student.nom_prenom} />
      <div className="overflow-hidden border-2 border-blue-100 shadow-lg animate-fadeInScale transition-all duration-500 hover:shadow-xl rounded-lg">
        <StudentHeader student={student} />
        
        <div className="p-4 md:p-6 bg-gradient-to-b from-white to-blue-50">
          <div className="flex flex-col items-center justify-center staggered-animation">
            <StudentScore moyenne={student.moyenne_generale} />
            
            {/* Affichage des matières */}
            {student.matieres && student.matieres.length > 0 && (
              <SubjectsTable subjects={student.matieres} />
            )}

            {/* Bouton de partage */}
            <div className="mt-6 w-full">
              <ShareButton student={student} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentResult;
