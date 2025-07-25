
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
      <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 opacity-5">
        <GraduationCap className="w-full h-full text-primary" />
      </div>
      
      <CardContent className="p-4 md:p-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
          {/* Photo de profil */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary-glow/30 rounded-full blur-lg animate-pulse"></div>
            <Avatar className="h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 relative border-4 border-background shadow-elegant">
              <AvatarImage 
                src={photo} 
                alt={name}
                className="object-cover transition-all duration-500 hover:scale-105" 
              />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary-glow/20 text-primary font-bold text-lg md:text-2xl">
                {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          
          {/* Informations étudiant */}
          <div className="flex-1 text-center sm:text-left space-y-2 md:space-y-3 min-w-0">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent leading-tight">
              {name}
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-muted-foreground text-sm md:text-base">
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{classe}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{anneeAcademique}</span>
              </span>
            </div>
            
            <div className="flex justify-center sm:justify-start">
              <Badge variant="outline" className="bg-background/50 border-primary/30 text-primary font-mono text-xs md:text-sm">
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
