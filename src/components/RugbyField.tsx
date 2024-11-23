import React from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag } from 'react-dnd';

interface Player {
  id: number;
  name: string;
  position: string;
  number?: number;
  x?: number;
  y?: number;
}

interface RugbyFieldProps {
  players: Player[];
  onPlayerDrop: (player: Player, position: { x: number; y: number }) => void;
  onPlayerRemove: (playerId: number) => void;
}

const FieldPlayer: React.FC<{
  player: Player;
  onDrop: (player: Player, position: { x: number; y: number }) => void;
  onRemove: (playerId: number) => void;
}> = ({ player, onDrop, onRemove }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'player',
    item: player,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

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
        className="relative group cursor-move"
        onClick={() => onRemove(player.id)}
      >
        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center
                      text-black font-bold shadow-lg
                      group-hover:scale-110 transition-all duration-200">
          {player.number || '#'}
        </div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2
                      bg-black/80 text-white text-xs py-1 px-2 rounded-full
                      opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {player.name}
          <br />
          {player.position}
          <br />
          <span className="text-yellow-400">(Cliquer pour retirer)</span>
        </div>
      </div>
    </motion.div>
  );
};

export const RugbyField: React.FC<RugbyFieldProps> = ({
  players,
  onPlayerDrop,
  onPlayerRemove,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'player',
    drop: (item: Player, monitor: DropTargetMonitor) => {
      const offset = monitor.getClientOffset();
      const fieldElement = document.getElementById('rugby-field');
      
      if (offset && fieldElement) {
        const fieldRect = fieldElement.getBoundingClientRect();
        const x = Math.min(Math.max(((offset.x - fieldRect.left) / fieldRect.width) * 100, 5), 95);
        const y = Math.min(Math.max(((offset.y - fieldRect.top) / fieldRect.height) * 100, 5), 95);
        onPlayerDrop(item, { x, y });
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
      `}
    >
      {/* Field markings */}
      <div className="absolute inset-0 border-2 border-white/50 m-4">
        {/* Center line */}
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/50"></div>
        {/* 22m lines */}
        <div className="absolute top-0 left-[22%] w-0.5 h-full bg-white/50"></div>
        <div className="absolute top-0 right-[22%] w-0.5 h-full bg-white/50"></div>
        {/* 5m lines */}
        <div className="absolute top-0 left-[5%] w-0.5 h-full bg-white/30"></div>
        <div className="absolute top-0 right-[5%] w-0.5 h-full bg-white/30"></div>
        
        {/* Try lines */}
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
};
