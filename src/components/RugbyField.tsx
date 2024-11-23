import React, { useCallback } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag } from 'react-dnd';
import { User } from 'lucide-react';
import { Player, DropPosition } from '../types';
import { calculateDropPosition } from '../utils';

interface FieldPlayerProps {
  player: Player;
  onDrop: (player: Player, position: DropPosition) => void;
  onRemove: (playerId: number) => void;
}

const FieldPlayer: React.FC<FieldPlayerProps> = React.memo(({ player, onDrop, onRemove }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'player',
    item: player,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onRemove(player.id);
      e.preventDefault();
    }
  }, [onRemove, player.id]);

  return (
    <motion.div
      key={player.id}
      initial={{ scale: 0 }}
      animate={{ scale: isDragging ? 1.1 : 1 }}
      exit={{ scale: 0 }}
      style={{
        position: 'absolute',
        left: `${player.x}%`,
        top: `${player.y}%`,
        transform: 'translate(-50%, -50%)',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div
        ref={drag}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative group cursor-move"
        onClick={() => onRemove(player.id)}
        aria-label={`${player.name}, ${player.position}`}
      >
        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center
                      text-black font-bold shadow-lg
                      group-hover:scale-110 transition-all duration-200">
          {player.number ? player.number : <User size={24} />}
        </div>
      </div>
    </motion.div>
  );
});

interface RugbyFieldProps {
  players: Player[];
  onPlayerDrop: (player: Player, position: DropPosition) => void;
  onPlayerRemove: (playerId: number) => void;
}

export const RugbyField: React.FC<RugbyFieldProps> = React.memo(({
  players,
  onPlayerDrop,
  onPlayerRemove,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'player',
    drop: (item: Player, monitor: DropTargetMonitor) => {
      const offset = monitor.getClientOffset();
      const fieldElement = document.getElementById('rugby-field');
      
      if (!offset || !fieldElement) {
        console.warn('Drop coordinates or field element not found');
        return undefined;
      }

      const position = calculateDropPosition(offset, fieldElement);
      if (position) {
        onPlayerDrop(item, position);
      }
      
      return undefined;
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      id="rugby-field"
      ref={drop}
      className={`
        relative w-full h-full rounded-xl transition-colors duration-300
        ${isOver ? 'bg-green-600' : 'bg-green-700'}
        min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh]
        overflow-hidden
      `}
      role="region"
      aria-label="Terrain de rugby"
    >
      {/* Field markings */}
      <div className="absolute inset-0 border-2 border-white/50 m-4">
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/50"></div>
        <div className="absolute top-0 left-[22%] w-0.5 h-full bg-white/50"></div>
        <div className="absolute top-0 right-[22%] w-0.5 h-full bg-white/50"></div>
        <div className="absolute top-0 left-[5%] w-0.5 h-full bg-white/30"></div>
        <div className="absolute top-0 right-[5%] w-0.5 h-full bg-white/30"></div>
        
        <div className="absolute top-0 left-0 w-full h-full flex justify-between">
          <div className="w-[5%] h-full border-r border-white/50"></div>
          <div className="w-[5%] h-full border-l border-white/50"></div>
        </div>
      </div>

      {/* Players on field */}
      <AnimatePresence>
        {players.map((player) => (
          <FieldPlayer
            key={player.id}
            player={player}
            onDrop={onPlayerDrop}
            onRemove={onPlayerRemove}
          />
        ))}
      </AnimatePresence>
    </div>
  );
});
