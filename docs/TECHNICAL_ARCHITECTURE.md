# CryptoMafia Technical Architecture

## System Overview

CryptoMafia is built as a Tauri desktop application with a Rust backend for game logic and a React frontend for the user interface.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │   Views     │ │ Components  │ │    State Management     │ │
│  │             │ │             │ │                         │ │
│  │ • MainMenu  │ │ • CardComp  │ │ • GameContext           │ │
│  │ • GameBoard │ │ • ScoreDisp │ │ • useGameState          │ │
│  │ • Shop      │ │ • NavHeader │ │ • Local Storage         │ │
│  │ • Settings  │ │ • Modal     │ │                         │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ Tauri Commands
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Rust)                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │  Game Logic │ │ Card System │ │      Persistence        │ │
│  │             │ │             │ │                         │ │
│  │ • GameState │ │ • Card      │ │ • Save/Load System      │ │
│  │ • Player    │ │ • Deck      │ │ • JSON Storage          │ │
│  │ • Round     │ │ • Effects   │ │ • Settings Storage      │ │
│  │ • Scoring   │ │ • Synergies │ │                         │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Backend Architecture (Rust)

### Module Structure
```
src-tauri/src/
├── main.rs              # Tauri app entry point
├── lib.rs               # Library exports and setup
├── commands/            # Tauri command handlers
│   ├── mod.rs
│   ├── game.rs         # Game state commands
│   ├── cards.rs        # Card operation commands
│   └── persistence.rs  # Save/load commands
├── game/               # Core game logic
│   ├── mod.rs
│   ├── state.rs        # GameState management
│   ├── player.rs       # Player data and progression
│   ├── round.rs        # Round logic and scoring
│   └── effects.rs      # Card effects and synergies
├── cards/              # Card system
│   ├── mod.rs
│   ├── card.rs         # Card data structure
│   ├── deck.rs         # Deck management
│   ├── synergies.rs    # Synergy system
│   └── effects.rs      # Effect implementations
├── persistence/        # Data persistence
│   ├── mod.rs
│   ├── save_game.rs    # Game save/load
│   └── settings.rs     # Settings persistence
└── types/              # Shared type definitions
    ├── mod.rs
    ├── card_types.rs   # Card-related types
    ├── game_types.rs   # Game state types
    └── errors.rs       # Error types
```

### Key Rust Types

```rust
// Core game state
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GameState {
    pub id: Uuid,
    pub player: PlayerState,
    pub current_round: RoundState,
    pub deck: Deck,
    pub hand: Vec<Card>,
    pub score: CryptoScore,
    pub shop: ShopState,
    pub settings: GameSettings,
}

// Player progression
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PlayerState {
    pub level: u32,
    pub experience: u32,
    pub unlocked_cards: HashSet<CardId>,
    pub achievements: Vec<Achievement>,
    pub statistics: PlayerStats,
}

// Card system
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Card {
    pub id: CardId,
    pub name: String,
    pub card_type: CardType,
    pub rarity: Rarity,
    pub base_points: Option<u32>,
    pub cost: Option<u32>,
    pub synergies: Vec<Synergy>,
    pub effects: Vec<Effect>,
    pub flavor_text: String,
    pub image_path: Option<String>,
}

// Scoring system
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CryptoScore {
    pub cw3_points: u32,
    pub crymp_currency: u32,
    pub multipliers: Vec<Multiplier>,
    pub round_target: u32,
}
```

### Tauri Commands

```rust
// Game state management
#[tauri::command]
pub async fn new_game(settings: GameSettings) -> Result<GameState, GameError> {
    // Initialize new game
}

#[tauri::command]
pub async fn load_game(save_id: String) -> Result<GameState, GameError> {
    // Load existing game
}

#[tauri::command]
pub async fn save_game(state: GameState) -> Result<(), GameError> {
    // Save current game state
}

// Card operations
#[tauri::command]
pub async fn play_card(card_id: CardId, state: GameState) -> Result<GameState, GameError> {
    // Play a card and update state
}

#[tauri::command]
pub async fn buy_card(card_id: CardId, state: GameState) -> Result<GameState, GameError> {
    // Purchase card from shop
}

// Round management
#[tauri::command]
pub async fn end_round(state: GameState) -> Result<RoundResult, GameError> {
    // Process end of round
}
```

## Frontend Architecture (React + TypeScript)

