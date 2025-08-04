import React from 'react';
import { motion } from 'framer-motion';
import { Modal } from '../UI/Modal';
import { Property, PropertyGroup } from '../../types';

interface PropertyPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
  playerMoney: number;
  onBuy: () => void;
  onDecline: () => void;
}

const getColorGroupClass = (colorGroup: PropertyGroup) => {
  const colors = {
    [PropertyGroup.BROWN]: 'from-amber-800 to-amber-700',
    [PropertyGroup.LIGHT_BLUE]: 'from-sky-300 to-sky-400',
    [PropertyGroup.PINK]: 'from-pink-400 to-pink-500',
    [PropertyGroup.ORANGE]: 'from-orange-500 to-orange-600',
    [PropertyGroup.RED]: 'from-red-500 to-red-600',
    [PropertyGroup.YELLOW]: 'from-yellow-400 to-yellow-500',
    [PropertyGroup.GREEN]: 'from-green-500 to-green-600',
    [PropertyGroup.DARK_BLUE]: 'from-blue-800 to-blue-900',
    [PropertyGroup.STATION]: 'from-gray-700 to-gray-800',
    [PropertyGroup.UTILITY]: 'from-gray-300 to-gray-400'
  };
  return colors[colorGroup] || 'from-gray-100 to-gray-200';
};

export const PropertyPurchaseModal: React.FC<PropertyPurchaseModalProps> = ({
  isOpen,
  onClose,
  property,
  playerMoney,
  onBuy,
  onDecline
}) => {
  if (!property) return null;

  const canAfford = playerMoney >= property.price;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mua Bất Động Sản" size="md">
      <div className="space-y-6">
        {/* Property Card */}
        <motion.div 
          className={`bg-gradient-to-br ${getColorGroupClass(property.colorGroup)} p-6 rounded-xl shadow-lg text-white`}
          initial={{ scale: 0.8, rotateY: -180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-center">{property.name}</h3>
            
            <div className="bg-white bg-opacity-90 text-gray-800 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Giá mua:</span>
                <span className="font-bold">${property.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Thuế cơ bản:</span>
                <span>${property.baseRent}</span>
              </div>
              {property.rentLevels && (
                <>
                  <div className="border-t pt-2 text-sm">
                    <div className="flex justify-between">
                      <span>Độc quyền:</span>
                      <span>${property.rentLevels.monopoly}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 nhà:</span>
                      <span>${property.rentLevels.oneHouse}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2 nhà:</span>
                      <span>${property.rentLevels.twoHouses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3 nhà:</span>
                      <span>${property.rentLevels.threeHouses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4 nhà:</span>
                      <span>${property.rentLevels.fourHouses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Khách sạn:</span>
                      <span>${property.rentLevels.hotel}</span>
                    </div>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span>Chi phí xây dựng:</span>
                      <span>${property.buildingCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Giá thế chấp:</span>
                      <span>${property.mortgageValue}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Player Money Info */}
        <motion.div 
          className={`p-4 rounded-lg ${canAfford ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold">Tiền của bạn:</span>
            <span className={`font-bold text-lg ${canAfford ? 'text-green-600' : 'text-red-600'}`}>
              ${playerMoney}
            </span>
          </div>
          {canAfford ? (
            <p className="text-sm text-green-600 mt-1">
              Sau khi mua còn lại: ${playerMoney - property.price}
            </p>
          ) : (
            <p className="text-sm text-red-600 mt-1">
              Không đủ tiền để mua bất động sản này
            </p>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex gap-4 justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={() => {
              onBuy();
              onClose();
            }}
            disabled={!canAfford}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${
              canAfford
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={canAfford ? { scale: 1.05 } : {}}
            whileTap={canAfford ? { scale: 0.95 } : {}}
          >
            💰 Mua (${property.price})
          </motion.button>
          
          <motion.button
            onClick={() => {
              onDecline();
              onClose();
            }}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ❌ Từ Chối
          </motion.button>
        </motion.div>

        {/* Info Note */}
        <motion.div 
          className="text-xs text-gray-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {canAfford 
            ? "Nếu từ chối, bất động sản sẽ được đưa ra đấu giá"
            : "Bất động sản sẽ được đưa ra đấu giá"
          }
        </motion.div>
      </div>
    </Modal>
  );
};