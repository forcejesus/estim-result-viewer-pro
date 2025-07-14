
import type { StudentResult } from "@/types/student";

export const fetchStudentResult = async (matricule: string): Promise<StudentResult> => {
  try {
    const response = await fetch(`https://gestion.estim-online.com/api/etudiants/resultat/v1/${matricule}`);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Retourner directement la donnée, les types gèrent les différents formats
    return data;
    
  } catch (error) {
    console.error("Erreur lors de la récupération des résultats:", error);
    throw new Error("Impossible de récupérer les résultats. Veuillez vérifier votre connexion et réessayer.");
  }
};
