
import type { StudentResult, StudentDetailedResult } from "@/types/student";

export async function fetchStudentResult(matricule: string): Promise<StudentResult> {
  // Utiliser le nouvel endpoint v1
  const response = await fetch(`https://gestion.estim-online.com/api/etudiants/resultat/v1/${matricule}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Aucun étudiant trouvé avec ce matricule");
    }
    throw new Error("Une erreur est survenue lors de la récupération des résultats");
  }
  
  const data = await response.json();
  
  // Si la réponse est null, l'étudiant n'est pas autorisé
  if (!data) {
    return {
      nom_prenom: "",
      matricule: matricule,
      classe: "",
      moyenne_generale: "",
      photo: "",
      details: "Vous n'êtes pas autorisé à consulter ces résultats. Veuillez contacter la scolarité."
    };
  }
  
  // Mapping des données du nouvel API vers notre format
  const result: StudentResult = {
    nom_prenom: data.etudiant,
    matricule: matricule,
    classe: data.classe,
    moyenne_generale: data.moyenne_generale ? data.moyenne_generale.toString() : "0",
    photo: "", // L'API ne retourne plus de photo
    matieres: data.matieres
  };
  
  return result;
}
