import React from 'react';
import { Player, SquareType } from '../../types';
import { useGameStore } from '../../store/gameStore';

interface GameActionsProps {
  currentPlayer: Player;
}

export const GameActions: React.FC<GameActionsProps> = ({ currentPlayer }) => {
  const { board, phase, buyProperty, endTurn } = useGameStore();
  const currentSquare = board[currentPlayer.position];
  
  const canBuyProperty = () => {
    if (!currentSquare.property) return false;
    if (currentSquare.property.owner) return false;
    if (currentPlayer.money < currentSquare.property.price) return false;
    return [SquareType.PROPERTY, SquareType.STATION, SquareType.UTILITY].includes(currentSquare.type);
  };

  const getRentAmount = () => {
    if (!currentSquare.property || !currentSquare.property.owner) return 0;
    
    const property = currentSquare.property;
    
    if (property.type === SquareType.STATION) {
      // Station rent depends on how many stations the owner has
      // For now, return base rent (will be enhanced later)
      return property.baseRent;
    }
    
    if (property.type === SquareType.UTILITY) {
      // Utility rent is 4x or 10x dice roll (will be enhanced later)
      return property.baseRent;
    }
    
    // Regular property rent
    if (property.hotel) {
      return property.rentLevels?.hotel || 0;
    }
    
    if (property.houses > 0) {
      const rentLevels = property.rentLevels;
      if (!rentLevels) return property.baseRent;
      
      switch (property.houses) {
        case 1: return rentLevels.oneHouse;
        case 2: return rentLevels.twoHouses;
        case 3: return rentLevels.threeHouses;
        case 4: return rentLevels.fourHouses;
        default: return property.baseRent;
      }
    }
    
    // Check if owner has monopoly (will be enhanced later)
    return property.baseRent;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">Hành Động</h3>
      
      {/* Current square info */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">Vị trí hiện tại:</h4>
        <div className="text-lg font-bold">{currentSquare.name}</div>
        
        {currentSquare.property && (
          <div className="mt-2 text-sm">
            <div>Giá: ${currentSquare.property.price}</div>
            {currentSquare.property.owner && (
              <div className="text-red-600">
                Chủ sở hữu: {currentSquare.property.owner}
                <br />
                Tiền thuê: ${getRentAmount()}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="space-y-3">
        {phase === 'action' && canBuyProperty() && (
          <button
            onClick={buyProperty}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
          >
            Mua Bất Động Sản (${currentSquare.property?.price})
          </button>
        )}
        
        {phase === 'action' && currentSquare.property?.owner && currentSquare.property.owner !== currentPlayer.id && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-red-800 font-semibold">
              Phải trả tiền thuê: ${getRentAmount()}
            </div>
          </div>
        )}
        
        {phase === 'action' && (
          <button
            onClick={endTurn}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Kết Thúc Lượt
          </button>
        )}
      </div>
      
      {/* Player status */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm space-y-1">
          <div>Tiền: <span className="font-bold">${currentPlayer.money}</span></div>
          <div>Số bất động sản: <span className="font-bold">{currentPlayer.properties.length}</span></div>
          {currentPlayer.isInJail && (
            <div className="text-red-600 font-semibold">Đang ở tù ({currentPlayer.jailTurns} lượt)</div>
          )}
        </div>
      </div>
    </div>
  );
};