
export interface SubjectResult {
  matiere: string;
  coefficient: number;
  moyennes_par_semestre: {
    semestre: string;
    moyenne_brute: number;
    note_devoir: string;
    note_examen: string;
  }[];
  nombre_semestres: number;
  moyenne_annuelle_brute: number;
  moyenne_annuelle_ponderee: number;
}

export interface StudentDetailedResult {
  etudiant: string;
  classe: string;
  matieres: SubjectResult[];
  moyenne_generale: number;
}

// Réponse quand tout est OK
export interface StudentResultSuccess {
  etudiant: string;
  matricule: string;
  classe: string;
  annee_academique: string;
  matieres: SubjectResult[];
  moyenne_generale_annuelle: number;
  nombre_matieres: number;
  total_coefficient: number;
  photo: string;
}

// Réponse quand étudiant n'a pas composé
export interface StudentResultNoExam {
  etudiant: string;
  matricule: string;
  classe: string;
  annee_academique: string;
  matieres: [];
  moyenne_generale_annuelle: null;
  nombre_matieres: 0;
  total_coefficient: 0;
  photo: string;
}

// Réponse quand étudiant a une dette
export interface StudentResultDebt {
  detail: string;
}

// Union type pour toutes les réponses possibles
export type StudentResult = StudentResultSuccess | StudentResultNoExam | StudentResultDebt;
