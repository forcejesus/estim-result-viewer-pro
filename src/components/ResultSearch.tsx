
import React, { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";

interface ResultSearchProps {
  onSearch: (matricule: string) => void;
  isLoading: boolean;
}

const ResultSearch = ({ onSearch, isLoading }: ResultSearchProps) => {
  const [matricule, setMatricule] = useState("");
  const [focused, setFocused] = useState(false);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus automatique sur l'input au chargement
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Si le matricule atteint 4 chiffres, masquer le clavier mobile
    if (matricule.length === 4) {
      inputRef.current?.blur();
    }
  }, [matricule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!matricule.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un matricule",
        variant: "destructive",
      });
      return;
    }
    
    if (matricule.trim().length !== 4 || !/^\d+$/.test(matricule)) {
      toast({
        title: "Erreur",
        description: "Le matricule doit contenir exactement 4 chiffres",
        variant: "destructive",
      });
      return;
    }
    
    onSearch(matricule.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Accepter uniquement les chiffres et limiter à 4 caractères
    if (/^\d*$/.test(value) && value.length <= 4) {
      setMatricule(value);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Titre avec animation */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-3 animate-fade-in">
          Rechercher un Résultat
        </h2>
        <p className="text-muted-foreground animate-fade-in">
          Entrez votre matricule à 4 chiffres pour consulter vos résultats
        </p>
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="space-y-6 transform transition-all duration-500 hover:scale-[1.02]"
      >
        <div className="relative group">
          {/* Background avec gradient et blur */}
          <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 via-primary-glow/20 to-primary/20 rounded-2xl blur-xl transition-all duration-500 ${focused || matricule ? 'opacity-100 scale-105' : 'opacity-50 scale-100'}`}></div>
          
          {/* Input container */}
          <div className="relative bg-card/90 backdrop-blur-sm rounded-2xl border border-border/50 p-6 shadow-card hover:shadow-elegant transition-all duration-500">
            <label htmlFor="matricule" className="block text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Matricule de l'apprenant
            </label>
            
            <div className="relative">
              <Input
                id="matricule"
                ref={inputRef}
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                placeholder="0000"
                value={matricule}
                onChange={handleChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className={`
                  h-16 text-3xl text-center font-bold tracking-widest
                  bg-background/80 border-2 border-border/30
                  focus:border-primary focus:ring-4 focus:ring-primary/20
                  transition-all duration-300 rounded-xl
                  ${matricule.length === 4 ? 'border-success ring-success/20' : ''}
                  placeholder:text-muted-foreground/40
                `}
                autoComplete="off"
              />
              
              {/* Indicateur de progression */}
              <div className="flex justify-center mt-3 gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`
                      h-2 w-8 rounded-full transition-all duration-300
                      ${i <= matricule.length 
                        ? 'bg-gradient-to-r from-primary to-primary-glow shadow-glow' 
                        : 'bg-muted'
                      }
                    `}
                  />
                ))}
              </div>
            </div>
            
            {/* Compteur de caractères */}
            <div className="text-center mt-2">
              <span className={`text-sm font-medium transition-colors duration-300 ${
                matricule.length === 4 ? 'text-success' : 'text-muted-foreground'
              }`}>
                {matricule.length}/4 chiffres
              </span>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          size="lg"
          className={`
            w-full h-14 text-lg font-semibold rounded-xl
            bg-gradient-to-r from-primary to-primary-glow 
            hover:shadow-glow hover:scale-[1.02]
            transition-all duration-300 transform
            disabled:opacity-50 disabled:scale-100 disabled:shadow-none
            ${isLoading ? 'animate-pulse' : ''}
          `}
          disabled={isLoading || matricule.length !== 4}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              Recherche en cours...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Consulter mes résultats
            </div>
          )}
        </Button>

        {/* Animation de particules en arrière-plan */}
        {focused && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-2 h-2 bg-primary/30 rounded-full animate-ping"></div>
            <div className="absolute top-20 right-16 w-1 h-1 bg-primary-glow/40 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-primary/20 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-20 right-10 w-1 h-1 bg-primary-glow/30 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ResultSearch;
