
import React, { useState, useEffect } from "react";
import ResultSearch from "@/components/ResultSearch";
import StudentResult from "@/components/student-result";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";
import { fetchStudentResult } from "@/lib/api";
import type { StudentResult as StudentResultType } from "@/types/student";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Ban, AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import SuccessConfetti from "@/components/SuccessConfetti";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [studentResult, setStudentResult] = useState<StudentResultType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const { toast } = useToast();

  // Animation d'entrée pour le chargement initial de la page
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 300);
    
    // Enregistrer le service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }
    
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = async (matricule: string) => {
    setIsLoading(true);
    setError(null);
    setStudentResult(null);
    
    try {
      const result = await fetchStudentResult(matricule);
      setStudentResult(result);
      
      // Pas besoin de notification toast puisqu'on affiche l'alerte directement
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

  const handleReset = () => {
    setStudentResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 relative overflow-hidden">
      {/* Background pattern avec animation */}
      <div className="absolute inset-0 z-0 opacity-5 pattern-grid-lg text-primary animate-float"></div>
      
      <div 
        className={`container mx-auto px-0 sm:px-4 py-12 relative z-10 transition-opacity duration-1000 ease-out ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* N'afficher l'en-tête que lorsqu'aucun résultat n'est affiché */}
        {!studentResult && (
          <header className="text-center mb-12 flex flex-col items-center staggered-animation px-4">
            <img 
              src="/lovable-uploads/3fd38e18-45e3-4c7a-936a-8e6c4427d649.png" 
              alt="ESTIM Logo" 
              className="h-24 md:h-32 mb-4 animate-fadeInScale animate-bounce-slow" 
            />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2 animate-fadeIn slide-in-right">
              Consultation des Résultats
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-fadeIn">
              Entrez votre matricule pour consulter vos résultats académiques.
            </p>
          </header>
        )}

        <div className={`max-w-3xl mx-auto bg-card/80 backdrop-blur-sm rounded-2xl shadow-card border border-border/50 p-4 md:p-8 animate-fadeInScale hover:shadow-elegant transition-all duration-500 ${studentResult ? "mt-6" : ""}`}>
          {!studentResult ? (
            <>
              <ResultSearch onSearch={handleSearch} isLoading={isLoading} />
              
              {isLoading && <LoadingSpinner />}
              
              {error && (
                <div className="mt-8 text-center animate-fadeIn">
                  <p className="text-red-600 animate-pulse">{error}</p>
                </div>
              )}
            </>
          ) : (
            <div className="animate-fadeIn">
              <Button 
                onClick={handleReset} 
                variant="outline" 
                className="mb-6 hover:bg-primary/5 hover:border-primary/30 group transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Rechercher un autre matricule
              </Button>
              
              {('detail' in studentResult) ? (
                <Alert variant="destructive" className="animate-fadeIn border-2 border-red-200 bg-red-50">
                  <Ban className="h-5 w-5 text-red-500 mr-2" />
                  <AlertTitle className="text-lg font-bold mb-2">Accès refusé</AlertTitle>
                  <AlertDescription className="text-red-800">
                    {studentResult.detail}
                    <div className="mt-4 bg-amber-50 border border-amber-200 p-4 rounded-lg">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
                        <div>
                          <p className="font-semibold text-amber-800">Information importante :</p>
                          <p className="text-amber-700 mt-1">
                            Veuillez vous présenter au service de scolarité pour régulariser votre situation. 
                            Cette restriction est généralement liée à un solde impayé des frais de scolarité.
                          </p>
                        </div>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <StudentResult student={studentResult} />
                  <SuccessConfetti 
                    moyenne={
                      'moyenne_generale_annuelle' in studentResult && studentResult.moyenne_generale_annuelle !== null
                        ? studentResult.moyenne_generale_annuelle.toString()
                        : "0"
                    } 
                    studentName={
                      'etudiant' in studentResult 
                        ? studentResult.etudiant 
                        : ""
                    } 
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      <footer className="mt-12 py-4 text-center text-muted-foreground text-sm relative z-10 animate-fadeIn">
        <p>© {new Date().getFullYear()} ESTIM. Tous droits réservés.</p>
      </footer>
      
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;
