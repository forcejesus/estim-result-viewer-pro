
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-confetti/dist/hooks/useWindowSize';
import { useToast } from '@/components/ui/use-toast';

interface SuccessConfettiProps {
  moyenne: string;
  studentName: string;
}

const SuccessConfetti = ({ moyenne, studentName }: SuccessConfettiProps) => {
  const [active, setActive] = useState(true);
  const [density, setDensity] = useState(0);
  const { width, height } = useWindowSize();
  const { toast } = useToast();
  
  const moyenneNum = parseFloat(moyenne);
  
  // Set confetti density based on the student's average
  useEffect(() => {
    if (moyenneNum >= 10) {
      // More confetti for higher averages
      if (moyenneNum >= 14) {
        setDensity(200);
      } else if (moyenneNum >= 12) {
        setDensity(150);
      } else {
        setDensity(100);
      }
      
      // Show congratulatory toast
      const message = moyenneNum >= 14 
        ? `Félicitations ${studentName} ! Résultat excellent !` 
        : moyenneNum >= 12 
          ? `Bravo ${studentName} ! Très bon résultat !` 
          : `Bravo ${studentName} ! Vous avez réussi !`;
          
      toast({
        title: "Félicitations !",
        description: message,
        variant: "default",
        className: "bg-green-100 border-green-500 text-green-800",
      });
      
      // Play congratulation sound
      const audio = new Audio('/success-sound.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Sound playback prevented by browser'));
      
      // Set timeout to remove confetti after 5 seconds
      const timer = setTimeout(() => {
        setActive(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [moyenne, studentName, toast]);
  
  if (moyenneNum < 10 || !active) return null;
  
  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={density}
      recycle={false}
      colors={[
        '#FDE1D3', // soft peach
        '#F97316', // bright orange
        '#D946EF', // magenta pink
        '#8B5CF6', // vivid purple
        '#0EA5E9', // ocean blue
        '#F2FCE2', // soft green
        '#FEF7CD', // soft yellow
        '#E5DEFF', // soft purple
      ]}
    />
  );
};

export default SuccessConfetti;
