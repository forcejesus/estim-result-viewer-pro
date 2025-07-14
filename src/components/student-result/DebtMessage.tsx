import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Building2, Phone, Mail, AlertTriangle } from 'lucide-react';
import type { StudentResultDebt } from '@/types/student';

interface DebtMessageProps {
  student: StudentResultDebt;
}

export const DebtMessage = ({ student }: DebtMessageProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Message principal */}
      <Alert variant="destructive" className="border-2 border-destructive/30 bg-destructive/5">
        <AlertTriangle className="h-6 w-6" />
        <AlertTitle className="text-xl font-bold mb-3">
          Accès aux services restreint
        </AlertTitle>
        <AlertDescription className="text-destructive/90 text-base leading-relaxed">
          {student.detail}
        </AlertDescription>
      </Alert>

      {/* Informations de contact */}
      <Card className="border-destructive/20 bg-gradient-to-br from-destructive/5 to-warning/5">
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-destructive" />
            Comment régulariser votre situation
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-background/60 rounded-lg border border-border/50">
              <h4 className="font-semibold mb-2 text-foreground">Étape 1: Rendez-vous à la scolarité</h4>
              <p className="text-muted-foreground text-sm">
                Présentez-vous au service de scolarité avec votre carte d'étudiant pour connaître le montant exact de votre solde.
              </p>
            </div>
            
            <div className="p-4 bg-background/60 rounded-lg border border-border/50">
              <h4 className="font-semibold mb-2 text-foreground">Étape 2: Effectuez le paiement</h4>
              <p className="text-muted-foreground text-sm">
                Procédez au règlement de votre solde selon les modalités indiquées par la scolarité.
              </p>
            </div>
            
            <div className="p-4 bg-background/60 rounded-lg border border-border/50">
              <h4 className="font-semibold mb-2 text-foreground">Étape 3: Vérification</h4>
              <p className="text-muted-foreground text-sm">
                Une fois le paiement effectué, vos résultats seront accessibles sous 24h.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts utiles */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Contacts utiles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Building2 className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Service Scolarité</div>
                <div className="text-sm text-muted-foreground">Bureau principal - Campus</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Email</div>
                <div className="text-sm text-muted-foreground">scolarite@estim.edu</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border/30">
            <p className="text-sm text-muted-foreground text-center">
              Heures d'ouverture : Lundi - Vendredi, 8h00 - 17h00
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bouton d'action */}
      <div className="text-center">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow"
          onClick={() => window.location.reload()}
        >
          <CreditCard className="mr-2 h-5 w-5" />
          Reessayer après paiement
        </Button>
      </div>
    </div>
  );
};