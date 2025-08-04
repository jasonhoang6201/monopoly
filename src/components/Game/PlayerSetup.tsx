import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';

export const PlayerSetup: React.FC = () => {
  const [playerNames, setPlayerNames] = useState(['', '', '', '']);
  const [numPlayers, setNumPlayers] = useState(2);
  const { initializeGame } = useGameStore();

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStartGame = () => {
    const names = playerNames.slice(0, numPlayers).filter(name => name.trim());
    if (names.length === numPlayers) {
      initializeGame(names);
    }
  };

  const isValidSetup = () => {
    const names = playerNames.slice(0, numPlayers);
    return names.every(name => name.trim()) && names.length === numPlayers;
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-green-800">MONOPOLY</h1>
        <p className="text-center text-green-600 mb-8">Phiên Bản Việt Nam</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số người chơi:
            </label>
            <select
              value={numPlayers}
              onChange={(e) => setNumPlayers(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value={2}>2 người chơi</option>
              <option value={3}>3 người chơi</option>
              <option value={4}>4 người chơi</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên người chơi:
            </label>
            <div className="space-y-3">
              {Array.from({ length: numPlayers }).map((_, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                    style={{ 
                      backgroundColor: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'][index] 
                    }}
                  />
                  <input
                    type="text"
                    placeholder={`Người chơi ${index + 1}`}
                    value={playerNames[index]}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleStartGame}
            disabled={!isValidSetup()}
            className={`
              w-full py-3 rounded-lg font-bold text-white text-lg
              ${isValidSetup()
                ? 'bg-green-600 hover:bg-green-700 active:bg-green-800'
                : 'bg-gray-400 cursor-not-allowed'
              }
              transition-colors
            `}
          >
            Bắt Đầu Game
          </button>
        </div>
        
        <div className="mt-8 text-xs text-gray-500 space-y-1">
          <div>• Mỗi người chơi bắt đầu với $2,000</div>
          <div>• Nhận $200 khi qua ô Xuất phát</div>
          <div>• Tung đôi để có thêm lượt</div>
          <div>• 3 lần tung đôi liên tiếp = vào tù</div>
        </div>
      </div>
    </div>
  );
};