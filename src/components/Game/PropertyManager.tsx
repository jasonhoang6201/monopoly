import React from 'react';
import { motion } from 'framer-motion';
import { Modal } from '../UI/Modal';
import { Player, PropertyGroup } from '../../types';

interface PropertyManagerProps {
  isOpen: boolean;
  onClose: () => void;
  player: Player;
  onPropertyClick: (propertyId: number) => void;
}

const getColorGroupClass = (colorGroup: PropertyGroup) => {
  const colors = {
    [PropertyGroup.BROWN]: 'bg-amber-800 text-white',
    [PropertyGroup.LIGHT_BLUE]: 'bg-sky-300 text-gray-800',
    [PropertyGroup.PINK]: 'bg-pink-400 text-white',
    [PropertyGroup.ORANGE]: 'bg-orange-500 text-white',
    [PropertyGroup.RED]: 'bg-red-500 text-white',
    [PropertyGroup.YELLOW]: 'bg-yellow-400 text-gray-800',
    [PropertyGroup.GREEN]: 'bg-green-500 text-white',
    [PropertyGroup.DARK_BLUE]: 'bg-blue-800 text-white',
    [PropertyGroup.STATION]: 'bg-gray-700 text-white',
    [PropertyGroup.UTILITY]: 'bg-gray-400 text-gray-800'
  };
  return colors[colorGroup] || 'bg-gray-100 text-gray-800';
};

const getColorGroupName = (colorGroup: PropertyGroup) => {
  const names = {
    [PropertyGroup.BROWN]: 'Nâu',
    [PropertyGroup.LIGHT_BLUE]: 'Xanh Nhạt',
    [PropertyGroup.PINK]: 'Hồng',
    [PropertyGroup.ORANGE]: 'Cam',
    [PropertyGroup.RED]: 'Đỏ',
    [PropertyGroup.YELLOW]: 'Vàng',
    [PropertyGroup.GREEN]: 'Xanh Lá',
    [PropertyGroup.DARK_BLUE]: 'Xanh Đậm',
    [PropertyGroup.STATION]: 'Ga Tàu',
    [PropertyGroup.UTILITY]: 'Tiện Ích'
  };
  return names[colorGroup] || colorGroup;
};

