import { BoardSquare, SquareType } from '../types';
import { properties } from './data';

export const createBoard = (): BoardSquare[] => {
  const board: BoardSquare[] = [];

  // Create all 40 squares in clockwise order
  const squares = [
    { id: 0, type: SquareType.GO, name: 'Xuất phát' },
    { id: 1, type: SquareType.PROPERTY, name: 'Lào Cai' },
    { id: 2, type: SquareType.COMMUNITY_CHEST, name: 'Khí Vận' },
    { id: 3, type: SquareType.PROPERTY, name: 'Lạng Sơn' },
    { id: 4, type: SquareType.TAX, name: 'Thuế Lợi Tức' },
    { id: 5, type: SquareType.STATION, name: 'Ga Hà Nội' },
    { id: 6, type: SquareType.PROPERTY, name: 'Phú Thọ' },
    { id: 7, type: SquareType.CHANCE, name: 'Cơ Hội' },
    { id: 8, type: SquareType.PROPERTY, name: 'Ninh Bình' },
    { id: 9, type: SquareType.PROPERTY, name: 'Hải Phòng' },
    { id: 10, type: SquareType.JAIL, name: 'Tù/Thăm Tù' },
    { id: 11, type: SquareType.PROPERTY, name: 'Quảng Ninh' },
    { id: 12, type: SquareType.UTILITY, name: 'Tập Đoàn Điện Lực' },
    { id: 13, type: SquareType.PROPERTY, name: 'Thanh Hóa' },
    { id: 14, type: SquareType.PROPERTY, name: 'Nghệ An' },
    { id: 15, type: SquareType.STATION, name: 'Sân Bay Nội Bài' },
    { id: 16, type: SquareType.PROPERTY, name: 'Quảng Bình' },
    { id: 17, type: SquareType.COMMUNITY_CHEST, name: 'Khí Vận' },
    { id: 18, type: SquareType.PROPERTY, name: 'Thường Thiên Huế' },
    { id: 19, type: SquareType.PROPERTY, name: 'Đà Nẵng' },
    { id: 20, type: SquareType.FREE_PARKING, name: 'Bãi Đậu Xe Miễn Phí' },
    { id: 21, type: SquareType.PROPERTY, name: 'Quy Nhơn' },
    { id: 22, type: SquareType.CHANCE, name: 'Cơ Hội' },
    { id: 23, type: SquareType.PROPERTY, name: 'Nha Trang' },
    { id: 24, type: SquareType.PROPERTY, name: 'Đà Lạt' },
    { id: 25, type: SquareType.STATION, name: 'Cảng Hải Phòng' },
    { id: 26, type: SquareType.PROPERTY, name: 'Phan Thiết' },
    { id: 27, type: SquareType.PROPERTY, name: 'Vũng Tàu' },
    { id: 28, type: SquareType.UTILITY, name: 'Thủy Điện Hòa Bình' },
    { id: 29, type: SquareType.PROPERTY, name: 'Bình Dương' },
    { id: 30, type: SquareType.GO_TO_JAIL, name: 'Vào Tù' },
    { id: 31, type: SquareType.PROPERTY, name: 'Cần Thơ' },
    { id: 32, type: SquareType.PROPERTY, name: 'Cà Mau' },
    { id: 33, type: SquareType.COMMUNITY_CHEST, name: 'Khí Vận' },
    { id: 34, type: SquareType.PROPERTY, name: 'Phú Quốc' },
    { id: 35, type: SquareType.STATION, name: 'Bến Xe Miền Đông' },
    { id: 36, type: SquareType.CHANCE, name: 'Cơ Hội' },
    { id: 37, type: SquareType.PROPERTY, name: 'Hà Nội' },
    { id: 38, type: SquareType.TAX, name: 'Thuế Giàu' },
    { id: 39, type: SquareType.PROPERTY, name: 'Hồ Chí Minh' }
  ];

  squares.forEach(square => {
    const property = properties.find(p => p.id === square.id);
    board.push({
      ...square,
      property
    });
  });

  return board;
};