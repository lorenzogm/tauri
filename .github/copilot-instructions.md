# GitHub Copilot Instructions for Cryptomafia

## Project Overview

**Cryptomafia** is a satirical roguelike deckbuilder Web3 game inspired by *Balatro*. Players take on the role of a crypto-mafia boss navigating the Web3 ecosystem through strategic card play, market manipulation, and avoiding regulators.

### Core Concept
- **Genre**: Roguelike Deckbuilder with satirical crypto theme
- **Inspiration**: Balatro, Slay the Spire, Poker Roguelikes
- **Theme**: Crypto/Web3 mafia satire with cryptobros as characters
- **Focus**: Strategic card combinations and synergies, not visual simulation

## Technology Stack

### Architecture
- **Framework**: Tauri (Desktop app with web frontend)
- **Backend**: Rust (game logic, state management, persistence)
- **Frontend**: React (UI, card interactions, animations)
- **Persistence**: JSON or SQLite for progression, decks, unlocks
- **Platform**: Desktop (PC, Mac, Linux), potential Web deployment

### Directory Structure
```
/cryptomafia
├── src-tauri/             # Rust backend (game engine)
│   ├── src/
│   │   ├── main.rs        # Tauri app entry point
│   │   ├── game/          # Core game logic
│   │   ├── cards/         # Card system and mechanics
│   │   ├── player/        # Player state and progression
│   │   └── persistence/   # Save/load system
├── ui/                    # Frontend web interface
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── views/         # Game screens and layouts
│   │   ├── state/         # Frontend state management
│   │   └── assets/        # Images, sounds, styles
├── cards/                 # Card definitions (JSON/YAML)
├── .github/               # GitHub workflows and configs
└── docs/                  # Documentation and design docs
```

## Game Systems and Mechanics

### Core Loop
```
Inicio → Mazo inicial → Rondas (Blinds) → Tienda → Mejora mazo → Jefes → Recompensas
```

### Resources and Currencies
- **$CW3** (Crypto Web3 points): Primary scoring currency to pass rounds
- **$CRYMP**: Shop currency for buying/upgrading cards between rounds

### Round Structure
- **Small Blind**: Easy rounds requiring minimum $CW3 score
- **Big Blind**: Medium difficulty rounds
- **Boss**: Hard rounds with special mechanics and rewards

### Card Types and Systems

#### Card Categories
1. **Tokens**: Playable cards that generate $CW3 points (cryptocurrencies, assets)
2. **Jokers/Comodines**: Passive modifiers that change rules or boost combos
3. **Tools/Herramientas**: One-time effects or deck management utilities
4. **Traps/Trampas**: High-risk cards with negative or conditional effects
5. **Events/Eventos**: Game state modifiers (regulation, crashes, hacks)

#### Card Properties
```typescript
interface Card {
  id: string;
  name: string;
  type: 'token' | 'joker' | 'tool' | 'trap' | 'event';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  cost?: number;
  basePoints?: number;
  effect?: string;
  synergies?: string[];
  conditions?: string[];
}
```

#### Synergy Categories
- **Influencer**: Social media manipulation and hype
- **Trader**: Market analysis and trading bots
- **DAO**: Decentralized governance and collective schemes
- **Memecoin**: Viral tokens and community-driven assets
- **DeFi**: Decentralized finance protocols and yield farming
- **NFT**: Non-fungible tokens and digital collectibles
- **Scammer**: Rug pulls, exit scams, and fraudulent schemes

## Coding Conventions and Patterns

### Rust Backend (src-tauri/)

#### Naming Conventions
- Use `snake_case` for functions, variables, and modules
- Use `PascalCase` for structs, enums, and traits
- Prefix game entities with descriptive terms: `GameState`, `CardEngine`, `PlayerData`
- Use crypto/gaming terminology: `hodl_duration`, `pump_multiplier`, `rug_pull_chance`

#### Key Structures
```rust
// Game state management
pub struct GameState {
    pub current_round: RoundType,
    pub player: PlayerState,
    pub deck: Deck,
    pub hand: Vec<Card>,
    pub score: CryptoScore,
}

// Card system
pub struct Card {
    pub id: CardId,
    pub card_type: CardType,
    pub synergies: Vec<Synergy>,
    pub effects: Vec<Effect>,
}

// Scoring system
pub struct CryptoScore {
    pub cw3_points: u32,
    pub crymp_currency: u32,
    pub multipliers: Vec<Multiplier>,
}
```

