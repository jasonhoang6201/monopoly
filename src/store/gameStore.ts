import { create } from 'zustand';
import { GameState, Player, GamePhase, PlayerColor } from '../types';
import { createBoard } from '../lib/board';
import { chanceCards, communityChestCards } from '../lib/data';

interface GameStore extends GameState {
  // Modal states
  showPropertyPurchaseModal: boolean;
  showAuctionModal: boolean;
  showChanceModal: boolean;
  showCommunityChestModal: boolean;
  currentCard: string | null;
  
  // Animation states
  isAnimatingMovement: boolean;
  animatingPlayerId: string | null;
  animationCurrentPosition: number;
  animationTargetPosition: number;
  animationStepsRemaining: number;
  
  // Actions
  initializeGame: (playerNames: string[]) => void;
  rollDice: () => void;
  movePlayer: (steps: number) => void;
  animatePlayerMovement: (playerId: string, fromPosition: number, toPosition: number, steps: number) => void;
  stepPlayerAnimation: () => void;
  buyProperty: () => void;
  declineProperty: () => void;
  endTurn: () => void;
  setPhase: (phase: GamePhase) => void;
  
  // Modal actions
  setShowPropertyPurchaseModal: (show: boolean) => void;
  setShowAuctionModal: (show: boolean) => void;
  setShowChanceModal: (show: boolean, card?: string) => void;
  setShowCommunityChestModal: (show: boolean, card?: string) => void;
}

