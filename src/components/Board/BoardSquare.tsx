import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BoardSquare, PropertyGroup } from '../../types';

interface BoardSquareComponentProps {
  square: BoardSquare;
  position: number;
  players: Array<{ id: string; position: number; color: string }>;
  onSquareClick?: (square: BoardSquare) => void;
  isAnimatingThrough?: boolean;
}

const getColorGroupClass = (colorGroup: PropertyGroup) => {
  const colors = {
    [PropertyGroup.BROWN]: 'bg-amber-800',
    [PropertyGroup.LIGHT_BLUE]: 'bg-sky-300',
    [PropertyGroup.PINK]: 'bg-pink-400',
    [PropertyGroup.ORANGE]: 'bg-orange-500',
    [PropertyGroup.RED]: 'bg-red-500',
    [PropertyGroup.YELLOW]: 'bg-yellow-400',
    [PropertyGroup.GREEN]: 'bg-green-500',
    [PropertyGroup.DARK_BLUE]: 'bg-blue-800',
    [PropertyGroup.STATION]: 'bg-black',
    [PropertyGroup.UTILITY]: 'bg-gray-300'
  };
  return colors[colorGroup] || 'bg-gray-100';
};

export const BoardSquareComponent: React.FC<BoardSquareComponentProps> = ({ 
  square, 
  position, 
  players,
  onSquareClick,
  isAnimatingThrough = false
}) => {
  const isCorner = [0, 10, 20, 30].includes(position);
  
  return (
    <motion.div 
      className={`
        board-square relative h-full w-full cursor-pointer
        ${isCorner ? 'corner-square' : 'property-square'}
        bg-white border-2 border-black hover:shadow-lg transition-all duration-200
        ${square.property ? 'hover:bg-blue-50' : ''}
        ${isAnimatingThrough ? 'ring-4 ring-blue-400 ring-opacity-75' : ''}
      `}
      animate={isAnimatingThrough ? {
        backgroundColor: ['#ffffff', '#dbeafe', '#ffffff'],
        scale: [1, 1.05, 1]
      } : {}}
      transition={isAnimatingThrough ? {
        duration: 0.6,
        ease: "easeInOut"
      } : {}}
      onClick={() => square.property && onSquareClick?.(square)}
    >
      {/* Property color bar - only for property squares */}
      {square.property && !isCorner && (
        <motion.div 
          className={`w-full h-4 md:h-5 ${getColorGroupClass(square.property.colorGroup)}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        />
      )}
      
      {/* Square content */}
      <div className={`flex-1 p-1 md:p-2 flex flex-col justify-center min-h-0 ${isCorner ? 'text-center' : ''}`}>
        <div className={`text-xs md:text-sm font-bold ${isCorner ? 'text-center' : 'text-center'} mb-1 leading-tight`}>
          {square.name}
        </div>
        
        {/* Price for property squares */}
        {square.property && !isCorner && (
          <div className="text-xs md:text-sm text-center font-semibold text-green-700">
            ${square.property.price}
          </div>
        )}
        
        {/* Special icons for corner squares */}
        {isCorner && (
          <div className="text-center mt-1">
            {position === 0 && <div className="text-2xl">→</div>} {/* GO */}
            {position === 10 && <div className="text-xl">🔒</div>} {/* Jail */}
            {position === 20 && <div className="text-xl">🅿️</div>} {/* Free Parking */}
            {position === 30 && <div className="text-xl">➡️🔒</div>} {/* Go to Jail */}
          </div>
        )}
        
        {/* Buildings display */}
        {square.property && square.property.houses > 0 && (
          <motion.div 
            className="flex justify-center gap-1 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Array.from({ length: square.property.houses }).map((_, i) => (
              <motion.div 
                key={i} 
                className="w-2 h-2 md:w-3 md:h-3 bg-green-600 rounded-sm shadow-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              />
            ))}
          </motion.div>
        )}
        
        {square.property && square.property.hotel && (
          <motion.div 
            className="flex justify-center mt-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="w-3 h-2 md:w-4 md:h-3 bg-red-600 rounded-sm shadow-sm" />
          </motion.div>
        )}
      </div>
      
      {/* Players on this square */}
      <AnimatePresence>
        {players.length > 0 && (
          <motion.div 
            className="absolute bottom-1 right-1 flex flex-wrap gap-1 max-w-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                className="player-token w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white shadow-lg"
                style={{ backgroundColor: player.color }}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ 
                  scale: 1, 
                  rotate: 360,
                  y: [0, -2, 0]
                }}
                exit={{ scale: 0 }}
                transition={{ 
                  scale: { duration: 0.3 },
                  rotate: { duration: 0.5 },
                  y: { duration: 1, repeat: Infinity, delay: index * 0.2 }
                }}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};