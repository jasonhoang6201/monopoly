import React from 'react';
import { motion } from 'framer-motion';
import { Modal } from '../UI/Modal';

interface ChanceCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardText: string;
  onExecute: () => void;
}

export const ChanceCardModal: React.FC<ChanceCardModalProps> = ({
  isOpen,
  onClose,
  cardText,
  onExecute
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Thẻ Cơ Hội" size="md">
      <div className="text-center space-y-6">
        {/* Card Design */}
        <motion.div 
          className="bg-gradient-to-br from-orange-400 to-red-500 p-6 rounded-xl shadow-lg border-4 border-yellow-300 mx-auto max-w-xs"
          initial={{ rotateY: -90, scale: 0.8 }}
          animate={{ rotateY: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <motion.div 
            className="text-white text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-2xl font-bold mb-2">CƠ HỘI</div>
            <div className="text-4xl mb-2">🎲</div>
            <div className="bg-white text-orange-800 p-3 rounded-lg text-sm font-semibold">
              {cardText}
            </div>
          </motion.div>
        </motion.div>

        {/* Animation effects */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 2) * 20}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Action Button */}
        <motion.button
          onClick={() => {
            onExecute();
            onClose();
          }}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Thực Hiện
        </motion.button>
      </div>
    </Modal>
  );
};