
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useToast } from '@/components/ui/use-toast';

interface SuccessConfettiProps {
  moyenne: string;
  studentName: string;
}

const SuccessConfetti = ({ moyenne, studentName }: SuccessConfettiProps) => {
  const [active, setActive] = useState(true);
  const [density, setDensity] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [animationStarted, setAnimationStarted] = useState(false);
  const { toast } = useToast();
  
  const moyenneNum = parseFloat(moyenne);
  
  // Update window dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Set confetti density based on the student's average with animation delay
  useEffect(() => {
    if (moyenneNum >= 10) {
      // Petite pause avant de démarrer l'animation pour créer un effet de surprise
      const startTimer = setTimeout(() => {
        setAnimationStarted(true);
        
        // More confetti for higher averages
        if (moyenneNum >= 14) {
          setDensity(250);
        } else if (moyenneNum >= 12) {
          setDensity(175);
        } else {
          setDensity(120);
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
          className: "bg-green-100 border-green-500 text-green-800 animate-fadeInScale",
        });
        
        // Play applause sound
        const audio = new Audio('/applause-sound.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Sound playback prevented by browser'));
      }, 800);
      
      // Set timeout to remove confetti after animation duration
      const confettiDuration = moyenneNum >= 14 ? 7000 : moyenneNum >= 12 ? 6000 : 5000;
      
      const timer = setTimeout(() => {
        setActive(false);
      }, confettiDuration);
      
      return () => {
        clearTimeout(startTimer);
        clearTimeout(timer);
      };
    }
  }, [moyenne, studentName, toast]);
  
  if (moyenneNum < 10 || !active || !animationStarted) return null;
  
  return (
    <Confetti
      width={windowDimensions.width}
      height={windowDimensions.height}
      numberOfPieces={density}
      recycle={false}
      gravity={0.15}
      tweenDuration={5000}
      initialVelocityY={10}
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
