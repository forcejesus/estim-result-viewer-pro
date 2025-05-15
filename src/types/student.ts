
export interface SubjectResult {
  matiere: string;
  note_devoir: number;
  note_examen: number;
  moyenne_brute: number;
  coefficient: number;
  moyenne_ponderee: number;
}

export interface StudentDetailedResult {
  etudiant: string;
  classe: string;
  matieres: SubjectResult[];
  moyenne_generale: number;
}

export interface StudentResult {
  nom_prenom: string;
  matricule: string;
  classe: string;
  moyenne_generale: string;
  photo: string;
  details?: string; // Pour les messages d'erreur
  matieres?: SubjectResult[]; // Ajout des matières
}
