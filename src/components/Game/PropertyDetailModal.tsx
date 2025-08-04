import React from 'react';
import { motion } from 'framer-motion';
import { Modal } from '../UI/Modal';
import { Property, PropertyGroup } from '../../types';

interface PropertyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
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

const getColorGroupName = (colorGroup: PropertyGroup) => {
  const names = {
    [PropertyGroup.BROWN]: 'Nhóm Nâu',
    [PropertyGroup.LIGHT_BLUE]: 'Nhóm Xanh Nhạt',
    [PropertyGroup.PINK]: 'Nhóm Hồng',
    [PropertyGroup.ORANGE]: 'Nhóm Cam',
    [PropertyGroup.RED]: 'Nhóm Đỏ',
    [PropertyGroup.YELLOW]: 'Nhóm Vàng',
    [PropertyGroup.GREEN]: 'Nhóm Xanh Lá',
    [PropertyGroup.DARK_BLUE]: 'Nhóm Xanh Đậm',
    [PropertyGroup.STATION]: 'Ga Tàu',
    [PropertyGroup.UTILITY]: 'Tiện Ích'
  };
  return names[colorGroup] || colorGroup;
};

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  isOpen,
  onClose,
  property
}) => {
  if (!property) return null;

  const isStation = property.colorGroup === PropertyGroup.STATION;
  const isUtility = property.colorGroup === PropertyGroup.UTILITY;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chi Tiết Bất Động Sản" size="sm">
      <div className="space-y-6">
        {/* Property Card */}
        <motion.div 
          className={`bg-gradient-to-br ${getColorGroupClass(property.colorGroup)} p-6 rounded-xl shadow-lg text-white relative overflow-hidden`}
          initial={{ scale: 0.8, rotateY: -180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <div className="w-full h-full bg-white rounded-full -translate-y-16 translate-x-16" />
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Header */}
            <div className="mb-4">
              <div className="text-sm opacity-80 mb-1">{getColorGroupName(property.colorGroup)}</div>
              <h3 className="text-2xl font-bold">{property.name}</h3>
            </div>
            
            {/* Main Price */}
            <div className="bg-white bg-opacity-90 text-gray-800 p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-lg font-semibold">Giá mua:</span>
                <span className="text-2xl font-bold text-green-600">${property.price}</span>
              </div>
              
              {/* Rent Structure */}
              {!isStation && !isUtility && property.rentLevels && (
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Cấu trúc thuế:</div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Thuê cơ bản:</span>
                      <span className="font-semibold">${property.baseRent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Độc quyền:</span>
                      <span className="font-semibold">${property.rentLevels.monopoly}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 nhà:</span>
                      <span className="font-semibold">${property.rentLevels.oneHouse}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2 nhà:</span>
                      <span className="font-semibold">${property.rentLevels.twoHouses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3 nhà:</span>
                      <span className="font-semibold">${property.rentLevels.threeHouses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4 nhà:</span>
                      <span className="font-semibold">${property.rentLevels.fourHouses}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Khách sạn:</span>
                      <span className="font-bold text-red-600">${property.rentLevels.hotel}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Station Rent */}
              {isStation && (
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Thuế theo số ga sở hữu:</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>1 ga:</span>
                      <span className="font-semibold">$25</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2 ga:</span>
                      <span className="font-semibold">$50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3 ga:</span>
                      <span className="font-semibold">$100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4 ga:</span>
                      <span className="font-bold text-green-600">$200</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Utility Rent */}
              {isUtility && (
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Thuế theo xúc xắc:</div>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>1 tiện ích:</span>
                      <span className="font-semibold">4 × tổng xúc xắc</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2 tiện ích:</span>
                      <span className="font-bold text-blue-600">10 × tổng xúc xắc</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Building & Mortgage Info */}
              {!isStation && !isUtility && (
                <div className="border-t pt-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Chi phí xây dựng:</span>
                      <span className="font-semibold">${property.buildingCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Giá thế chấp:</span>
                      <span className="font-semibold">${property.mortgageValue}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Current Status */}
        {property.owner && (
          <motion.div 
            className="bg-blue-50 p-4 rounded-lg border border-blue-200"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-blue-800 mb-2">Trạng thái hiện tại:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Chủ sở hữu:</span>
                <span className="font-semibold">Người chơi</span>
              </div>
              
              {property.houses > 0 && (
                <div className="flex justify-between items-center">
                  <span>Số nhà:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{property.houses}</span>
                    <div className="flex gap-1">
                      {Array.from({ length: property.houses }).map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-green-600 rounded-sm" />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {property.hotel && (
                <div className="flex justify-between items-center">
                  <span>Khách sạn:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">1</span>
                    <div className="w-4 h-3 bg-red-600 rounded-sm" />
                  </div>
                </div>
              )}
              
              <div className="flex justify-between">
                <span>Thuế hiện tại:</span>
                <span className="font-bold text-green-600">
                  ${getCurrentRent(property)}
                </span>
              </div>
              
              {property.mortgaged && (
                <div className="bg-red-100 p-2 rounded text-red-800 text-center">
                  🏦 BẤT ĐỘNG SẢN ĐÃ ĐƯỢC THẾ CHẤP
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Property not owned */}
        {!property.owner && (
          <motion.div 
            className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-4xl mb-2">🏘️</div>
            <p className="text-gray-600">Bất động sản này chưa có chủ sở hữu</p>
            <p className="text-sm text-gray-500 mt-1">
              Hạ cánh vào đây để có cơ hội mua
            </p>
          </motion.div>
        )}

        {/* Fun Facts */}
        <motion.div 
          className="text-xs text-gray-500 text-center bg-gray-50 p-3 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          💡 <strong>Mẹo:</strong> Sở hữu tất cả BĐS cùng màu để tăng gấp đôi thuế!<br />
          🏗️ Chỉ có thể xây nhà khi có độc quyền nhóm màu.<br />
          💰 Thế chấp BĐS để lấy tiền mặt khi cần thiết.
        </motion.div>
      </div>
    </Modal>
  );

  // Helper function to calculate current rent
  function getCurrentRent(prop: Property): number {
    if (prop.mortgaged || !prop.rentLevels) return 0;
    
    if (isStation) {
      // This would need to check how many stations the owner has
      return 25; // Simplified for now
    }
    
    if (isUtility) {
      // This would need to multiply by dice roll
      return 0; // Variable based on dice
    }
    
    if (prop.hotel) return prop.rentLevels.hotel;
    if (prop.houses > 0) {
      const houseRents = [
        prop.rentLevels.oneHouse,
        prop.rentLevels.twoHouses,
        prop.rentLevels.threeHouses,
        prop.rentLevels.fourHouses
      ];
      return houseRents[prop.houses - 1];
    }
    
    // Check for monopoly (simplified)
    return prop.baseRent;
  }
};