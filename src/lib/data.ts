import { Property, PropertyGroup, SquareType, Card } from '../types';

export const properties: Property[] = [
  // Brown Group
  {
    id: 1,
    name: 'Lào Cai',
    type: SquareType.PROPERTY,
    price: 60,
    baseRent: 2,
    rentLevels: {
      monopoly: 4,
      oneHouse: 10,
      twoHouses: 30,
      threeHouses: 90,
      fourHouses: 160,
      hotel: 250
    },
    mortgageValue: 30,
    buildingCost: 50,
    colorGroup: PropertyGroup.BROWN,
    houses: 0,
    hotel: false,
    mortgaged: false
  },
  {
    id: 3,
    name: 'Lạng Sơn',
    type: SquareType.PROPERTY,
    price: 60,
    baseRent: 4,
    rentLevels: {
      monopoly: 8,
      oneHouse: 20,
      twoHouses: 60,
      threeHouses: 180,
      fourHouses: 320,
      hotel: 450
    },
    mortgageValue: 30,
    buildingCost: 50,
    colorGroup: PropertyGroup.BROWN,
    houses: 0,
    hotel: false,
    mortgaged: false
  },

  // Light Blue Group
  {
    id: 6,
    name: 'Phú Thọ',
    type: SquareType.PROPERTY,
    price: 100,
    baseRent: 6,
    rentLevels: {
      monopoly: 12,
      oneHouse: 30,
      twoHouses: 90,
      threeHouses: 270,
      fourHouses: 400,
      hotel: 550
    },
    mortgageValue: 50,
    buildingCost: 50,
    colorGroup: PropertyGroup.LIGHT_BLUE,
    houses: 0,
    hotel: false,
    mortgaged: false
  },
  {
    id: 8,
    name: 'Ninh Bình',
    type: SquareType.PROPERTY,
    price: 100,
    baseRent: 6,
    rentLevels: {
      monopoly: 12,
      oneHouse: 30,
      twoHouses: 90,
      threeHouses: 270,
      fourHouses: 400,
      hotel: 550
    },
    mortgageValue: 50,
    buildingCost: 50,
    colorGroup: PropertyGroup.LIGHT_BLUE,
    houses: 0,
    hotel: false,
    mortgaged: false
  },
  {
    id: 9,
    name: 'Hải Phòng',
    type: SquareType.PROPERTY,
    price: 120,
    baseRent: 8,
    rentLevels: {
      monopoly: 16,
      oneHouse: 40,
      twoHouses: 100,
      threeHouses: 300,
      fourHouses: 450,
      hotel: 600
    },
    mortgageValue: 60,
    buildingCost: 50,
    colorGroup: PropertyGroup.LIGHT_BLUE,
    houses: 0,
    hotel: false,
    mortgaged: false
  },

  // Pink Group
  {
    id: 11,
    name: 'Quảng Ninh',
    type: SquareType.PROPERTY,
    price: 140,
    baseRent: 10,
    rentLevels: {
      monopoly: 20,
      oneHouse: 50,
      twoHouses: 150,
      threeHouses: 450,
      fourHouses: 625,
      hotel: 750
    },
    mortgageValue: 70,
    buildingCost: 100,
    colorGroup: PropertyGroup.PINK,
    houses: 0,
    hotel: false,
    mortgaged: false
  },
  {
    id: 13,
    name: 'Thanh Hóa',
    type: SquareType.PROPERTY,
    price: 140,
    baseRent: 10,
    rentLevels: {
      monopoly: 20,
      oneHouse: 50,
      twoHouses: 150,
      threeHouses: 450,
      fourHouses: 625,
      hotel: 750
    },
    mortgageValue: 70,
    buildingCost: 100,
    colorGroup: PropertyGroup.PINK,
    houses: 0,
    hotel: false,
    mortgaged: false
  },
  {
    id: 14,
    name: 'Nghệ An',
    type: SquareType.PROPERTY,
    price: 160,
    baseRent: 12,
    rentLevels: {
      monopoly: 24,
      oneHouse: 60,
      twoHouses: 180,
      threeHouses: 500,
      fourHouses: 700,
      hotel: 900
    },
    mortgageValue: 80,
    buildingCost: 100,
    colorGroup: PropertyGroup.PINK,
    houses: 0,
    hotel: false,
    mortgaged: false
  },

  // Orange Group
  {
    id: 16,
    name: 'Quảng Bình',
    type: SquareType.PROPERTY,
    price: 180,
    baseRent: 14,
    rentLevels: {
      monopoly: 28,
      oneHouse: 70,
      twoHouses: 200,
      threeHouses: 550,
      fourHouses: 750,
      hotel: 950
    },
    mortgageValue: 90,
    buildingCost: 100,
    colorGroup: PropertyGroup.ORANGE,
    houses: 0,
    hotel: false,
    mortgaged: false
  },
  {
    id: 18,
    name: 'Thường Thiên Huế',
    type: SquareType.PROPERTY,
    price: 180,
    baseRent: 14,
    rentLevels: {
      monopoly: 28,
      oneHouse: 70,
      twoHouses: 200,
      threeHouses: 550,
      fourHouses: 750,
      hotel: 950
    },
    mortgageValue: 90,
    buildingCost: 100,
    colorGroup: PropertyGroup.ORANGE,
    houses: 0,
    hotel: false,
    mortgaged: false
  },
  {
    id: 19,
    name: 'Đà Nẵng',
    type: SquareType.PROPERTY,
    price: 200,
    baseRent: 16,
    rentLevels: {
      monopoly: 32,
      oneHouse: 80,
      twoHouses: 220,
      threeHouses: 600,
      fourHouses: 800,
      hotel: 1000
    },
    mortgageValue: 100,
    buildingCost: 100,
    colorGroup: PropertyGroup.ORANGE,
    houses: 0,
    hotel: false,
    mortgaged: false
  },

  // Red Group
  {
    id: 21,
    name: 'Quy Nhơn',
    type: SquareType.PROPERTY,
    price: 220,
    baseRent: 18,
    rentLevels: {
      monopoly: 36,
      oneHouse: 90,
      twoHouses: 250,
      threeHouses: 700,
      fourHouses: 875,
      hotel: 1050
    },
    mortgageValue: 110,
    buildingCost: 150,
    colorGroup: PropertyGroup.RED,
    houses: 0,
    hotel: false,
    mortgaged: false
  },
  {
    id: 23,
    name: 'Nha Trang',
    type: SquareType.PROPERTY,
    price: 220,
    baseRent: 18,
    rentLevels: {
      monopoly: 36,
      oneHouse: 90,
      twoHouses: 250,
      threeHouses: 700,
      fourHouses: 875,
      hotel: 1050
    },
    mortgageValue: 110,
    buildingCost: 150,
    colorGroup: PropertyGroup.RED,
    houses: 0,
    hotel: false,
    mortgaged: false
  },
  {
    id: 24,
    name: 'Đà Lạt',
    type: SquareType.PROPERTY,
    price: 240,
    baseRent: 20,
    rentLevels: {
      monopoly: 40,
      oneHouse: 100,
      twoHouses: 300,
      threeHouses: 750,
      fourHouses: 925,
      hotel: 1100
    },
    mortgageValue: 120,
    buildingCost: 150,
    colorGroup: PropertyGroup.RED,
    houses: 0,
    hotel: false,
    mortgaged: false
  },

  // Yellow Group
  {
    id: 26,
    name: 'Phan Thiết',
    type: SquareType.PROPERTY,
    price: 260,
    baseRent: 22,
    rentLevels: {
      monopoly: 44,
      oneHouse: 110,
      twoHouses: 330,
      threeHouses: 800,
      fourHouses: 975,
      hotel: 1150
    },
    mortgageValue: 130,
    buildingCost: 150,
    colorGroup: PropertyGroup.YELLOW,
    houses: 0,
    hotel: false,
    mortgaged: false
  },
  {
    id: 27,
    name: 'Vũng Tàu',
    type: SquareType.PROPERTY,
    price: 260,
    baseRent: 22,
    rentLevels: {
      monopoly: 44,
      oneHouse: 110,
      twoHouses: 330,
      threeHouses: 800,
      fourHouses: 975,
      hotel: 1150
    },
    mortgageValue: 130,
    buildingCost: 150,
    colorGroup: PropertyGroup.YELLOW,
    houses: 0,
    hotel: false,
    mortgaged: false
  },
  {
    id: 29,
    name: 'Bình Dương',
    type: SquareType.PROPERTY,
    price: 280,
    baseRent: 24,
    rentLevels: {
      monopoly: 48,
      oneHouse: 120,
      twoHouses: 360,
      threeHouses: 850,
      fourHouses: 1025,
      hotel: 1200
    },
    mortgageValue: 140,
    buildingCost: 150,
    colorGroup: PropertyGroup.YELLOW,
    houses: 0,
    hotel: false,
    mortgaged: false
  },

  // Green Group
  {
    id: 31,
    name: 'Cần Thơ',
    type: SquareType.PROPERTY,
    price: 300,
    baseRent: 26,
    rentLevels: {
      monopoly: 52,
      oneHouse: 130,
      twoHouses: 390,
      threeHouses: 900,
      fourHouses: 1100,
      hotel: 1250
    },
    mortgageValue: 150,
    buildingCost: 200,
    colorGroup: PropertyGroup.GREEN,
    houses: 0,
    hotel: false,
    mortgaged: false
  },
  {
    id: 32,
    name: 'Cà Mau',
    type: SquareType.PROPERTY,
    price: 300,
    baseRent: 26,
    rentLevels: {
      monopoly: 52,
      oneHouse: 130,
      twoHouses: 390,
      threeHouses: 900,
      fourHouses: 1100,
      hotel: 1250
    },
    mortgageValue: 150,
    buildingCost: 200,
    colorGroup: PropertyGroup.GREEN,
    houses: 0,
    hotel: false,
    mortgaged: false
  },
  {
    id: 34,
    name: 'Phú Quốc',
    type: SquareType.PROPERTY,
    price: 320,
    baseRent: 28,
    rentLevels: {
      monopoly: 56,
      oneHouse: 150,
      twoHouses: 450,
      threeHouses: 1000,
      fourHouses: 1200,
      hotel: 1400
    },
    mortgageValue: 160,
    buildingCost: 200,
    colorGroup: PropertyGroup.GREEN,
    houses: 0,
    hotel: false,
    mortgaged: false
  },

  // Dark Blue Group
  {
    id: 37,
    name: 'Hà Nội',
    type: SquareType.PROPERTY,
    price: 350,
    baseRent: 35,
    rentLevels: {
      monopoly: 70,
      oneHouse: 175,
      twoHouses: 500,
      threeHouses: 1100,
      fourHouses: 1300,
      hotel: 1500
    },
    mortgageValue: 175,
    buildingCost: 200,
    colorGroup: PropertyGroup.DARK_BLUE,
    houses: 0,
    hotel: false,
    mortgaged: false
  },
  {
    id: 39,
    name: 'Hồ Chí Minh',
    type: SquareType.PROPERTY,
    price: 400,
    baseRent: 50,
    rentLevels: {
      monopoly: 100,
      oneHouse: 200,
      twoHouses: 600,
      threeHouses: 1400,
      fourHouses: 1700,
      hotel: 2000
    },
    mortgageValue: 200,
    buildingCost: 200,
    colorGroup: PropertyGroup.DARK_BLUE,
    houses: 0,
    hotel: false,
    mortgaged: false
  },

  // Stations
  {
    id: 5,
    name: 'Ga Hà Nội',
    type: SquareType.STATION,
    price: 200,
    baseRent: 25,
    mortgageValue: 100,
    colorGroup: PropertyGroup.STATION,
    houses: 0,
    hotel: false,
    mortgaged: false
  },
  {
    id: 15,
    name: 'Sân Bay Nội Bài',
    type: SquareType.STATION,
    price: 200,
    baseRent: 25,
    mortgageValue: 100,
    colorGroup: PropertyGroup.STATION,
    houses: 0,
    hotel: false,
    mortgaged: false
  },
  {
    id: 25,
    name: 'Cảng Hải Phòng',
    type: SquareType.STATION,
    price: 200,
    baseRent: 25,
    mortgageValue: 100,
    colorGroup: PropertyGroup.STATION,
    houses: 0,
    hotel: false,
    mortgaged: false
  },
  {
    id: 35,
    name: 'Bến Xe Miền Đông',
    type: SquareType.STATION,
    price: 200,
    baseRent: 25,
    mortgageValue: 100,
    colorGroup: PropertyGroup.STATION,
    houses: 0,
    hotel: false,
    mortgaged: false
  },

  // Utilities
  {
    id: 12,
    name: 'Tập Đoàn Điện Lực',
    type: SquareType.UTILITY,
    price: 150,
    baseRent: 4,
    mortgageValue: 75,
    colorGroup: PropertyGroup.UTILITY,
    houses: 0,
    hotel: false,
    mortgaged: false
  },
  {
    id: 28,
    name: 'Thủy Điện Hòa Bình',
    type: SquareType.UTILITY,
    price: 150,
    baseRent: 4,
    mortgageValue: 75,
    colorGroup: PropertyGroup.UTILITY,
    houses: 0,
    hotel: false,
    mortgaged: false
  }
];

