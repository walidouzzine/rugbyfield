import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Player, Position } from '../types';

interface PlayerModalProps {
  onClose: () => void;
  onSubmit: (player: Omit<Player, 'id'>) => void;
  positions: Position[];
}

export const PlayerModal: React.FC<PlayerModalProps> = ({ onClose, onSubmit, positions }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState(positions[0].displayName);
  const [number, setNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      position,
      number: number ? parseInt(number) : undefined,
    });
    setName('');
    setNumber('');
    setPosition(positions[0].displayName);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Fermer"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Ajouter un joueur</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Nom
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-300 mb-1">
              Poste
            </label>
            <select
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            >
              {positions.map((pos) => (
                <option key={pos.name} value={pos.displayName}>
                  {pos.displayName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="number" className="block text-sm font-medium text-gray-300 mb-1">
              Numéro
            </label>
            <input
              type="number"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              min="1"
              max="99"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
