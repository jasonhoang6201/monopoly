import React from 'react';
import { motion } from 'framer-motion';
import { Modal } from '../UI/Modal';

interface CommunityChestModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardText: string;
  onExecute: () => void;
}

export const CommunityChestModal: React.FC<CommunityChestModalProps> = ({
  isOpen,
  onClose,
  cardText,
  onExecute
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Thẻ Khí Vận" size="md">
      <div className="text-center space-y-6">
        {/* Card Design */}
        <motion.div 
          className="bg-gradient-to-br from-blue-400 to-purple-500 p-6 rounded-xl shadow-lg border-4 border-silver-300 mx-auto max-w-xs"
          initial={{ rotateX: -90, scale: 0.8 }}
          animate={{ rotateX: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <motion.div 
            className="text-white text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-2xl font-bold mb-2">KHÍ VẬN</div>
            <div className="text-4xl mb-2">🏛️</div>
            <div className="bg-white text-blue-800 p-3 rounded-lg text-sm font-semibold">
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
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-300 rounded-full"
              style={{
                left: `${15 + i * 8}%`,
                top: `${25 + (i % 3) * 15}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
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
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
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