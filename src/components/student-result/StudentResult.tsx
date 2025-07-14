
import React from "react";
import StudentHeader from "./StudentHeader";
import StudentScore from "./StudentScore";
import SubjectsTable from "./SubjectsTable";
import ShareButton from "./ShareButton";
import { NoExamMessage } from "./NoExamMessage";
import { DebtMessage } from "./DebtMessage";
import type { StudentResult as StudentResultType } from "@/types/student";

interface StudentResultProps {
  student: StudentResultType;
}

const StudentResult = ({ student }: StudentResultProps) => {
  // Vérifier le type de réponse
  if ('detail' in student) {
    // Cas de dette
    return <DebtMessage student={student} />;
  }
  
  if (student.moyenne_generale_annuelle === null || student.matieres.length === 0) {
    // Cas sans examens - cast sécurisé car on vérifie déjà les conditions
    return <NoExamMessage student={student as any} />;
  }
  
  // Cas normal avec résultats
  return (
    <div className="space-y-6 animate-fade-in">
      <StudentHeader 
        name={student.etudiant}
        matricule={student.matricule}
        classe={student.classe}
        anneeAcademique={student.annee_academique}
        photo={student.photo}
      />
      
      <StudentScore 
        moyenne={student.moyenne_generale_annuelle.toString()}
        nombreMatieres={student.nombre_matieres}
        totalCoefficient={student.total_coefficient}
      />
      
      <SubjectsTable subjects={student.matieres} />
      
      <ShareButton 
        studentName={student.etudiant}
        moyenne={student.moyenne_generale_annuelle.toString()}
        classe={student.classe}
      />
    </div>
  );
};

export default StudentResult;
