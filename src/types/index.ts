export enum PropertyGroup {
  BROWN = 'brown',
  LIGHT_BLUE = 'lightBlue',
  PINK = 'pink',
  ORANGE = 'orange',
  RED = 'red',
  YELLOW = 'yellow',
  GREEN = 'green',
  DARK_BLUE = 'darkBlue',
  STATION = 'station',
  UTILITY = 'utility'
}

export enum PlayerColor {
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow'
}

export enum GamePhase {
  SETUP = 'setup',
  ROLLING = 'rolling',
  MOVING = 'moving',
  ACTION = 'action',
  GAME_OVER = 'gameOver'
}

export enum SquareType {
  PROPERTY = 'property',
  STATION = 'station',
  UTILITY = 'utility',
  GO = 'go',
  JAIL = 'jail',
  FREE_PARKING = 'freeParking',
  GO_TO_JAIL = 'goToJail',
  TAX = 'tax',
  CHANCE = 'chance',
  COMMUNITY_CHEST = 'communityChest'
}

export interface RentLevels {
  monopoly: number;
  oneHouse: number;
  twoHouses: number;
  threeHouses: number;
  fourHouses: number;
  hotel: number;
}

export interface Property {
  id: number;
  name: string;
  type: SquareType;
  price: number;
  baseRent: number;
  rentLevels?: RentLevels;
  mortgageValue: number;
  buildingCost?: number;
  colorGroup: PropertyGroup;
  owner?: string;
  houses: number;
  hotel: boolean;
  mortgaged: boolean;
}

export interface Player {
  id: string;
  name: string;
  color: PlayerColor;
  position: number;
  money: number;
  properties: Property[];
  jailTurns: number;
  isInJail: boolean;
  isBankrupt: boolean;
  getOutOfJailFreeCards: number;
}

export interface BoardSquare {
  id: number;
  type: SquareType;
  name: string;
  property?: Property;
}

export interface Card {
  id: number;
  text: string;
  action: string;
  value?: number;
  keepCard?: boolean;
}

export interface GameState {
  players: Player[];
  currentPlayer: number;
  phase: GamePhase;
  board: BoardSquare[];
  communityChest: Card[];
  chance: Card[];
  diceValues: [number, number];
  turnCount: number;
  doublesCount: number;
  housesRemaining: number;
  hotelsRemaining: number;
  winner?: string;
}