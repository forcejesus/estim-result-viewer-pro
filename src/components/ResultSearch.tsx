
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
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <div className="flex flex-col space-y-2">
        <label htmlFor="matricule" className="text-sm font-medium text-gray-700">
          Matricule de l'apprenant
        </label>
        <div className="relative">
          <Input
            id="matricule"
            type="text"
            placeholder="Entrez votre matricule"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            className="pl-10 bg-white"
            autoComplete="off"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Recherche en cours..." : "Rechercher"}
      </Button>
    </form>
  );
};

export default ResultSearch;
