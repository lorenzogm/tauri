// Core type definitions that match the Rust backend

export type CardId = string;

export const Rarity = {
  Common: "Common",
  Uncommon: "Uncommon", 
  Rare: "Rare",
  Epic: "Epic",
  Legendary: "Legendary",
} as const;
export type Rarity = typeof Rarity[keyof typeof Rarity];

export const CardType = {
  Token: "Token",
  Joker: "Joker", 
  Tool: "Tool",
  Trap: "Trap",
  Event: "Event",
} as const;
export type CardType = typeof CardType[keyof typeof CardType];

export const Synergy = {
  Influencer: "Influencer",
  Trader: "Trader",
  DAO: "DAO", 
  Memecoin: "Memecoin",
  DeFi: "DeFi",
  NFT: "NFT",
  Scammer: "Scammer",
} as const;
export type Synergy = typeof Synergy[keyof typeof Synergy];

export const EffectType = {
  AddPoints: "AddPoints",
  MultiplyPoints: "MultiplyPoints",
  AddCurrency: "AddCurrency", 
  DrawCards: "DrawCards",
  DiscardCards: "DiscardCards",
  ConditionalBonus: "ConditionalBonus",
  ModifyOtherCards: "ModifyOtherCards",
  GameStateChange: "GameStateChange",
} as const;
export type EffectType = typeof EffectType[keyof typeof EffectType];

export interface Effect {
  id: string;
  description: string;
  effect_type: EffectType;
  value?: number;
  condition?: string;
}

export interface Card {
  id: CardId;
  name: string;
  card_type: CardType;
  rarity: Rarity;
  base_points?: number;
  cost?: number;
  synergies: Synergy[];
  effects: Effect[];
  flavor_text: string;
  image_path?: string;
}

export interface Deck {
  cards: Card[];
  max_size: number;
}

export interface Multiplier {
  source: string;
  value: number;
  rounds_remaining?: number;
}

export interface CryptoScore {
  cw3_points: number;
  crymp_currency: number;
  multipliers: Multiplier[];
  round_target: number;
}

export const RoundType = {
  SmallBlind: "SmallBlind",
  BigBlind: "BigBlind", 
  Boss: "Boss",
} as const;
export type RoundType = typeof RoundType[keyof typeof RoundType];

export interface RoundState {
  round_type: RoundType;
  round_number: number;
  cards_played: CardId[];
  effects_active: string[];
}

export interface PlayerState {
  level: number;
  experience: number;
  total_games: number;
  wins: number;
  highest_score: number;
  unlocked_cards: CardId[];
}

export interface ShopState {
  available_cards: Card[];
  reroll_cost: number;
  rerolls_remaining: number;
}

export interface GameState {
  id: string;
  player: PlayerState;
  current_round: RoundState;
  deck: Deck;
  hand: Card[];
  score: CryptoScore;
  shop: ShopState;
  game_over: boolean;
  victory: boolean;
}

// Error types
export const GameErrorType = {
  InvalidCard: "InvalidCard",
  InsufficientCurrency: "InsufficientCurrency",
  DeckFull: "DeckFull", 
  CardNotFound: "CardNotFound",
  InvalidGameState: "InvalidGameState",
  SerializationError: "SerializationError",
  PersistenceError: "PersistenceError",
} as const;
export type GameErrorType = typeof GameErrorType[keyof typeof GameErrorType];

export interface GameError {
  error_type: GameErrorType;
  message: string;
  details?: Record<string, unknown>;
}

// Type guards for runtime checking
export const isCard = (obj: unknown): obj is Card => {
  return obj !== null && typeof obj === 'object' && obj !== undefined && 
         'id' in obj && typeof obj.id === 'string' && 
         'name' in obj && typeof obj.name === 'string' &&
         'card_type' in obj && Object.values(CardType).includes(obj.card_type as CardType) &&
         'rarity' in obj && Object.values(Rarity).includes(obj.rarity as Rarity);
};

export const isGameState = (obj: unknown): obj is GameState => {
  return obj !== null && typeof obj === 'object' && obj !== undefined &&
         'id' in obj && typeof obj.id === 'string' &&
         'player' in obj && 'current_round' in obj && 'deck' in obj && 
         'hand' in obj && Array.isArray(obj.hand) && 'score' in obj && 'shop' in obj;
};

export const isGameError = (obj: unknown): obj is GameError => {
  return obj !== null && typeof obj === 'object' && obj !== undefined &&
         'error_type' in obj && Object.values(GameErrorType).includes(obj.error_type as GameErrorType) &&
         'message' in obj && typeof obj.message === 'string';
};