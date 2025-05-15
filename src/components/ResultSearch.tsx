
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface ResultSearchProps {
  onSearch: (matricule: string) => void;
  isLoading: boolean;
}

const ResultSearch = ({ onSearch, isLoading }: ResultSearchProps) => {
  const [matricule, setMatricule] = useState("");
  const { toast } = useToast();

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
    
    onSearch(matricule.trim());
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4 w-full max-w-md mx-auto transform transition-all duration-300 hover:scale-[1.01]"
    >
      <div className="flex flex-col space-y-2">
        <label htmlFor="matricule" className="text-sm font-medium text-blue-700">
          Matricule de l'apprenant
        </label>
        <div className="relative">
          <Input
            id="matricule"
            type="text"
            placeholder="Entrez votre matricule"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            className="pl-10 bg-white border-blue-200 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
            autoComplete="off"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1"
        disabled={isLoading}
      >
        {isLoading ? "Recherche en cours..." : "Rechercher"}
      </Button>
    </form>
  );
};

export default ResultSearch;