export const chanceCards: Card[] = [
  { id: 1, text: 'Đi đến/về ô Xuất phát +$200', action: 'move_to_go', value: 200 },
  { id: 2, text: 'Lấy 1 giấy khí vận', action: 'draw_community_chest' },
  { id: 3, text: 'Tiến 2 bước', action: 'move', value: 2 },
  { id: 4, text: 'Thưởng làm tăng ca +$50', action: 'collect', value: 50 },
  { id: 5, text: 'Lái xe quá tốc độ -$50', action: 'pay', value: 50 },
  { id: 6, text: 'Bắt được kẻ gian +$100', action: 'collect', value: 100 },
  { id: 7, text: 'VÀO TÙ (Không được nhận tiền)', action: 'go_to_jail' },
  { id: 8, text: 'Thẻ ra tù miễn phí (có thể giữ)', action: 'get_out_of_jail_free', keepCard: true },
  { id: 9, text: 'Đến ô bến xe gần nhất', action: 'move_to_nearest_station' },
  { id: 10, text: 'Trúng xổ số +$100', action: 'collect', value: 100 },
  { id: 11, text: 'Trả tiền học phí -$100', action: 'pay', value: 100 },
  { id: 12, text: 'Đi đến Đà lạt (nếu qua ô xuất phát +$200)', action: 'move_to_property', value: 24 }
];

