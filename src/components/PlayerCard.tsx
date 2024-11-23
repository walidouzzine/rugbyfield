import React, { useCallback } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { User } from 'lucide-react';
import { Player } from '../types';

interface PlayerCardProps extends Omit<Player, 'x' | 'y'> {}

export const PlayerCard: React.FC<PlayerCardProps> = React.memo(({ id, name, position, number }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'player',
    item: { id, name, position, number },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
    }
  }, []);

  return (
    <div
      ref={drag}
      role="button"
      tabIndex={0}
      aria-label={`${name}, ${position}`}
      onKeyDown={handleKeyDown}
      className={`
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        cursor-move bg-gray-800 hover:bg-gray-700 rounded-lg p-3
        flex items-center gap-3 group transition-all duration-200
        border border-gray-700 hover:border-gray-600
      `}
    >
      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
        {number ? number : <User size={20} />}
      </div>
      <div className="flex-1">
        <h3 className="text-white font-medium">{name}</h3>
        <p className="text-gray-400 text-sm">{position}</p>
      </div>
    </div>
  );
});
