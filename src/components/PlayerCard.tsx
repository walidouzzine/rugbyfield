import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { User } from 'lucide-react';

interface PlayerCardProps {
  id: number;
  name: string;
  position: string;
  number?: number;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ id, name, position, number }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'player',
    item: { id, name, position, number },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        cursor-move bg-white/10 hover:bg-white/20 rounded-lg p-3
        flex items-center gap-3 group transition-all duration-200
        border border-white/10 hover:border-white/30
      `}
    >
      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
        {number || <User size={20} />}
      </div>
      <div className="flex-1">
        <h3 className="text-white font-medium">{name}</h3>
        <p className="text-white/60 text-sm">{position}</p>
      </div>
    </div>
  );
};
