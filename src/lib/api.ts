
import type { StudentResult } from "@/types/student";

export async function fetchStudentResult(matricule: string): Promise<StudentResult> {
  const response = await fetch(`https://gestion.estim-online.com/api/etudiants/resultat/v2/${matricule}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Aucun étudiant trouvé avec ce matricule");
    }
    throw new Error("Une erreur est survenue lors de la récupération des résultats");
  }
  
  const data = await response.json();
  
  // Si la réponse contient juste le champ "detail", c'est une erreur d'autorisation
  if (data.detail && !data.matricule) {
    // Nous transférons le message d'erreur dans la propriété "details" du résultat
    return {
      nom_prenom: "",
      matricule: matricule,
      classe: "",
      moyenne_generale: "",
      photo: "",
      details: data.detail
    };
  }
  
  return data;
}
