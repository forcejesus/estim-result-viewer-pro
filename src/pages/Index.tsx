import React, { useState } from "react";
import ResultSearch from "@/components/ResultSearch";
import StudentResult from "@/components/StudentResult";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";
import { fetchStudentResult } from "@/lib/api";
import type { StudentResult as StudentResultType } from "@/types/student";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [studentResult, setStudentResult] = useState<StudentResultType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = async (matricule: string) => {
    setIsLoading(true);
    setError(null);
    setStudentResult(null);
    
    try {
      const result = await fetchStudentResult(matricule);
      setStudentResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
      setError(errorMessage);
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">
            Vérification des Résultats
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Entrez votre matricule pour consulter vos résultats académiques.
          </p>
        </header>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
          <ResultSearch onSearch={handleSearch} isLoading={isLoading} />
          
          {isLoading && <LoadingSpinner />}
          
          {error && (
            <div className="mt-8 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          )}
          
          {studentResult && (
            <div className="mt-8 animate-fadeIn">
              <StudentResult student={studentResult} />
            </div>
          )}
        </div>
      </div>
      
      <footer className="mt-12 py-4 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} ESTIM. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Index;
