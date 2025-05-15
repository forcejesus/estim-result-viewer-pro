
import React from "react";
import { SubjectResult } from "@/types/student";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SubjectsTableProps {
  subjects: SubjectResult[];
}

const SubjectsTable = ({ subjects }: SubjectsTableProps) => {
  return (
    <div className="w-full mt-8 animate-fadeIn overflow-hidden">
      <h3 className="text-lg font-semibold mb-3 text-blue-800">Détails des matières</h3>
      <div className="rounded-lg border border-blue-100 overflow-hidden animate-fadeInScale">
        <Table>
          <TableHeader className="bg-blue-50">
            <TableRow>
              <TableHead className="text-blue-800">Matière</TableHead>
              <TableHead className="text-blue-800 text-center">Devoir</TableHead>
              <TableHead className="text-blue-800 text-center">Examen</TableHead>
              <TableHead className="text-blue-800 text-center">Moyenne</TableHead>
              <TableHead className="text-blue-800 text-center">Coef</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((matiere, index) => (
              <TableRow 
                key={index}
                className="hover:bg-blue-50 transition-colors"
              >
                <TableCell className="font-medium">{matiere.matiere}</TableCell>
                <TableCell className="text-center">{matiere.note_devoir}</TableCell>
                <TableCell className="text-center">{matiere.note_examen}</TableCell>
                <TableCell className="text-center font-bold">
                  <span className={`px-2 py-1 rounded-full ${
                    matiere.moyenne_brute >= 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {matiere.moyenne_brute}
                  </span>
                </TableCell>
                <TableCell className="text-center">{matiere.coefficient}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubjectsTable;
