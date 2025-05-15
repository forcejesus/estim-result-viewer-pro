import React, { useState } from "react";
import type { StudentResult as StudentResultType } from "@/types/student";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader, Share } from "lucide-react";
import SuccessConfetti from "./SuccessConfetti";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface StudentResultProps {
  student: StudentResultType;
}

const StudentResult = ({ student }: StudentResultProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [sharing, setSharing] = useState(false);
  const { toast } = useToast();

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

  const getStatusLabel = (moyenne: string) => {
    const moyenneNum = parseFloat(moyenne);
    
    if (moyenneNum >= 14) return "Excellent";
    if (moyenneNum >= 12) return "Bien";
    if (moyenneNum >= 10) return "Passable";
    return "Insuffisant";
  };

  // Fonction pour partager les résultats
  const handleShare = async () => {
    setSharing(true);
    try {
      // Créer le lien direct vers les résultats
      const resultatsLink = `https://resultats.estim-online.com?matricule=${student.matricule}`;
      
      // Créer un texte de partage avec les informations nécessaires
      const shareText = `
📊 Résultats académiques - ESTIM 🎓

Étudiant: ${student.nom_prenom}
Classe: ${student.classe}
Moyenne générale: ${student.moyenne_generale}/20
Statut: ${getStatusLabel(student.moyenne_generale)}

Consultez vos résultats: ${resultatsLink}

École Supérieure de Technologie d'Informatique et de Management (ESTIM)
      `;

      // Utiliser l'API Web Share si disponible
      if (navigator.share) {
        await navigator.share({
          title: `Résultats ESTIM - ${student.nom_prenom}`,
          text: shareText,
          url: resultatsLink
        });
        toast({
          title: "Partage réussi",
          description: "Le contenu a été partagé avec succès.",
          className: "bg-green-50 border-green-200 text-green-800",
        });
      } else {
        // Fallback si l'API Web Share n'est pas disponible
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Contenu copié",
          description: "Les résultats ont été copiés dans le presse-papier.",
          className: "bg-blue-50 border-blue-200 text-blue-800",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur de partage",
        description: "Une erreur s'est produite lors du partage.",
        variant: "destructive",
      });
    } finally {
      setSharing(false);
    }
  };

  // Déclencher l'animation de la barre de progression après le chargement initial
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <SuccessConfetti moyenne={student.moyenne_generale} studentName={student.nom_prenom} />
      <Card className="overflow-hidden border-2 border-blue-100 shadow-lg animate-fadeInScale transition-all duration-500 hover:shadow-xl">
        <CardHeader className="bg-blue-50 p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full staggered-animation">
              <div className="relative mx-auto md:mx-0 animate-fadeIn hover-lift">
                <div className="h-32 w-32 rounded-full overflow-hidden ring-4 ring-blue-200 transition-all duration-500 hover:ring-blue-400 shadow-lg">
                  <AspectRatio ratio={1/1} className="bg-blue-50 flex items-center justify-center">
                    {imageLoading && !imageError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-blue-50 z-10">
                        <Loader className="h-8 w-8 animate-spin text-blue-500" />
                      </div>
                    )}
                    {!imageError ? (
                      <img 
                        src={student.photo} 
                        alt={student.nom_prenom}
                        className={`object-cover w-full h-full transition-all duration-700 ${imageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                        onLoad={() => setImageLoading(false)}
                        onError={(e) => {
                          setImageLoading(false);
                          setImageError(true);
                        }}
                      />
                    ) : (
                      <img 
                        src="/lovable-uploads/3fd38e18-45e3-4c7a-936a-8e6c4427d649.png" 
                        alt="ESTIM Logo"
                        className="object-contain w-3/4 h-3/4 opacity-70 animate-pulse" 
                      />
                    )}
                  </AspectRatio>
                </div>
              </div>
              <div className="text-center md:text-left animate-fadeIn slide-in-right">
                <h2 className="text-xl font-bold text-blue-800 mb-2">{student.nom_prenom}</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-1">
                  <Badge variant="outline" className="bg-blue-50 border-blue-200 hover-lift">
                    Matricule: {student.matricule}
                  </Badge>
                  <Badge className="bg-blue-500 animate-pulse hover-lift">{student.classe}</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 bg-gradient-to-b from-white to-blue-50">
          <div className="flex flex-col items-center justify-center staggered-animation">
            <div className="text-center mb-6 transform transition-all duration-500 hover:scale-105 animate-fadeIn">
              <p className="text-gray-500 mb-1">Moyenne Générale</p>
              <div className={`text-3xl font-bold inline-flex items-center justify-center h-20 w-20 rounded-full text-white ${getColorByMoyenne(student.moyenne_generale)} shadow-lg transition-all duration-500 ease-in-out animate-fadeInScale`}>
                {student.moyenne_generale}/20
              </div>
              <p className="mt-2 font-medium text-gray-700 animate-fadeIn slide-in-right">
                {getStatusLabel(student.moyenne_generale)}
              </p>
            </div>
            
            <div className="w-full bg-gray-100 h-4 rounded-full mt-4 overflow-hidden shadow-inner animate-fadeIn">
              <div 
                className={`h-4 rounded-full ${getColorByMoyenne(student.moyenne_generale)} transition-all duration-1500 ease-out`}
                style={{ 
                  width: animationComplete ? `${(parseFloat(student.moyenne_generale) / 20) * 100}%` : '0%',
                  animation: "grow 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)" 
                }}
              ></div>
            </div>
            
            <div className="flex justify-between w-full mt-1 text-xs text-gray-500 animate-fadeIn">
              <span>0</span>
              <span>10</span>
              <span>20</span>
            </div>

            {/* Bouton de partage avec logo ESTIM */}
            <div className="mt-6 w-full">
              <Button 
                onClick={handleShare}
                disabled={sharing}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 group transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-center w-full">
                  <div className="flex items-center mr-2">
                    <img
                      src="/lovable-uploads/3fd38e18-45e3-4c7a-936a-8e6c4427d649.png"
                      alt="ESTIM Logo"
                      className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform"
                    />
                    <span className="font-medium">ESTIM</span>
                  </div>
                  <Share className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="ml-1">{sharing ? "Partage en cours..." : "Partager les résultats"}</span>
                </div>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentResult;