### Directory Structure
```
frontend/src/
├── main.tsx             # React app entry point
├── App.tsx              # Main app component
├── types/               # TypeScript type definitions
│   ├── index.ts
│   ├── game.ts          # Game state types
│   ├── card.ts          # Card types
│   └── ui.ts            # UI-specific types
├── components/          # Reusable UI components
│   ├── common/          # Shared components
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   └── LoadingSpinner.tsx
│   ├── cards/           # Card-related components
│   │   ├── Card.tsx
│   │   ├── CardHand.tsx
│   │   └── CardGrid.tsx
│   ├── game/            # Game-specific components
│   │   ├── ScoreDisplay.tsx
│   │   ├── RoundInfo.tsx
│   │   └── EffectsPanel.tsx
│   └── layout/          # Layout components
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Layout.tsx
├── views/               # Main screen components
│   ├── MainMenu.tsx
│   ├── GameSetup.tsx
│   ├── GameBoard.tsx
│   ├── Shop.tsx
│   ├── BossFight.tsx
│   ├── Rewards.tsx
│   ├── DeckManager.tsx
│   └── Settings.tsx
├── hooks/               # Custom React hooks
│   ├── useGameState.ts  # Game state management
│   ├── useCards.ts      # Card operations
│   ├── usePersistence.ts # Save/load operations
│   └── useSettings.ts   # Settings management
├── services/            # Tauri API services
│   ├── gameService.ts   # Game state API calls
│   ├── cardService.ts   # Card operation API calls
│   └── persistenceService.ts # Save/load API calls
├── context/             # React contexts
│   ├── GameContext.tsx  # Global game state
│   ├── ThemeContext.tsx # UI theming
│   └── SettingsContext.tsx # App settings
├── utils/               # Utility functions
│   ├── cardUtils.ts     # Card-related utilities
│   ├── scoreUtils.ts    # Scoring calculations
│   └── validators.ts    # Input validation
└── assets/              # Static assets
    ├── images/
    ├── sounds/
    └── styles/
        ├── globals.css
        └── components.css
```

### State Management Strategy

#### Global State (React Context)
```typescript
interface GameContextType {
  gameState: GameState | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  startNewGame: (settings: GameSettings) => Promise<void>;
  loadGame: (saveId: string) => Promise<void>;
  saveGame: () => Promise<void>;
  playCard: (cardId: string) => Promise<void>;
  buyCard: (cardId: string) => Promise<void>;
  endRound: () => Promise<void>;
}
```

#### Local State (Component Level)
- UI state (modals, selections, animations)
- Form data (temporary input values)
- Component-specific loading states

### Service Layer Pattern

```typescript
// services/gameService.ts
export class GameService {
  static async newGame(settings: GameSettings): Promise<GameState> {
    return await invoke('new_game', { settings });
  }
  
  static async loadGame(saveId: string): Promise<GameState> {
    return await invoke('load_game', { saveId });
  }
  
  static async playCard(cardId: string, state: GameState): Promise<GameState> {
    return await invoke('play_card', { cardId, state });
  }
}
```

## Data Flow Architecture

### Command Flow
```
User Action → Component → Hook → Service → Tauri Command → Rust Handler → Response
    ↓
UI Update ← Context ← Hook ← Service ← Tauri Response ← Rust Handler ← Database
```

### State Synchronization
- **Single Source of Truth**: Rust backend holds authoritative game state
- **Frontend Caching**: React context caches state for UI responsiveness
- **Optimistic Updates**: UI updates immediately, rolls back on error
- **Persistence**: Automatic save on state changes

## Error Handling Strategy

### Rust Backend
```rust
#[derive(Debug, thiserror::Error)]
pub enum GameError {
    #[error("Invalid card operation: {0}")]
    InvalidCard(String),
    
    #[error("Insufficient currency: needed {needed}, have {have}")]
    InsufficientCurrency { needed: u32, have: u32 },
    
    #[error("Save/load error: {0}")]
    Persistence(#[from] std::io::Error),
    
    #[error("Game state error: {0}")]
    InvalidState(String),
}
```

### Frontend Error Boundaries
- Global error boundary for unexpected crashes
- Feature-specific error boundaries for graceful degradation
- User-friendly error messages with recovery options

## Performance Considerations

### Backend Optimizations
- **Efficient Data Structures**: Use appropriate collections (HashMap, Vec, etc.)
- **Minimal Serialization**: Only serialize data that crosses the bridge
- **Lazy Loading**: Load card assets and data on demand
- **Caching**: Cache frequently accessed game data

### Frontend Optimizations
- **Component Memoization**: React.memo for expensive components
- **Virtual Scrolling**: For large card collections
- **Image Lazy Loading**: Load card images on demand
- **Bundle Splitting**: Code splitting for different screens

## Security Considerations

### Data Validation
- Validate all inputs from frontend in Rust backend
- Sanitize user-generated content (if any)
- Implement rate limiting for expensive operations

### Save Game Integrity
- Checksum validation for save files
- Encryption for sensitive game data (if needed)
- Backup and recovery mechanisms

## Testing Strategy

### Backend Testing (Rust)
```rust
#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_card_play_logic() {
        // Test card playing mechanics
    }
    
    #[test]
    fn test_scoring_system() {
        // Test scoring calculations
    }
}
```

### Frontend Testing (Jest + React Testing Library)
```typescript
describe('GameBoard', () => {
  test('renders current game state', () => {
    // Test component rendering
  });
  
  test('handles card play interactions', () => {
    // Test user interactions
  });
});
```

### Integration Testing
- End-to-end game flow testing
- Tauri command integration tests
- Save/load system validation

This architecture ensures clean separation of concerns, maintainable code, and optimal performance for the desktop gaming experience.