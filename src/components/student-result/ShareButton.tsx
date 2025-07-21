
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ShareButtonProps {
  studentName: string;
  moyenne: string;
  classe: string;
}

const ShareButton = ({ studentName, moyenne, classe }: ShareButtonProps) => {
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

👤 Étudiant(e) : ${studentName}
🏫 Classe : ${classe}
📈 Moyenne générale : ${moyenne} / 20
📌 Statut : ${getStatusLabel(moyenne)}

📝 Prenez une inscription dans notre école 👉 ${inscriptionsLink}
      `;

      // Utiliser l'API Web Share si disponible
      if (navigator.share) {
        await navigator.share({
          title: `Résultats ESTIM - ${studentName}`,
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
      className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 group transition-all duration-300 shadow-lg hover:shadow-xl py-3 md:py-4 text-sm md:text-base"
    >
      <div className="flex items-center justify-center w-full gap-2">
        <div className="flex items-center">
          <img
            src="/lovable-uploads/7e124e66-a387-44e7-b34a-4ccb56933bdc.png"
            alt="ESTIM Logo"
            className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform"
          />
          <span className="font-medium text-sm md:text-base ml-1 md:ml-2">ESTIM</span>
        </div>
        <Share2 className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform" />
        <span className="text-sm md:text-base font-medium">
          {sharing ? "Partage en cours..." : "Partager ce résultat"}
        </span>
      </div>
    </Button>
  );
};

export default ShareButton;
