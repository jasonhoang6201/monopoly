import React from 'react';

interface DiceProps {
  values: [number, number];
  onRoll: () => void;
  disabled?: boolean;
}

const DiceFace: React.FC<{ value: number }> = ({ value }) => {
  const dotPositions = {
    1: 'justify-center items-center',
    2: 'justify-between items-center flex-col',
    3: 'justify-between items-center',
    4: 'justify-between items-center',
    5: 'justify-between items-center',
    6: 'justify-between items-center'
  };

  return (
    <div className={`
      w-12 h-12 bg-white border-2 border-gray-800 rounded-lg
      flex flex-wrap p-1 ${dotPositions[value as keyof typeof dotPositions]}
    `}>
      {value === 1 && (
        <div className="w-2 h-2 bg-gray-800 rounded-full" />
      )}
      {value === 2 && (
        <>
          <div className="w-2 h-2 bg-gray-800 rounded-full" />
          <div className="w-2 h-2 bg-gray-800 rounded-full" />
        </>
      )}
      {value === 3 && (
        <>
          <div className="w-2 h-2 bg-gray-800 rounded-full" />
          <div className="w-2 h-2 bg-gray-800 rounded-full self-center" />
          <div className="w-2 h-2 bg-gray-800 rounded-full" />
        </>
      )}
      {value === 4 && (
        <div className="w-full h-full flex justify-between">
          <div className="flex flex-col justify-between">
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
          </div>
          <div className="flex flex-col justify-between">
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
          </div>
        </div>
      )}
      {value === 5 && (
        <div className="w-full h-full flex justify-between">
          <div className="flex flex-col justify-between">
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
          </div>
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
          </div>
          <div className="flex flex-col justify-between">
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
          </div>
        </div>
      )}
      {value === 6 && (
        <div className="w-full h-full flex justify-between">
          <div className="flex flex-col justify-between">
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
          </div>
          <div className="flex flex-col justify-between">
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export const Dice: React.FC<DiceProps> = ({ values, onRoll, disabled }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <DiceFace value={values[0]} />
        <DiceFace value={values[1]} />
      </div>
      
      <button
        onClick={onRoll}
        disabled={disabled}
        className={`
          px-6 py-2 rounded-lg font-bold text-white
          ${disabled 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }
          transition-colors
        `}
      >
        Tung Xúc Xắc
      </button>
      
      <div className="text-center text-sm">
        <div className="font-semibold">Tổng: {values[0] + values[1]}</div>
        {values[0] === values[1] && (
          <div className="text-blue-600 font-bold">Đôi!</div>
        )}
      </div>
    </div>
  );
};