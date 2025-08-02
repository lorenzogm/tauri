# CryptoMafia Implementation Plan

## Overview
This document outlines the development roadmap for CryptoMafia, a satirical roguelike deckbuilder Web3 game inspired by Balatro. The implementation is broken into focused pull requests following the user flow.

## Core Game Loop
```
Main Menu → Game Setup → Round Play → Shop → Round Play → Boss Fight → Rewards → [Loop or End]
```

## Phase 1: Foundation & Core Systems

### PR #1: Core Game Types and Data Structures
**Goal**: Establish the foundational data structures for the entire game

**Rust Backend (`src-tauri/src/`)**:
- `src/types/mod.rs` - Core type definitions
- `src/cards/mod.rs` - Card system implementation
- `src/game/mod.rs` - Game logic structures

**Key Structures**:
```rust
// Card system
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
}

pub enum CardType {
    Token,    // Generate $CW3 points
    Joker,    // Passive modifiers
    Tool,     // One-time effects
    Trap,     // High-risk cards
    Event,    // Game state modifiers
}

pub enum Synergy {
    Influencer,  // Social media manipulation
    Trader,      // Market analysis
    DAO,         // Decentralized governance
    Memecoin,    // Viral tokens
    DeFi,        // Decentralized finance
    NFT,         // Non-fungible tokens
    Scammer,     // Rug pulls and fraud
}

// Game state
pub struct GameState {
    pub current_round: RoundType,
    pub player: PlayerState,
    pub deck: Deck,
    pub hand: Vec<Card>,
    pub score: CryptoScore,
}

pub struct CryptoScore {
    pub cw3_points: u32,
    pub crymp_currency: u32,
    pub multipliers: Vec<Multiplier>,
}
```

**Frontend (`frontend/src/types/`)**:
- TypeScript interfaces matching Rust structures
- Type guards and validation helpers

### PR #2: Game State Management System
**Goal**: Implement state management between frontend and backend

**Implementation**:
- Tauri commands for state operations
- Frontend state management (React Context)
- Persistence layer (JSON save files)
- Error handling and logging

### PR #3: Design System and Theme Implementation
**Goal**: Create the visual foundation with crypto-inspired styling

**Implementation**:
- Tailwind configuration with custom crypto theme
- Dark theme with neon accents
- Color system: gold for currency, red for danger, green for benefits
- Base card component templates
- Typography and spacing system

## Phase 2: Core Screens (User Flow Order)

### PR #4: Main Menu Screen
**Path**: `frontend/src/views/MainMenu.tsx`

**Features**:
- Game title with crypto-mafia branding
- Navigation options: New Game, Continue, Settings, Quit
- Background with crypto/mafia aesthetic
- Basic routing setup

### PR #5: Game Setup/Initial Deck Screen
**Path**: `frontend/src/views/GameSetup.tsx`

**Features**:
- Starting deck selection
- Basic game parameters
- Tutorial integration
- Transition to first round

### PR #6: Game Board/Round Play Screen
**Path**: `frontend/src/views/GameBoard.tsx`

**Features**:
- Hand display and card interactions
- Score tracking ($CW3, $CRYMP)
- Round indicators (Small/Big Blind, Boss)
- Card play mechanics
- Effects resolution

## Phase 3: Meta-Game Screens

### PR #7: Shop Screen
**Path**: `frontend/src/views/Shop.tsx`

**Features**:
- Card purchasing with $CRYMP
- Deck preview
- Card upgrades
- Continue to next round

### PR #8: Boss Fight Screen
**Path**: `frontend/src/views/BossFight.tsx`

**Features**:
- Special boss mechanics
- Enhanced UI for boss encounters
- Unique challenge modifiers
- Boss-specific rewards

### PR #9: Rewards and Progression Screen
**Path**: `frontend/src/views/Rewards.tsx`

**Features**:
- Reward selection after rounds/bosses
- Progression tracking
- Statistics display
- Save game functionality

## Phase 4: Enhanced Features

### PR #10: Deck Management Screen
**Path**: `frontend/src/views/DeckManager.tsx`

**Features**:
- Comprehensive deck viewing
- Card organization and removal
- Synergy analysis
- Statistics and insights

### PR #11: Settings and Options Screen
**Path**: `frontend/src/views/Settings.tsx`

**Features**:
- Game preferences
- Audio/visual settings
- Accessibility options
- Save/load management

## Phase 5: Polish and Content

### PR #12: Card Content Implementation
**Goal**: Add satirical cards following the crypto/mafia theme

**Content Guidelines**:
- Satirical crypto references (HODL, diamond hands, rug pulls)
- Mafia terminology (family, protection, territory)
- Web3 parody (DeFi, yield farming, smart contracts)
- Balanced risk/reward mechanics

### PR #13: Game Balance and Testing
**Goal**: Final polish and optimization

**Implementation**:
- Difficulty progression
- Economy balancing
- Performance optimization
- Automated testing
- Bug fixes

## Development Guidelines

### Code Organization
- Keep game logic in Rust backend
- UI logic in React frontend
- Tauri commands for communication
- Proper error boundaries

### Testing Strategy
- Unit tests for card mechanics
- Integration tests for game flow
- UI component testing
- Performance testing

### Naming Conventions
- Rust: `snake_case` for functions, `PascalCase` for types
- TypeScript: `camelCase` for functions, `PascalCase` for components
- Crypto terminology where appropriate

### Asset Guidelines
- Dark theme with neon highlights
- Pixel art or clean vector graphics
- Crypto symbols and mafia iconography
- Colorblind-friendly design

## Dependencies to Add

### Rust (src-tauri/Cargo.toml)
```toml
[dependencies]
# Current dependencies...
sqlite = "0.30"           # For persistence
uuid = { version = "1.0", features = ["v4"] }  # For card IDs
rand = "0.8"              # For randomization
```

### Frontend (frontend/package.json)
```json
{
  "dependencies": {
    // Current dependencies...
    "@types/uuid": "^9.0.0",
    "react-router-dom": "^6.0.0",
    "react-dnd": "^16.0.0",
    "react-dnd-html5-backend": "^16.0.0"
  }
}
```

This implementation plan ensures each pull request is focused, independent, and follows the natural user flow through the game.