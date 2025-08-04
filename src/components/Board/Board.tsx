import React from 'react';
import { motion } from 'framer-motion';
import { BoardSquareComponent } from './BoardSquare';
import { createBoard } from '../../lib/board';
import { Player, GamePhase } from '../../types';

interface BoardProps {
  players: Player[];
  phase: GamePhase;
  diceValues: [number, number];
  onSquareClick?: (square: any) => void;
  rollDice: () => void;
  isAnimatingMovement?: boolean;
  animationCurrentPosition?: number;
}

export const Board: React.FC<BoardProps> = ({ 
  players, 
  phase, 
  diceValues, 
  onSquareClick, 
  rollDice,
  isAnimatingMovement = false,
  animationCurrentPosition = 0
}) => {
  const board = createBoard();
  
  // Convert players to simple format for BoardSquare
  const simplePlayers = players.map(p => ({
    id: p.id,
    position: p.position,
    color: p.color
  }));

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-square bg-green-200 border-4 border-black shadow-2xl" style={{ maxHeight: '85vh' }}>
      {/* Board squares container */}
      <div className="absolute inset-0">
        {/* Bottom row (GO to Jail) - positions 0-10 */}
        <div className="absolute bottom-0 left-0 right-0 h-[12.5%] flex">
          {board.slice(0, 11).map((square, index) => {
            const playersOnSquare = simplePlayers.filter(p => p.position === square.id);
            const isCorner = index === 0 || index === 10;
            return (
              <motion.div 
                key={square.id} 
                className={`${isCorner ? 'w-[12.5%]' : 'flex-1'} h-full`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <BoardSquareComponent 
                  square={square} 
                  position={square.id} 
                  players={playersOnSquare}
                  onSquareClick={onSquareClick}
                  isAnimatingThrough={isAnimatingMovement && animationCurrentPosition === square.id}
                />
              </motion.div>
            );
          })}
        </div>
        
        {/* Left column (positions 11-19) */}
        <div className="absolute left-0 top-[12.5%] bottom-[12.5%] w-[12.5%] flex flex-col">
          {board.slice(11, 20).map((square, index) => {
            const playersOnSquare = simplePlayers.filter(p => p.position === square.id);
            return (
              <motion.div 
                key={square.id} 
                className="flex-1 w-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: (index + 11) * 0.05 }}
              >
                <BoardSquareComponent 
                  square={square} 
                  position={square.id} 
                  players={playersOnSquare}
                  onSquareClick={onSquareClick}
                  isAnimatingThrough={isAnimatingMovement && animationCurrentPosition === square.id}
                />
              </motion.div>
            );
          })}
        </div>
        
        {/* Top row (Free Parking to GO) - positions 20-30 */}
        <div className="absolute top-0 left-0 right-0 h-[12.5%] flex flex-row-reverse">
          {board.slice(20, 31).map((square, index) => {
            const playersOnSquare = simplePlayers.filter(p => p.position === square.id);
            const isCorner = index === 0 || index === 10;
            return (
              <motion.div 
                key={square.id} 
                className={`${isCorner ? 'w-[12.5%]' : 'flex-1'} h-full`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: (index + 20) * 0.05 }}
              >
                <BoardSquareComponent 
                  square={square} 
                  position={square.id} 
                  players={playersOnSquare}
                  onSquareClick={onSquareClick}
                  isAnimatingThrough={isAnimatingMovement && animationCurrentPosition === square.id}
                />
              </motion.div>
            );
          })}
        </div>
        
        {/* Right column (positions 31-39) */}
        <div className="absolute right-0 top-[12.5%] bottom-[12.5%] w-[12.5%] flex flex-col-reverse">
          {board.slice(31, 40).map((square, index) => {
            const playersOnSquare = simplePlayers.filter(p => p.position === square.id);
            return (
              <motion.div 
                key={square.id} 
                className="flex-1 w-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: (index + 31) * 0.05 }}
              >
                <BoardSquareComponent 
                  square={square} 
                  position={square.id} 
                  players={playersOnSquare}
                  onSquareClick={onSquareClick}
                  isAnimatingThrough={isAnimatingMovement && animationCurrentPosition === square.id}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Center area - for dice and animations */}
      <motion.div 
        className="absolute top-[12.5%] left-[12.5%] right-[12.5%] bottom-[12.5%] bg-gradient-to-br from-green-100 to-green-200 border-2 border-gray-600 rounded-lg flex flex-col items-center justify-center shadow-inner overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        {/* Game Logo - Diagonal placement like in reference */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 0.8, rotate: -45 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl border-2 border-red-800">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold whitespace-nowrap tracking-wider">
              MONOPOLY
            </h1>
          </div>
        </motion.div>

        {/* Dice Area - Interactive dice rolling */}
        {phase === GamePhase.ROLLING ? (
          <motion.div 
            className="flex-1 flex flex-col items-center justify-center w-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.2, duration: 0.5 }}
          >
            <motion.div
              className="text-6xl md:text-8xl mb-4"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              🎲
            </motion.div>
            <motion.button
              onClick={rollDice}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: ["0 4px 6px rgba(0,0,0,0.1)", "0 8px 25px rgba(220,38,38,0.3)", "0 4px 6px rgba(0,0,0,0.1)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎲 TUNG XÚC XẮC
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            className="flex-1 flex items-center justify-center w-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.2, duration: 0.5 }}
          >
            <div className="text-center">
              <div className="flex gap-4 justify-center mb-4">
                <motion.div 
                  className="w-12 h-12 md:w-16 md:h-16 bg-white border-4 border-gray-800 rounded-xl flex items-center justify-center shadow-xl"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-2xl md:text-3xl font-bold text-gray-800">{diceValues[0]}</span>
                </motion.div>
                <motion.div 
                  className="w-12 h-12 md:w-16 md:h-16 bg-white border-4 border-gray-800 rounded-xl flex items-center justify-center shadow-xl"
                  animate={{ rotateY: [360, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-2xl md:text-3xl font-bold text-gray-800">{diceValues[1]}</span>
                </motion.div>
              </div>
              <div className="text-lg md:text-xl font-bold text-gray-700">
                Tổng: {diceValues[0] + diceValues[1]}
                {diceValues[0] === diceValues[1] && (
                  <div className="text-red-600 text-sm mt-1">🎯 ĐÔI!</div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Current Player Info */}
        <motion.div 
          className="text-center text-xs md:text-sm bg-white bg-opacity-80 rounded-lg p-2 m-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.5 }}
        >
          <div className="mb-1">
            <span className="font-semibold">Lượt:</span>
            <div className="mt-1">
              {players.length > 0 && (
                <div className="flex items-center justify-center gap-2">
                  <motion.div 
                    className="w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: players[0]?.color }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="font-medium text-xs md:text-sm">{players[0]?.name}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};