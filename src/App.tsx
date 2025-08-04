import { motion } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import { PlayerSetup } from './components/Game/PlayerSetup';
import { Board } from './components/Board/Board';
import { GameActions } from './components/Game/GameActions';
import { PropertyManager } from './components/Game/PropertyManager';
import { PropertyPurchaseModal } from './components/Game/PropertyPurchaseModal';
import { PropertyDetailModal } from './components/Game/PropertyDetailModal';
import { AuctionModal } from './components/Game/AuctionModal';
import { ChanceCardModal } from './components/Game/ChanceCardModal';
import { CommunityChestModal } from './components/Game/CommunityChestModal';
import { GamePhase } from './types';
import { useState } from 'react';

function App() {
  const { 
    players, 
    currentPlayer, 
    phase, 
    diceValues, 
    rollDice,
    board,
    showPropertyPurchaseModal,
    showAuctionModal,
    showChanceModal,
    showCommunityChestModal,
    currentCard,
    buyProperty,
    declineProperty,
    setShowPropertyPurchaseModal,
    setShowAuctionModal,
    setShowChanceModal,
    setShowCommunityChestModal,
    isAnimatingMovement,
    animationCurrentPosition
  } = useGameStore();

  // Local state for modals
  const [showPropertyManager, setShowPropertyManager] = useState(false);
  const [showPropertyDetail, setShowPropertyDetail] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  if (phase === GamePhase.SETUP) {
    return <PlayerSetup />;
  }

  const currentPlayerData = players[currentPlayer];

  return (
    <div className="min-h-screen bg-green-50 p-2 md:p-4">
      <div className="max-w-7xl mx-auto h-screen flex flex-col">
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6 text-green-800"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          MONOPOLY - Phiên Bản Việt Nam
        </motion.h1>
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 min-h-0">
          {/* Board */}
          <div className="lg:col-span-3 flex justify-center items-center">
            <Board 
              players={players} 
              phase={phase} 
              diceValues={diceValues}
              rollDice={rollDice}
              isAnimatingMovement={isAnimatingMovement}
              animationCurrentPosition={animationCurrentPosition}
              onSquareClick={(square) => {
                if (square.property) {
                  setSelectedProperty(square.property);
                  setShowPropertyDetail(true);
                }
              }}
            />
          </div>
          
          {/* Game Controls */}
          <div className="space-y-4 md:space-y-6 overflow-y-auto">
            {/* Current Player Info */}
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <h2 className="text-xl font-bold mb-3">Lượt của:</h2>
              <div className="flex items-center gap-3">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                  style={{ backgroundColor: currentPlayerData?.color }}
                />
                <span className="text-lg font-semibold">{currentPlayerData?.name}</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Tiền: ${currentPlayerData?.money}
              </div>
            </div>
            
            {/* Property Manager Button */}
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <button
                onClick={() => setShowPropertyManager(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                🏘️ Quản Lý Bất Động Sản
                {currentPlayerData && currentPlayerData.properties.length > 0 && (
                  <span className="bg-blue-800 text-xs px-2 py-1 rounded-full">
                    {currentPlayerData.properties.length}
                  </span>
                )}
              </button>
            </div>
            
            {/* Game Actions */}
            {currentPlayerData && (
              <GameActions currentPlayer={currentPlayerData} />
            )}
            
            {/* Player List */}
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <h3 className="text-lg font-bold mb-3">Người Chơi</h3>
              <div className="space-y-2">
                {players.map((player, index) => (
                  <div 
                    key={player.id}
                    className={`p-2 rounded flex items-center gap-2 ${
                      index === currentPlayer ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                    }`}
                  >
                    <div 
                      className="w-4 h-4 rounded-full border border-white"
                      style={{ backgroundColor: player.color }}
                    />
                    <div className="flex-1">
                      <div className="font-semibold">{player.name}</div>
                      <div className="text-xs text-gray-600">
                        ${player.money} • {player.properties.length} BĐS
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Modals */}
        <PropertyPurchaseModal
          isOpen={showPropertyPurchaseModal}
          onClose={() => setShowPropertyPurchaseModal(false)}
          property={currentPlayerData ? board[currentPlayerData.position]?.property || null : null}
          playerMoney={currentPlayerData?.money || 0}
          onBuy={buyProperty}
          onDecline={declineProperty}
        />
        
        <AuctionModal
          isOpen={showAuctionModal}
          onClose={() => setShowAuctionModal(false)}
          property={currentPlayerData ? board[currentPlayerData.position]?.property || null : null}
          players={players.map(p => ({ id: p.id, name: p.name, money: p.money, color: p.color }))}
          onBid={(playerId, amount) => {
            // Handle bidding logic
            console.log(`Player ${playerId} bid ${amount}`);
          }}
          onAuctionEnd={(winnerId, amount) => {
            // Handle auction end
            console.log(`Player ${winnerId} won with ${amount}`);
            setShowAuctionModal(false);
          }}
        />
        
        <ChanceCardModal
          isOpen={showChanceModal}
          onClose={() => setShowChanceModal(false)}
          cardText={currentCard || ''}
          onExecute={() => {
            // Handle chance card execution
            console.log('Execute chance card:', currentCard);
          }}
        />
        
        <CommunityChestModal
          isOpen={showCommunityChestModal}
          onClose={() => setShowCommunityChestModal(false)}
          cardText={currentCard || ''}
          onExecute={() => {
            // Handle community chest card execution
            console.log('Execute community chest card:', currentCard);
          }}
        />

        {/* Property Manager Modal */}
        {currentPlayerData && (
          <PropertyManager
            isOpen={showPropertyManager}
            onClose={() => setShowPropertyManager(false)}
            player={currentPlayerData}
            onPropertyClick={(propertyId) => {
              const property = currentPlayerData.properties.find(p => p.id === propertyId);
              if (property) {
                setSelectedProperty(property);
                setShowPropertyDetail(true);
              }
            }}
          />
        )}

        {/* Property Detail Modal */}
        <PropertyDetailModal
          isOpen={showPropertyDetail}
          onClose={() => setShowPropertyDetail(false)}
          property={selectedProperty}
        />
      </div>
    </div>
  );
}

export default App;