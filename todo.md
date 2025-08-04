# Monopoly Game Development Roadmap

## Phase 1: Project Setup & Core Structure

- [ ] Initialize React + TypeScript project with Vite
- [ ] Set up project structure and folders
- [ ] Install dependencies (React, TypeScript, tailwind, framer motion, zustand )
- [ ] Create basic App component
- [ ] Set up TypeScript types and interfaces

## Phase 2: Game Data & Logic

- [ ] Create Vietnamese property data (28 properties across 8 color groups)
- [ ] Implement station data (4 stations with escalating rent)
- [ ] Create utility data (2 utilities with dice-based rent)
- [ ] Implement dice rolling system with doubles tracking
- [ ] Create player movement logic (40-square board)
- [ ] Implement basic game state management with housing limits
- [ ] Create Vietnamese card data (12 Chance + 12 Community Chest cards)
- [ ] Add special squares (GO, Jail, taxes, parking)

## Phase 3: Basic UI Components

- [ ] Design and implement game board layout
- [ ] Create player tokens and positioning
- [ ] Build property display cards
- [ ] Implement dice component
- [ ] Create player info panels
- [ ] Add current player indicator

## Phase 4: Core Game Mechanics

- [ ] Property buying system with auction fallback
- [ ] Rent collection system (base, monopoly, building levels)
- [ ] Money management ($2,000 starting, $200 GO salary)
- [ ] Turn management with doubles handling (max 3 = jail)
- [ ] Landing on special squares (GO, Jail, taxes, parking)
- [ ] Card drawing and effects with Vietnamese translations
- [ ] Income tax ($100 or 10% of worth) and luxury tax ($200)

## Phase 5: Advanced Features

- [ ] Property development (houses max 4, hotels 1 per property)
- [ ] Housing shortage system (32 houses, 12 hotels total)
- [ ] Even building rule across color groups
- [ ] Mortgage system (mortgage value + 10% to unmortgage)
- [ ] Auction system ($10 minimum, $10 increments)
- [ ] Trading between players (properties, money, jail cards)
- [ ] Jail mechanics ($50 fine, doubles, or free card)
- [ ] Bankruptcy handling with property liquidation

## Phase 6: Local Multiplayer Features

- [ ] Hot-seat gameplay (pass device between players)
- [ ] Player setup (names, colors, player count)
- [ ] Turn-based UI updates
- [ ] Game state persistence (localStorage)
- [ ] Pause/resume functionality

## Phase 7: Polish & UX

- [ ] Animations and transitions
- [ ] Sound effects (optional)
- [ ] Responsive design for different screen sizes
- [ ] Game history and log
- [ ] Settings and preferences
- [ ] Help/rules reference

## Phase 8: Testing & Optimization

- [ ] Unit tests for game logic
- [ ] Component testing
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Bug fixes and refinements

## Development Priority for Local Play

1. **Vietnamese Board Setup**: Create 40-square board with Vietnamese property names
2. **Core Game Loop**: Roll dice → Move → Take action → End turn (with doubles)
3. **Essential Mechanics**: Buy properties, pay rent, manage money ($2,000 start)
4. **Property System**: Color groups, monopolies, rent calculations
5. **Building System**: Houses (4 max) and hotels with shortage limits
6. **Player Management**: 2-4 players on same device with jail tracking
7. **Card System**: Vietnamese Chance and Community Chest cards
8. **UI/UX**: Clear turn indicators, property management, Vietnamese text
9. **Game Completion**: Win/lose conditions, bankruptcy with liquidation

## Technical Considerations for Local Play

- **State Management**: Use Zustand for complex game state with housing limits
- **Turn Management**: Clear visual indicators with doubles tracking
- **Property Management**: Color group monopoly detection and even building
- **Rent Calculation**: Dynamic rent based on ownership and development
- **Device Sharing**: Consider orientation lock, prevent accidental touches
- **Save/Load**: LocalStorage for game persistence with Vietnamese data
- **Responsive**: Works on tablets and larger phones
- **Localization**: Vietnamese property names and card text

## Assets Needed

- [ ] Vietnamese Monopoly board background
- [ ] Vietnamese city property images/icons (22 cities + 4 stations + 2 utilities)
- [ ] Player token images (car, hat, dog, etc.)
- [ ] Dice images/animations
- [ ] Vietnamese card backgrounds (Chance = Cơ Hội, Community Chest = Khí Vận)
- [ ] Vietnamese UI icons and buttons
- [ ] Color group indicators (Brown, Light Blue, Pink, Orange, Red, Yellow, Green, Dark Blue)
