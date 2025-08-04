# Monopoly Game - Technical Documentation

## Architecture Overview

### Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind
- **State Management**: Zustand
- **Testing**: Vitest + React Testing Library

### Project Structure

```
monopoly/
├── src/
│   ├── components/          # React components
│   │   ├── Board/
│   │   ├── Game/
│   │   ├── Player/
│   │   └── UI/
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Game engine and utilities
│   ├── store/              # State management
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Helper functions
│   └── App.tsx             # Main app component
├── public/
│   └── assets/             # Game assets
└── tests/                  # Test files
```

## Core Components

### 1. Game Engine (`src/lib/gameEngine.ts`)

- Game state management
- Turn processing
- Rule validation
- Event handling

### 2. Board Component (`src/components/Board/`)

- **BoardGrid**: Main board layout (CSS Grid)
- **Property**: Individual property squares
- **Corner**: Special corner squares (GO, Jail, etc.)
- **Center**: Board center with game info

### 3. Player Management (`src/components/Player/`)

- **PlayerToken**: Visual player representation
- **PlayerCard**: Player stats and properties
- **PlayerActions**: Available actions UI

### 4. Game Logic (`src/lib/`)

- **dice.ts**: Dice rolling mechanics
- **properties.ts**: Property data and utilities
- **cards.ts**: Chance and Community Chest cards
- **auction.ts**: Property auction system
- **mortgage.ts**: Property mortgage system

## Data Models

### Game State

```typescript
interface GameState {
  players: Player[];
  currentPlayer: number;
  phase: GamePhase;
  board: BoardSquare[];
  communityChest: Card[];
  chance: Card[];
  diceValues: [number, number];
  turnCount: number;
  doublesCount: number;
  housesRemaining: number; // Limited to 32
  hotelsRemaining: number; // Limited to 12
}
```

### Player

```typescript
interface Player {
  id: string;
  name: string;
  color: PlayerColor;
  position: number;
  money: number; // Starting: $2,000
  properties: Property[];
  jailTurns: number;
  isInJail: boolean;
  isBankrupt: boolean;
  getOutOfJailFreeCards: number;
}
```

### Property Groups

```typescript
enum PropertyGroup {
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
```

### Property

```typescript
interface Property {
  id: number;
  name: string;
  type: PropertyType;
  price: number;
  baseRent: number;
  rentLevels: {
    monopoly: number;
    oneHouse: number;
    twoHouses: number;
    threeHouses: number;
    fourHouses: number;
    hotel: number;
  };
  mortgageValue: number;
  buildingCost: number;
  colorGroup: PropertyGroup;
  owner?: string;
  houses: number;
  hotel: boolean;
  mortgaged: boolean;
}
```

## Game Flow

### Turn Sequence

1. Roll dice
2. Move player
3. Process square action
4. Handle special events
5. Player actions (buy, build, trade)
6. End turn

### Key Features

- **Vietnamese Properties**: 28 properties with Vietnamese city names across 8 color groups
- **Property Management**: Buy, sell, mortgage, unmortgage
- **Building System**: Houses (max 4) and hotels (1 per property)
- **Housing Limits**: 32 houses and 12 hotels total in game
- **Trading System**: Property and money exchanges between players
- **Auction System**: Property auctions when declined purchases
- **Card System**: 12 Chance and 12 Community Chest cards in Vietnamese
- **Jail Mechanics**: $50 fine, doubles, or Get Out of Jail Free card
- **Bankruptcy**: Player elimination when unable to pay debts
- **Station System**: 4 stations with escalating rent (1-4 owned)
- **Utility System**: 2 utilities with dice-based rent calculation

## Setup Commands

```bash
npm create vite@latest monopoly -- --template react-ts
cd monopoly
npm install
npm install zustand socket.io-client
npm run dev
```
