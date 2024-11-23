import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Users, Save, Download } from 'lucide-react';
import { PlayerCard } from './components/PlayerCard';
import { RugbyField } from './components/RugbyField';
import { PlayerModal } from './components/PlayerModal';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Player, Team, DropPosition } from './types';
import { POSITIONS } from './constants';
import { saveTeamsToLocalStorage, loadTeamsFromLocalStorage } from './utils';

const RugbyApp: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team>('team1');
  const [teams, setTeams] = useState<Record<Team, Player[]>>({
    team1: [],
    team2: []
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load teams from localStorage on mount
  useEffect(() => {
    const savedTeams = loadTeamsFromLocalStorage();
    if (savedTeams) {
      setTeams(savedTeams as Record<Team, Player[]>);
    }
  }, []);

  // Save teams to localStorage when they change
  useEffect(() => {
    saveTeamsToLocalStorage(teams);
  }, [teams]);

  const handlePlayerDrop = useCallback((player: Player, position: DropPosition) => {
    setTeams(prev => ({
      ...prev,
      [selectedTeam]: prev[selectedTeam].map(p =>
        p.id === player.id ? { ...p, ...position } : p
      )
    }));
  }, [selectedTeam]);

  const handlePlayerAdd = useCallback((player: Omit<Player, 'id'>) => {
    setTeams(prev => ({
      ...prev,
      [selectedTeam]: [
        ...prev[selectedTeam],
        {
          ...player,
          id: Date.now(),
        }
      ]
    }));
    setIsModalOpen(false);
  }, [selectedTeam]);

  const handlePlayerRemove = useCallback((playerId: number) => {
    setTeams(prev => ({
      ...prev,
      [selectedTeam]: prev[selectedTeam].map(p => 
        p.id === playerId ? { ...p, x: undefined, y: undefined } : p
      )
    }));
  }, [selectedTeam]);

  const handleExport = useCallback(() => {
    const dataStr = JSON.stringify(teams);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'rugby-teams.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [teams]);

  const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTeams = JSON.parse(e.target?.result as string);
        setTeams(importedTeams);
      } catch (error) {
        console.error('Error importing teams:', error);
        alert('Erreur lors de l\'importation des équipes');
      }
    };
    reader.readAsText(file);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedTeam('team1')}
              className={`px-4 py-2 rounded-lg ${
                selectedTeam === 'team1'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-700 text-white'
              }`}
            >
              Équipe 1
            </button>
            <button
              onClick={() => setSelectedTeam('team2')}
              className={`px-4 py-2 rounded-lg ${
                selectedTeam === 'team2'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-700 text-white'
              }`}
            >
              Équipe 2
            </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleExport}
              className="p-2 rounded-lg bg-gray-700 text-white"
              aria-label="Exporter les équipes"
            >
              <Save size={20} />
            </button>
            <label className="p-2 rounded-lg bg-gray-700 text-white cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              <Download size={20} />
            </label>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg"
            >
              <Users size={20} />
              Ajouter un joueur
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-4">
            {teams[selectedTeam].filter(p => !p.x && !p.y).map((player) => (
              <PlayerCard
                key={player.id}
                {...player}
              />
            ))}
          </div>

          <div className="md:col-span-3 aspect-[16/9]">
            <RugbyField
              players={teams[selectedTeam].filter(p => p.x && p.y)}
              onPlayerDrop={handlePlayerDrop}
              onPlayerRemove={handlePlayerRemove}
            />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <PlayerModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handlePlayerAdd}
          positions={POSITIONS}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  if (showWelcome) {
    return <WelcomeScreen onEnter={() => setShowWelcome(false)} />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <RugbyApp />
    </DndProvider>
  );
};

export default App;
