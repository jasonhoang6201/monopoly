import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Modal } from '../UI/Modal';
import { Property } from '../../types';

interface AuctionModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
  players: Array<{ id: string; name: string; money: number; color: string }>;
  onBid: (playerId: string, amount: number) => void;
  onAuctionEnd: (winnerId: string, amount: number) => void;
}

export const AuctionModal: React.FC<AuctionModalProps> = ({
  isOpen,
  onClose,
  property,
  players,
  onBid,
  onAuctionEnd
}) => {
  const [currentBid, setCurrentBid] = useState(10);
  const [currentBidder, setCurrentBidder] = useState<string | null>(null);
  const [activePlayers, setActivePlayers] = useState<string[]>([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [biddingRound, setBiddingRound] = useState(1);
  const [auctionEnding, setAuctionEnding] = useState(false);

  // Initialize auction when modal opens
  useEffect(() => {
    if (isOpen && players.length > 0) {
      setCurrentBid(10);
      setCurrentBidder(null);
      setActivePlayers(players.map(p => p.id));
      setCurrentTurnIndex(0);
      setBiddingRound(1);
      setAuctionEnding(false);
    }
  }, [isOpen, players]);

  const currentPlayer = activePlayers[currentTurnIndex];
  const currentPlayerData = players.find(p => p.id === currentPlayer);

  const handleBid = () => {
    if (!currentPlayer) return;
    
    const newBid = currentBid + 10;
    setCurrentBid(newBid);
    setCurrentBidder(currentPlayer);
    onBid(currentPlayer, newBid);
    
    // Move to next player
    nextTurn();
  };

  const handlePass = () => {
    if (!currentPlayer) return;
    
    // Remove current player from active players
    const newActivePlayers = activePlayers.filter(id => id !== currentPlayer);
    setActivePlayers(newActivePlayers);
    
    // Check if auction should end
    if (newActivePlayers.length === 1) {
      // Only one player left - they auto-purchase at current bid (minimum $10)
      const winnerId = newActivePlayers[0];
      const finalBid = Math.max(currentBid, 10);
      
      // Show ending state
      setAuctionEnding(true);
      
      // End auction immediately - last player auto-buys
      setTimeout(() => {
        onAuctionEnd(winnerId, finalBid);
      }, 1500); // Slightly longer delay to show the win state
      
      return;
    } else if (newActivePlayers.length === 0) {
      // Everyone passed - auction ends with no winner
      onClose();
      return;
    }
    
    // Adjust current turn index if needed
    if (currentTurnIndex >= newActivePlayers.length) {
      setCurrentTurnIndex(0);
      setBiddingRound(prev => prev + 1);
    }
  };

  const nextTurn = () => {
    const nextIndex = (currentTurnIndex + 1) % activePlayers.length;
    setCurrentTurnIndex(nextIndex);
    
    // If we've completed a full round, increment round counter
    if (nextIndex === 0) {
      setBiddingRound(prev => prev + 1);
    }
  };

  const canBid = currentPlayerData ? currentPlayerData.money >= currentBid + 10 : false;

  if (!property) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Đấu Giá Bất Động Sản" size="lg">
      <div className="space-y-6">
        {/* Property Info */}
        <motion.div 
          className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border-2 border-blue-200"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-xl font-bold text-blue-800 mb-2">{property.name}</h3>
          <p className="text-gray-600">Giá niêm yết: ${property.price}</p>
          <p className="text-sm text-gray-500 mt-1">
            Đấu giá bắt đầu từ $10 và tăng theo bước $10
          </p>
        </motion.div>

        {/* Current Bid & Turn Info */}
        <motion.div 
          className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-yellow-800">Giá Hiện Tại</h4>
              <motion.div 
                className="text-3xl font-bold text-yellow-600 mt-2"
                key={currentBid}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                ${currentBid}
              </motion.div>
              {currentBidder && (
                <p className="text-sm text-gray-600 mt-1">
                  Người đấu giá: {players.find(p => p.id === currentBidder)?.name}
                </p>
              )}
            </div>
            
            <div className="text-center">
              <h4 className="text-lg font-semibold text-blue-800">Lượt Hiện Tại</h4>
              <div className="mt-2">
                {currentPlayerData && (
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                      style={{ backgroundColor: currentPlayerData.color }}
                    />
                    <span className="font-bold text-blue-600">{currentPlayerData.name}</span>
                  </div>
                )}
                <p className="text-sm text-gray-600 mt-1">Vòng đấu giá: {biddingRound}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Current Player Actions */}
        {auctionEnding ? (
          <motion.div 
            className="bg-green-100 p-6 rounded-lg border-2 border-green-300 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              🎉
            </motion.div>
            <h3 className="text-xl font-bold text-green-800 mt-2">
              Đấu Giá Kết Thúc!
            </h3>
            <p className="text-green-700 mt-2">
              {activePlayers.length === 1 ? 
                `${players.find(p => p.id === activePlayers[0])?.name} thắng với giá $${Math.max(currentBid, 10)}!` :
                'Đang hoàn tất giao dịch...'
              }
            </p>
          </motion.div>
        ) : currentPlayerData && (
          <motion.div 
            className="bg-white p-4 rounded-lg border-2 border-green-200"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Lượt của {currentPlayerData.name}
            </h4>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">
                Tiền có: ${currentPlayerData.money}
              </div>
              <div className="text-sm text-gray-600">
                Giá tiếp theo: ${currentBid + 10}
              </div>
            </div>
            
            <div className="flex gap-3 justify-center">
              <motion.button
                onClick={handleBid}
                disabled={!canBid}
                className={`px-6 py-3 rounded-lg font-semibold ${
                  canBid
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                } transition-all duration-200`}
                whileHover={canBid ? { scale: 1.05 } : {}}
                whileTap={canBid ? { scale: 0.95 } : {}}
              >
                💰 Đấu Giá ${currentBid + 10}
              </motion.button>
              <motion.button
                onClick={handlePass}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ❌ Bỏ Qua
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Players Status */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-gray-800">Trạng Thái Người Chơi</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {players.map((player, index) => {
              const isActive = activePlayers.includes(player.id);
              const isCurrentTurn = player.id === currentPlayer;
              
              return (
                <motion.div
                  key={player.id}
                  className={`p-3 rounded-lg border ${
                    isCurrentTurn 
                      ? 'bg-blue-100 border-blue-300 shadow-md' 
                      : isActive
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-100 border-gray-300 opacity-60'
                  }`}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: player.color }}
                      />
                      <div>
                        <div className="font-semibold text-sm">{player.name}</div>
                        <div className="text-xs text-gray-600">${player.money}</div>
                      </div>
                    </div>
                    
                    <div className="text-xs">
                      {isCurrentTurn ? '⏰ Lượt hiện tại' : 
                       isActive ? '✅ Đang tham gia' : '❌ Đã bỏ qua'}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <motion.div 
          className="text-xs text-gray-500 text-center bg-gray-50 p-3 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          🔄 Đấu giá diễn ra theo lượt. Người chơi có thể đấu giá hoặc bỏ qua.<br />
          🏆 Đấu giá kết thúc khi chỉ còn một người chơi không bỏ qua.<br />
          💰 Mỗi lần đấu giá tăng $10.
        </motion.div>
      </div>
    </Modal>
  );
};