
import React from "react";
import { SubjectResult } from "@/types/student";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SubjectsTableProps {
  subjects: SubjectResult[];
}

const SubjectsTable = ({ subjects }: SubjectsTableProps) => {
  return (
    <div className="w-full mt-6 md:mt-8 animate-fadeIn overflow-hidden">
      <h3 className="text-md md:text-lg font-semibold mb-2 md:mb-3 text-blue-800">Détails des matières</h3>
      <div className="rounded-lg border border-blue-100 overflow-x-auto animate-fadeInScale">
        <Table>
          <TableHeader className="bg-blue-50">
            <TableRow>
              <TableHead className="text-xs md:text-sm text-blue-800">Matière</TableHead>
              <TableHead className="text-xs md:text-sm text-blue-800 text-center">Devoir</TableHead>
              <TableHead className="text-xs md:text-sm text-blue-800 text-center">Examen</TableHead>
              <TableHead className="text-xs md:text-sm text-blue-800 text-center">Moyenne</TableHead>
              <TableHead className="text-xs md:text-sm text-blue-800 text-center">Coef</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((matiere, index) => (
              <TableRow 
                key={index}
                className="hover:bg-blue-50 transition-colors"
              >
                <TableCell className="text-xs md:text-sm font-medium py-2 md:py-3">{matiere.matiere}</TableCell>
                <TableCell className="text-xs md:text-sm text-center py-2 md:py-3">{matiere.note_devoir}</TableCell>
                <TableCell className="text-xs md:text-sm text-center py-2 md:py-3">{matiere.note_examen}</TableCell>
                <TableCell className="text-xs md:text-sm text-center font-bold py-2 md:py-3">
                  <span className={`px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-xs ${
                    matiere.moyenne_brute >= 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {matiere.moyenne_brute}
                  </span>
                </TableCell>
                <TableCell className="text-xs md:text-sm text-center py-2 md:py-3">{matiere.coefficient}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubjectsTable;
