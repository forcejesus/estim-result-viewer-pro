
import React, { useState } from "react";
import { StudentResult } from "@/types/student";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ShareButtonProps {
  student: StudentResult;
}

const ShareButton = ({ student }: ShareButtonProps) => {
  const [sharing, setSharing] = useState(false);
  const { toast } = useToast();

  const getStatusLabel = (moyenne: string) => {
    const moyenneNum = parseFloat(moyenne);
    
    if (moyenneNum >= 14) return "Excellent";
    if (moyenneNum >= 12) return "Bien";
    if (moyenneNum >= 10) return "Passable";
    return "Insuffisant";
  };

  const handleShare = async () => {
    setSharing(true);
    try {
      // Créer le lien direct vers les résultats
      const inscriptionsLink = "https://inscriptions.estim-online.com";
      
      // Créer un texte de partage avec les informations nécessaires et le nouveau format
      const shareText = `
📊 Résultats académiques - ESTIM 🎓
École Supérieure de Technologie, d'Ingénierie et de Management

👤 Étudiant(e) : ${student.nom_prenom}
🏫 Classe : ${student.classe}
📈 Moyenne générale : ${student.moyenne_generale} / 20
📌 Statut : ${getStatusLabel(student.moyenne_generale)}

📝 Prenez une inscription dans notre école 👉 ${inscriptionsLink}
      `;

      // Utiliser l'API Web Share si disponible
      if (navigator.share) {
        await navigator.share({
          title: `Résultats ESTIM - ${student.nom_prenom}`,
          text: shareText,
          url: inscriptionsLink
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

  return (
    <Button 
      onClick={handleShare}
      disabled={sharing}
      className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 group transition-all duration-300 shadow-lg hover:shadow-xl py-2 md:py-3 text-sm md:text-base"
    >
      <div className="flex items-center justify-center w-full">
        <div className="flex items-center mr-2">
          <img
            src="/lovable-uploads/3fd38e18-45e3-4c7a-936a-8e6c4427d649.png"
            alt="ESTIM Logo"
            className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2 group-hover:scale-110 transition-transform"
          />
          <span className="font-medium text-sm md:text-base">ESTIM</span>
        </div>
        <Share2 className="h-3 w-3 md:h-4 md:w-4 group-hover:scale-110 transition-transform" />
        <span className="ml-1 text-sm md:text-base">{sharing ? "Partage en cours..." : "Partager ce résultat"}</span>
      </div>
    </Button>
  );
};

export default ShareButton;
