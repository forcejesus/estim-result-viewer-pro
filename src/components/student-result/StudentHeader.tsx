
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Calendar, GraduationCap } from "lucide-react";

interface StudentHeaderProps {
  name: string;
  matricule: string;
  classe: string;
  anneeAcademique: string;
  photo: string;
}

const StudentHeader = ({ name, matricule, classe, anneeAcademique, photo }: StudentHeaderProps) => {
  return (
    <Card className="bg-gradient-to-br from-primary/10 via-primary-glow/5 to-accent/10 border-border/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <GraduationCap className="w-full h-full text-primary" />
      </div>
      
      <CardContent className="p-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Photo de profil */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary-glow/30 rounded-full blur-lg animate-pulse"></div>
            <Avatar className="h-24 w-24 md:h-32 md:w-32 relative border-4 border-background shadow-elegant">
              <AvatarImage 
                src={photo} 
                alt={name}
                className="object-cover transition-all duration-500 hover:scale-105" 
              />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary-glow/20 text-primary font-bold text-2xl">
                {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          
          {/* Informations étudiant */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              {name}
            </h2>
            
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {classe}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {anneeAcademique}
              </span>
            </div>
            
            <div className="flex justify-center md:justify-start">
              <Badge variant="outline" className="bg-background/50 border-primary/30 text-primary font-mono">
                Matricule: {matricule}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentHeader;
