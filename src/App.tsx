import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Users, Save, Download, Moon, Sun } from 'lucide-react';
import { PlayerCard } from './components/PlayerCard';
import { RugbyField } from './components/RugbyField';
import { PlayerModal } from './components/PlayerModal';

interface Player {
  id: number;
  name: string;
  position: string;
  number?: number;
  x?: number;
  y?: number;
}

const WelcomeScreen = ({ onEnter }: { onEnter: () => void }) => {
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
        >
          Créer une équipe
        </button>
      </div>
    </div>
  );
};

const RugbyApp = () => {
  const [selectedTeam, setSelectedTeam] = useState<'team1' | 'team2'>('team1');
  const [team1Players, setTeam1Players] = useState<Player[]>([]);
  const [team2Players, setTeam2Players] = useState<Player[]>([]);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleAddPlayer = (player: Omit<Player, 'id'>) => {
    const newPlayer = {
      ...player,
      id: Date.now(),
    };

    if (selectedTeam === 'team1') {
      setTeam1Players([...team1Players, newPlayer]);
    } else {
      setTeam2Players([...team2Players, newPlayer]);
    }
    setShowPlayerModal(false);
  };

  const handlePlayerDrop = (player: Player, position: { x: number; y: number }) => {
    const updatePlayer = (players: Player[]) =>
      players.map((p) =>
        p.id === player.id 
          ? { ...p, x: position.x, y: position.y }
          : p
      );

    if (selectedTeam === 'team1') {
      setTeam1Players((prevPlayers) => updatePlayer(prevPlayers));
    } else {
      setTeam2Players((prevPlayers) => updatePlayer(prevPlayers));
    }
  };

  const handlePlayerRemove = (playerId: number) => {
    if (selectedTeam === 'team1') {
      setTeam1Players(prevPlayers => {
        const playerToRemove = prevPlayers.find(p => p.id === playerId);
        if (!playerToRemove) return prevPlayers;
        
        return prevPlayers.map(p => 
          p.id === playerId 
            ? { ...p, x: undefined, y: undefined }
            : p
        );
      });
    } else {
      setTeam2Players(prevPlayers => {
        const playerToRemove = prevPlayers.find(p => p.id === playerId);
        if (!playerToRemove) return prevPlayers;
        
        return prevPlayers.map(p => 
          p.id === playerId 
            ? { ...p, x: undefined, y: undefined }
            : p
        );
      });
    }
  };

  const currentTeamPlayers = selectedTeam === 'team1' ? team1Players : team2Players;
  const fieldPlayers = currentTeamPlayers.filter((p) => p.x !== undefined && p.y !== undefined);
  const benchPlayers = currentTeamPlayers.filter((p) => p.x === undefined || p.y === undefined);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-900 text-white' 
          : 'bg-gradient-to-br from-green-800 to-green-900'
      }`}>
        {/* Top Navigation */}
        <nav className={`${
          darkMode ? 'bg-gray-800/80' : 'bg-white/10'
        } backdrop-blur-md shadow-lg`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <span className="text-white text-xl font-semibold">
                  Composition d'Équipe Rugby
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  {darkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-white" />}
                </button>
                <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
                  <Save size={20} />
                  Sauvegarder
                </button>
                <button className={`${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white/20 hover:bg-white/30'
                } text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all`}>
                  <Download size={20} />
                  Charger
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Team Selection */}
          <div className="flex justify-center mb-8">
            <div className={`${
              darkMode ? 'bg-gray-800' : 'bg-white/10'
            } rounded-xl p-1 backdrop-blur-md`}>
              <button
                className={`px-6 py-2 rounded-lg ${
                  selectedTeam === 'team1'
                    ? 'bg-yellow-500 text-black'
                    : 'text-white hover:bg-white/10'
                } transition-all`}
                onClick={() => setSelectedTeam('team1')}
              >
                Équipe 1
              </button>
              <button
                className={`px-6 py-2 rounded-lg ${
                  selectedTeam === 'team2'
                    ? 'bg-yellow-500 text-black'
                    : 'text-white hover:bg-white/10'
                } transition-all`}
                onClick={() => setSelectedTeam('team2')}
              >
                Équipe 2
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Player List */}
            <div className={`lg:col-span-3 ${
              darkMode ? 'bg-gray-800' : 'bg-white/10'
            } rounded-xl p-6 backdrop-blur-md`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Joueurs</h2>
                <button
                  onClick={() => setShowPlayerModal(true)}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black p-2 rounded-lg transition-all"
                >
                  <Users size={20} />
                </button>
              </div>
              <div className="space-y-2">
                {benchPlayers.map((player) => (
                  <PlayerCard key={player.id} {...player} />
                ))}
                {benchPlayers.length === 0 && (
                  <p className="text-white/60 text-center py-4">
                    Aucun joueur sur le banc
                  </p>
                )}
              </div>
            </div>

            {/* Rugby Field */}
            <div className="lg:col-span-9 aspect-[1.5] bg-green-700 rounded-xl overflow-hidden">
              <RugbyField
                players={fieldPlayers}
                onPlayerDrop={handlePlayerDrop}
                onPlayerRemove={handlePlayerRemove}
              />
            </div>
          </div>
        </div>

        {/* Player Modal */}
        <PlayerModal
          isOpen={showPlayerModal}
          onClose={() => setShowPlayerModal(false)}
          onAddPlayer={handleAddPlayer}
          darkMode={darkMode}
        />
      </div>
    </DndProvider>
  );
};

function App() {
  const [showApp, setShowApp] = useState(false);

  if (!showApp) {
    return <WelcomeScreen onEnter={() => setShowApp(true)} />;
  }

  return <RugbyApp />;
}

export default App;