#### Error Handling
- Use `Result<T, GameError>` for all game operations
- Create specific error types: `CardError`, `DeckError`, `ScoreError`
- Log errors with context using appropriate logging levels

### Frontend (ui/)

#### Component Structure
- Use functional components with hooks
- Separate game logic from UI logic
- Create reusable card components: `<TokenCard>`, `<JokerCard>`, `<ShopCard>`
- Implement drag-and-drop for card interactions

#### State Management
```typescript
interface GameState {
  round: RoundType;
  player: PlayerState;
  deck: Card[];
  hand: Card[];
  score: {
    cw3: number;
    crymp: number;
  };
  shop: ShopState;
}
```

#### Styling Guidelines
- Use Tailwind CSS for styling
- Implement dark theme with crypto-inspired color palette
- Gold/yellow for currency, red for dangerous cards, green for beneficial effects
- Neon accents for Web3/cyber aesthetic

## Game Content Guidelines

### Satirical Tone
- Parody crypto culture and Web3 hype
- Reference real crypto events, memes, and personalities (legally safe)
- Balance humor with engaging gameplay
- Avoid offensive content while maintaining satirical edge

### Card Design Philosophy
- Each card should have clear mechanical purpose
- Synergies should encourage deck building strategies
- Risk/reward balance for high-power effects
- Thematic consistency with crypto/mafia setting

### Terminology and Flavor Text
- Use crypto slang: "HODL", "diamond hands", "paper hands", "aping in"
- Mafia references: "family", "protection", "territory", "respect"
- Web3 terms: "DeFi", "yield farming", "liquidity", "smart contracts"
- Satirical names: "Ponzi Scheme", "Exit Scam", "Rug Pull", "Whale Manipulation"

## Development Guidelines

### Code Organization
- Keep game logic in Rust backend for performance and consistency
- Use Tauri commands for frontend-backend communication
- Implement proper error boundaries and loading states
- Cache game data appropriately to avoid unnecessary calculations

### Testing Strategy
- Unit tests for card mechanics and scoring
- Integration tests for game flow and state transitions
- Snapshot tests for UI components
- Performance tests for large deck operations

### Performance Considerations
- Optimize card rendering for large hands/decks
- Use efficient algorithms for synergy calculations
- Implement proper memory management for game assets
- Consider lazy loading for card images and animations

### Accessibility
- Ensure keyboard navigation for all game functions
- Provide screen reader support for card descriptions
- Implement colorblind-friendly design
- Support various input methods (mouse, touch, keyboard)

## Example Card Implementations

### Token Card Example
```rust
Card {
    id: "doge_classic",
    name: "DOGE Classic",
    card_type: CardType::Token,
    base_points: 30,
    synergies: vec![Synergy::Memecoin, Synergy::Influencer],
    effect: Some("Gains +5 points for each Influencer card played this round"),
    flavor_text: "Much wow, very gains, such profit!",
}
```

### Joker Card Example
```rust
Card {
    id: "elon_simp",
    name: "Elon Simp",
    card_type: CardType::Joker,
    rarity: Rarity::Rare,
    effect: Some("Doubles the effect of all Memecoin cards"),
    flavor_text: "Will defend daddy Elon's tweets at any cost",
}
```

## Asset Guidelines

### Visual Style
- Pixel art or clean vector graphics
- Dark theme with neon highlights
- Crypto symbols and mafia iconography
- Card frames that reflect rarity and type

### Audio Design
- Retro gaming sound effects
- Subtle background music with electronic/synthwave elements
- Satisfying card play and scoring sounds
- Voice lines for major events (optional)

## Localization Considerations
- Keep satirical references translatable or explain cultural context
- Provide glossary for crypto terms in different languages
- Consider regional differences in crypto culture and regulation themes

Remember: This is a satirical game that should be fun and engaging while poking fun at crypto culture. Keep the tone light-hearted despite the "mafia" theme, and focus on strategic gameplay over shock value.