import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, Calendar, AlertCircle } from 'lucide-react';
import type { StudentResultNoExam } from '@/types/student';

interface NoExamMessageProps {
  student: StudentResultNoExam;
}

export const NoExamMessage = ({ student }: NoExamMessageProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* En-tête étudiant */}
      <Card className="bg-gradient-to-r from-accent/20 to-primary/10 border-border/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={student.photo} alt={student.etudiant} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                {student.etudiant.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{student.etudiant}</h2>
              <div className="flex items-center gap-4 text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {student.classe}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {student.annee_academique}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-sm text-muted-foreground">Matricule: </span>
                <span className="font-mono font-semibold text-primary">{student.matricule}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Message principal */}
      <Alert className="border-2 border-info/30 bg-info/5">
        <AlertCircle className="h-5 w-5 text-info" />
        <AlertTitle className="text-lg font-semibold text-info">
          Aucun examen composé
        </AlertTitle>
        <AlertDescription className="text-info/80 mt-2">
          Vous n'avez pas encore composé d'examen pour cette année académique {student.annee_academique}.
          <div className="mt-4 p-4 bg-background/50 rounded-lg border border-border/30">
            <h4 className="font-semibold mb-2">Que faire ?</h4>
            <ul className="space-y-1 text-sm">
              <li>• Vérifiez le calendrier des examens auprès de votre coordination</li>
              <li>• Assurez-vous d'être inscrit pour la session d'examens</li>
              <li>• Contactez le service de scolarité si vous pensez qu'il y a une erreur</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>

      {/* Informations complémentaires */}
      <Card className="border-border/30">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Informations académiques
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-muted-foreground">Nombre de matières</div>
              <div className="font-semibold text-lg">{student.nombre_matieres}</div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-muted-foreground">Total coefficient</div>
              <div className="font-semibold text-lg">{student.total_coefficient}</div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-muted-foreground">Statut</div>
              <div className="font-semibold text-lg text-info">En attente</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};