import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Player {
  id: number;
  name: string;
  position: string;
  number?: number;
}

interface PlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlayer: (player: Omit<Player, 'id'>) => void;
  darkMode: boolean;
}

const positions = [
  'Pilier gauche',
  'Talonneur',
  'Pilier droit',
  'Deuxième ligne',
  'Deuxième ligne',
  'Troisième ligne aile',
  'Troisième ligne aile',
  'Numéro 8',
  'Demi de mêlée',
  'Demi d\'ouverture',
  'Ailier gauche',
  'Premier centre',
  'Second centre',
  'Ailier droit',
  'Arrière'
];

export const PlayerModal: React.FC<PlayerModalProps> = ({ isOpen, onClose, onAddPlayer, darkMode }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState(positions[0]);
  const [number, setNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPlayer({
      name,
      position,
      number: number ? parseInt(number) : undefined,
    });
    setName('');
    setNumber('');
    setPosition(positions[0]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } w-full max-w-md rounded-xl shadow-xl transition-all transform scale-100`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Ajouter un joueur
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700 text-white' 
                  : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className={`block text-sm font-medium ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Nom du joueur
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                  darkMode 
                    ? 'bg-gray-700 text-white border-gray-600 focus:border-yellow-500' 
                    : 'border-gray-300 focus:border-yellow-500 text-gray-900'
                } focus:outline-none focus:ring-1 focus:ring-yellow-500`}
              />
            </div>

            <div>
              <label htmlFor="position" className={`block text-sm font-medium ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Position
              </label>
              <select
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                  darkMode 
                    ? 'bg-gray-700 text-white border-gray-600' 
                    : 'border-gray-300 text-gray-900'
                } focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500`}
              >
                {positions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="number" className={`block text-sm font-medium ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Numéro (optionnel)
              </label>
              <input
                type="number"
                id="number"
                min="1"
                max="99"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                  darkMode 
                    ? 'bg-gray-700 text-white border-gray-600' 
                    : 'border-gray-300 text-gray-900'
                } focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500`}
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 rounded-lg ${
                  darkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