export const communityChestCards: Card[] = [
  { id: 1, text: 'Nhận tiền phụ cấp +$25', action: 'collect', value: 25 },
  { id: 2, text: 'Hưởng di sản thừa kế +$200', action: 'collect', value: 200 },
  { id: 3, text: 'Tiền thưởng cuối năm +$100', action: 'collect', value: 100 },
  { id: 4, text: 'Hưởng lãi tiết kiệm +$500', action: 'collect', value: 500 },
  { id: 5, text: 'Trả tiền bảo hiểm -$25', action: 'pay', value: 25 },
  { id: 6, text: 'Lấy 1 giấy cơ hội', action: 'draw_chance' },
  { id: 7, text: 'VÀO TÙ (Không được nhận tiền)', action: 'go_to_jail' },
  { id: 8, text: 'Trả tiền bác sĩ -$50', action: 'pay', value: 50 },
  { id: 9, text: 'Thẻ ra tù miễn phí (có thể giữ)', action: 'get_out_of_jail_free', keepCard: true },
  { id: 10, text: 'Nhận quà sinh nhật (mỗi người $25)', action: 'collect_from_players', value: 25 },
  { id: 11, text: 'Đến ô bến xe gần nhất', action: 'move_to_nearest_station' },
  { id: 12, text: 'Trả tiền thuê nhà (mỗi căn $5)', action: 'pay_per_property', value: 5 }
];