export const PropertyManager: React.FC<PropertyManagerProps> = ({ 
  isOpen, 
  onClose, 
  player, 
  onPropertyClick 
}) => {
  // All possible properties in the game organized by groups
  const allPropertyGroups = {
    [PropertyGroup.BROWN]: [
      { id: 1, name: 'Lào Cai', price: 60 },
      { id: 3, name: 'Lạng Sơn', price: 60 }
    ],
    [PropertyGroup.LIGHT_BLUE]: [
      { id: 6, name: 'Phú Thọ', price: 100 },
      { id: 8, name: 'Ninh Bình', price: 100 },
      { id: 9, name: 'Hải Phòng', price: 120 }
    ],
    [PropertyGroup.PINK]: [
      { id: 11, name: 'Quảng Ninh', price: 140 },
      { id: 13, name: 'Thanh Hóa', price: 140 },
      { id: 14, name: 'Nghệ An', price: 160 }
    ],
    [PropertyGroup.ORANGE]: [
      { id: 16, name: 'Quảng Bình', price: 180 },
      { id: 18, name: 'Thừa Thiên Huế', price: 180 },
      { id: 19, name: 'Đà Nẵng', price: 200 }
    ],
    [PropertyGroup.RED]: [
      { id: 21, name: 'Quy Nhơn', price: 220 },
      { id: 23, name: 'Nha Trang', price: 220 },
      { id: 24, name: 'Đà Lạt', price: 240 }
    ],
    [PropertyGroup.YELLOW]: [
      { id: 26, name: 'Phan Thiết', price: 260 },
      { id: 27, name: 'Vũng Tàu', price: 260 },
      { id: 29, name: 'Bình Dương', price: 280 }
    ],
    [PropertyGroup.GREEN]: [
      { id: 31, name: 'Cần Thơ', price: 300 },
      { id: 32, name: 'Cà Mau', price: 300 },
      { id: 34, name: 'Phú Quốc', price: 320 }
    ],
    [PropertyGroup.DARK_BLUE]: [
      { id: 37, name: 'Hà Nội', price: 350 },
      { id: 39, name: 'Hồ Chí Minh', price: 400 }
    ],
    [PropertyGroup.STATION]: [
      { id: 5, name: 'Ga Hà Nội', price: 200 },
      { id: 15, name: 'Sân Bay Nội Bài', price: 200 },
      { id: 25, name: 'Cảng Hải Phòng', price: 200 },
      { id: 35, name: 'Bến Xe Miền Đông', price: 200 }
    ],
    [PropertyGroup.UTILITY]: [
      { id: 12, name: 'Tập Đoàn Điện Lực', price: 150 },
      { id: 28, name: 'Thủy Điện Hòa Bình', price: 150 }
    ]
  };

  // Group owned properties by color group
  const ownedProperties = player.properties.reduce((groups, property) => {
    const group = property.colorGroup;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(property);
    return groups;
  }, {} as Record<PropertyGroup, typeof player.properties>);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Bất Động Sản - ${player.name}`} size="lg">
      <div className="space-y-6">
        {/* Property Groups */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {Object.entries(allPropertyGroups).map(([colorGroup, properties], groupIndex) => {
            const group = colorGroup as PropertyGroup;
            const ownedInGroup = ownedProperties[group] || [];
            const totalInGroup = properties.length;
            const isMonopoly = ownedInGroup.length === totalInGroup;

            return (
              <motion.div
                key={colorGroup}
                className="border rounded-lg overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: groupIndex * 0.1 }}
              >
                {/* Group Header */}
                <div className={`${getColorGroupClass(group)} px-4 py-3 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">
                      {getColorGroupName(group)}
                    </span>
                    {isMonopoly && <span className="text-sm">👑 ĐỘC QUYỀN</span>}
                  </div>
                  <span className="text-sm">
                    {ownedInGroup.length}/{totalInGroup}
                  </span>
                </div>

                {/* Property Cards Grid */}
                <div className="bg-white p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {properties.map((propertyTemplate) => {
                      const ownedProperty = ownedInGroup.find(p => p.id === propertyTemplate.id);
                      const isOwned = !!ownedProperty;

                      return (
                        <motion.div
                          key={propertyTemplate.id}
                          className={`aspect-[3/4] border-2 rounded-lg p-2 cursor-pointer transition-all duration-200 ${
                            isOwned 
                              ? `${getColorGroupClass(group).replace('text-white', 'text-gray-800')} border-green-400 shadow-md hover:shadow-lg` 
                              : 'bg-gray-100 border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => isOwned && onPropertyClick(propertyTemplate.id)}
                          whileHover={{ scale: isOwned ? 1.05 : 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: (groupIndex * 0.1) + (properties.indexOf(propertyTemplate) * 0.05) }}
                        >
                          {/* Property Color Bar */}
                          <div className={`w-full h-2 rounded-t ${getColorGroupClass(group)} mb-2`} />
                          
                          {/* Property Name */}
                          <div className="text-xs font-bold text-center mb-1 leading-tight">
                            {propertyTemplate.name}
                          </div>
                          
                          {/* Property Price */}
                          <div className="text-xs text-center text-gray-600 mb-2">
                            ${propertyTemplate.price}
                          </div>

                          {/* Property Status */}
                          {isOwned ? (
                            <div className="space-y-1">
                              {/* Buildings */}
                              {ownedProperty.houses > 0 && (
                                <div className="flex justify-center gap-1">
                                  {Array.from({ length: ownedProperty.houses }).map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 bg-green-600 rounded-sm" />
                                  ))}
                                </div>
                              )}
                              {ownedProperty.hotel && (
                                <div className="flex justify-center">
                                  <div className="w-2 h-1.5 bg-red-600 rounded-sm" />
                                </div>
                              )}
                              
                              {/* Status Icons */}
                              <div className="flex justify-center gap-1 text-xs">
                                {ownedProperty.mortgaged && <span>🏦</span>}
                                {isMonopoly && <span>👑</span>}
                                <span>✅</span>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center text-gray-400 text-xs">
                              Chưa sở hữu
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Instructions */}
        <motion.div 
          className="text-xs text-gray-500 text-center bg-gray-50 p-3 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          💡 Nhấp vào thẻ bất động sản đã sở hữu để xem chi tiết<br />
          👑 Độc quyền = sở hữu tất cả BĐS cùng màu<br />
          🏦 = Đã thế chấp
        </motion.div>
      </div>
    </Modal>
  );
};