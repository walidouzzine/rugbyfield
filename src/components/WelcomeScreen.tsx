import React from 'react';

interface WelcomeScreenProps {
  onEnter: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/video/rugby-tackles.mp4" type="video/mp4" />
        Votre navigateur ne prend pas en charge la vidéo.
      </video>

      <div className="relative z-10 h-full w-full bg-black/40 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-white mb-8 tracking-wider">
          COMPOSITION RUGBY
        </h1>
        
        <button
          onClick={onEnter}
          className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-full 
                   hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300
                   shadow-lg hover:shadow-xl text-xl uppercase tracking-wider"
          aria-label="Créer une équipe"
        >
          Créer une équipe
        </button>
      </div>
    </div>
  );
};
