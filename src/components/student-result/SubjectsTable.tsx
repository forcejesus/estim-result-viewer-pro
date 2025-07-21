import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star, TrendingUp, Calendar } from "lucide-react";
import type { SubjectResult } from "@/types/student";

interface SubjectsTableProps {
  subjects: SubjectResult[];
}

const SubjectsTable = ({ subjects }: SubjectsTableProps) => {
  if (!subjects || subjects.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-primary" />
        <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Détail des Matières
        </h3>
      </div>
      
      <div className="grid gap-3 md:gap-4">
        {subjects.map((subject, index) => {
          const isPassing = subject.moyenne_annuelle_brute >= 10;
          
          return (
            <Card 
              key={index} 
              className={`
                relative overflow-hidden transition-all duration-300 hover:shadow-elegant
                ${isPassing 
                  ? 'border-l-4 border-l-success bg-gradient-to-r from-success/5 to-transparent' 
                  : 'border-l-4 border-l-destructive bg-gradient-to-r from-destructive/5 to-transparent'
                }
              `}
            >
              <CardHeader className="pb-2 md:pb-3 px-3 md:px-6 pt-3 md:pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <CardTitle className="text-base md:text-lg flex items-center gap-2 pr-2">
                    <span className="line-clamp-2">{subject.matiere}</span>
                    {isPassing && <Star className="h-4 w-4 text-success flex-shrink-0" />}
                  </CardTitle>
                  <Badge 
                    variant={isPassing ? "default" : "destructive"}
                    className={`
                      w-fit self-start sm:self-center text-xs
                      ${isPassing 
                        ? 'bg-success text-success-foreground' 
                        : 'bg-destructive text-destructive-foreground'
                      }
                    `}
                  >
                    Coef. {subject.coefficient}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3 md:space-y-4 px-3 md:px-6 pb-3 md:pb-6">
                {/* Détails par semestre */}
                <div className="space-y-2 md:space-y-3">
                  {subject.moyennes_par_semestre.map((semestre, semestreIndex) => (
                    <div key={semestreIndex} className="p-2 md:p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4 text-primary flex-shrink-0" />
                        <span className="font-semibold text-xs md:text-sm text-primary">{semestre.semestre}</span>
                      </div>
                      
                      {/* Version mobile: layout vertical */}
                      <div className="flex flex-col space-y-2 sm:hidden">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Devoir:</span>
                          <span className="font-semibold text-sm">{semestre.note_devoir}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Examen:</span>
                          <span className="font-semibold text-sm">{semestre.note_examen}</span>
                        </div>
                        <div className="flex justify-between items-center border-t pt-2">
                          <span className="text-xs text-muted-foreground">Moyenne:</span>
                          <span className={`font-bold text-sm ${
                            semestre.moyenne_brute >= 10 ? 'text-success' : 'text-destructive'
                          }`}>
                            {semestre.moyenne_brute.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Version desktop: layout en grille */}
                      <div className="hidden sm:grid grid-cols-3 gap-3 text-sm">
                        <div className="text-center">
                          <div className="text-muted-foreground text-xs">Devoir</div>
                          <div className="font-semibold">{semestre.note_devoir}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground text-xs">Examen</div>
                          <div className="font-semibold">{semestre.note_examen}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground text-xs">Moyenne</div>
                          <div className={`font-bold ${
                            semestre.moyenne_brute >= 10 ? 'text-success' : 'text-destructive'
                          }`}>
                            {semestre.moyenne_brute.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Moyennes annuelles */}
                <div className="pt-2 md:pt-3 border-t border-border/30">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-primary flex-shrink-0" />
                    <span className="text-xs md:text-sm font-medium">Moyennes annuelles:</span>
                  </div>
                  
                  {/* Version mobile: layout vertical */}
                  <div className="flex flex-col space-y-2 sm:hidden">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Brute:</span>
                      <span className={`font-bold text-sm ${
                        subject.moyenne_annuelle_brute >= 10 ? 'text-success' : 'text-destructive'
                      }`}>
                        {subject.moyenne_annuelle_brute.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Pondérée:</span>
                      <span className="font-bold text-sm text-primary">
                        {subject.moyenne_annuelle_ponderee.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Version desktop: layout horizontal */}
                  <div className="hidden sm:flex sm:justify-end sm:gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-muted-foreground text-xs">Brute</div>
                      <div className={`font-bold ${
                        subject.moyenne_annuelle_brute >= 10 ? 'text-success' : 'text-destructive'
                      }`}>
                        {subject.moyenne_annuelle_brute.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground text-xs">Pondérée</div>
                      <div className="font-bold text-primary">
                        {subject.moyenne_annuelle_ponderee.toFixed(2)}
                      </div>
                    </div>
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