const createPlayer = (id: string, name: string, color: PlayerColor): Player => ({
  id,
  name,
  color,
  position: 0,
  money: 2000,
  properties: [],
  jailTurns: 0,
  isInJail: false,
  isBankrupt: false,
  getOutOfJailFreeCards: 0
});

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  players: [],
  currentPlayer: 0,
  phase: GamePhase.SETUP,
  board: createBoard(),
  communityChest: shuffleArray(communityChestCards),
  chance: shuffleArray(chanceCards),
  diceValues: [1, 1],
  turnCount: 0,
  doublesCount: 0,
  housesRemaining: 32,
  hotelsRemaining: 12,
  
  // Modal states
  showPropertyPurchaseModal: false,
  showAuctionModal: false,
  showChanceModal: false,
  showCommunityChestModal: false,
  currentCard: null,
  
  // Animation states
  isAnimatingMovement: false,
  animatingPlayerId: null,
  animationCurrentPosition: 0,
  animationTargetPosition: 0,
  animationStepsRemaining: 0,

  // Actions
  initializeGame: (playerNames: string[]) => {
    const colors = [PlayerColor.RED, PlayerColor.BLUE, PlayerColor.GREEN, PlayerColor.YELLOW];
    const players = playerNames.map((name, index) => 
      createPlayer(`player_${index}`, name, colors[index])
    );

    set({
      players,
      currentPlayer: 0,
      phase: GamePhase.ROLLING,
      turnCount: 0,
      doublesCount: 0,
      board: createBoard(),
      communityChest: shuffleArray(communityChestCards),
      chance: shuffleArray(chanceCards)
    });
  },

  rollDice: () => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const isDoubles = dice1 === dice2;
    const state = get();
    
    let newDoublesCount = isDoubles ? state.doublesCount + 1 : 0;
    
    // Three doubles in a row = go to jail
    if (newDoublesCount === 3) {
      const players = [...state.players];
      players[state.currentPlayer] = {
        ...players[state.currentPlayer],
        position: 10, // Jail position
        isInJail: true,
        jailTurns: 0
      };
      
      set({
        diceValues: [dice1, dice2],
        doublesCount: 0,
        players,
        phase: GamePhase.ACTION
      });
      return;
    }
    
    set({
      diceValues: [dice1, dice2],
      doublesCount: newDoublesCount,
      phase: GamePhase.MOVING
    });
    
    // Auto-move player
    get().movePlayer(dice1 + dice2);
  },

  movePlayer: (steps: number) => {
    const state = get();
    const currentPlayerData = state.players[state.currentPlayer];
    const fromPosition = currentPlayerData.position;
    const toPosition = (fromPosition + steps) % 40;
    
    // Start animation instead of immediately moving
    get().animatePlayerMovement(currentPlayerData.id, fromPosition, toPosition, steps);
  },

  animatePlayerMovement: (playerId: string, fromPosition: number, toPosition: number, steps: number) => {
    set({
      isAnimatingMovement: true,
      animatingPlayerId: playerId,
      animationCurrentPosition: fromPosition,
      animationTargetPosition: toPosition,
      animationStepsRemaining: steps,
      phase: GamePhase.MOVING
    });
    
    // Start the animation loop
    get().stepPlayerAnimation();
  },

  stepPlayerAnimation: () => {
    const state = get();
    
    if (!state.isAnimatingMovement || state.animationStepsRemaining <= 0) {
      // Animation complete - finalize movement
      const currentPlayerData = state.players[state.currentPlayer];
      const newPosition = state.animationTargetPosition;
      
      // Check if player passed GO
      const passedGo = newPosition < currentPlayerData.position;
      const goBonus = passedGo ? 200 : 0;
      
      const players = [...state.players];
      players[state.currentPlayer] = {
        ...currentPlayerData,
        position: newPosition,
        money: currentPlayerData.money + goBonus
      };
      
      set({
        players,
        isAnimatingMovement: false,
        animatingPlayerId: null,
        phase: GamePhase.ACTION
      });
      
      // Check what the player landed on
      const currentSquare = state.board[newPosition];
      
      // If it's an unowned property, show purchase modal
      if (currentSquare.property && !currentSquare.property.owner) {
        set({ showPropertyPurchaseModal: true });
      }
      
      return;
    }
    
    // Move one step forward
    const nextPosition = (state.animationCurrentPosition + 1) % 40;
    const players = [...state.players];
    const playerIndex = state.players.findIndex(p => p.id === state.animatingPlayerId);
    
    if (playerIndex !== -1) {
      players[playerIndex] = {
        ...players[playerIndex],
        position: nextPosition
      };
    }
    
    set({
      players,
      animationCurrentPosition: nextPosition,
      animationStepsRemaining: state.animationStepsRemaining - 1
    });
    
    // Continue animation after a delay
    setTimeout(() => {
      get().stepPlayerAnimation();
    }, 300); // 300ms delay between steps
  },

  buyProperty: () => {
    const state = get();
    const currentPlayerData = state.players[state.currentPlayer];
    const currentSquare = state.board[currentPlayerData.position];
    
    if (!currentSquare.property || currentSquare.property.owner) return;
    
    const property = currentSquare.property;
    
    if (currentPlayerData.money < property.price) return;
    
    // Update player
    const players = [...state.players];
    players[state.currentPlayer] = {
      ...currentPlayerData,
      money: currentPlayerData.money - property.price,
      properties: [...currentPlayerData.properties, { ...property, owner: currentPlayerData.id }]
    };
    
    // Update board
    const board = [...state.board];
    board[currentPlayerData.position] = {
      ...currentSquare,
      property: { ...property, owner: currentPlayerData.id }
    };
    
    set({ 
      players, 
      board,
      showPropertyPurchaseModal: false
    });
  },

  declineProperty: () => {
    set({ 
      showPropertyPurchaseModal: false,
      showAuctionModal: true
    });
  },

  endTurn: () => {
    const state = get();
    const isDoubles = state.diceValues[0] === state.diceValues[1];
    
    // If player rolled doubles and not in jail, they get another turn
    if (isDoubles && !state.players[state.currentPlayer].isInJail && state.doublesCount < 3) {
      set({ phase: GamePhase.ROLLING });
      return;
    }
    
    // Move to next player
    const nextPlayer = (state.currentPlayer + 1) % state.players.length;
    set({
      currentPlayer: nextPlayer,
      phase: GamePhase.ROLLING,
      doublesCount: 0,
      turnCount: state.turnCount + 1
    });
  },

  setPhase: (phase: GamePhase) => {
    set({ phase });
  },
  
  // Modal actions
  setShowPropertyPurchaseModal: (show: boolean) => {
    set({ showPropertyPurchaseModal: show });
  },
  
  setShowAuctionModal: (show: boolean) => {
    set({ showAuctionModal: show });
  },
  
  setShowChanceModal: (show: boolean, card?: string) => {
    set({ 
      showChanceModal: show,
      currentCard: card || null
    });
  },
  
  setShowCommunityChestModal: (show: boolean, card?: string) => {
    set({ 
      showCommunityChestModal: show,
      currentCard: card || null
    });
  }
}));