# CryptoMafia User Flow and Screen Breakdown

## Complete User Flow Diagram

```
┌─────────────────┐
│   Main Menu     │ ← Entry Point
│                 │
│ • New Game      │
│ • Continue      │
│ • Settings      │
│ • Quit          │
└─────────┬───────┘
          │ [New Game]
          ▼
┌─────────────────┐
│  Game Setup     │
│                 │
│ • Select Deck   │
│ • Difficulty    │
│ • Tutorial      │
└─────────┬───────┘
          │ [Start Game]
          ▼
┌─────────────────┐     ┌─────────────────┐
│   Round Play    │────▶│   Shop Screen   │
│                 │     │                 │
│ • Play Cards    │     │ • Buy Cards     │
│ • Score Points  │     │ • Upgrade Deck  │
│ • Win/Lose      │     │ • View Stats    │
└─────────┬───────┘     └─────────┬───────┘
          │                       │
          │ [Boss Round]           │ [Continue]
          ▼                       │
┌─────────────────┐               │
│  Boss Fight     │               │
│                 │               │
│ • Special Rules │               │
│ • Harder Enemies│               │
│ • Better Rewards│               │
└─────────┬───────┘               │
          │                       │
          │ [Victory/Defeat]      │
          ▼                       │
┌─────────────────┐               │
│ Rewards Screen  │◀──────────────┘
│                 │
│ • Gain Cards    │
│ • Unlock Items  │
│ • Progress      │
└─────────┬───────┘
          │
          │ [Continue] ──┐
          │              │
          ▼              │
┌─────────────────┐      │
│ Deck Management │      │
│                 │      │
│ • View Deck     │      │
│ • Organize      │      │
│ • Remove Cards  │      │
└─────────┬───────┘      │
          │              │
          ▼              │
   [Back to Round] ──────┘
          │
   [Game Over] 
          │
          ▼
   [Back to Main Menu]
```

## Screen-by-Screen Breakdown

### 1. Main Menu (PR #4)
**Purpose**: Entry point and navigation hub
- **Components**: Title, menu buttons, background
- **Navigation**: New Game → Game Setup, Continue → Load Game, Settings → Settings Screen
- **State**: None (stateless)
- **Dependencies**: None

### 2. Game Setup (PR #5)  
**Purpose**: Initialize new game parameters
- **Components**: Deck selection, difficulty options, tutorial toggle
- **Navigation**: Start Game → Round Play
- **State**: Initial game configuration
- **Dependencies**: Game state types (PR #1)

### 3. Round Play (PR #6)
**Purpose**: Core gameplay - playing cards to score points
- **Components**: Hand display, play area, score tracker, round info
- **Navigation**: Round End → Shop OR Boss Fight
- **State**: Current game state, hand, score
- **Dependencies**: Game state (PR #2), card system (PR #1)

### 4. Shop (PR #7)
**Purpose**: Between-rounds card acquisition and deck building
- **Components**: Available cards, deck preview, currency display
- **Navigation**: Continue → Next Round Play
- **State**: Shop inventory, player currency, deck
- **Dependencies**: Game state (PR #2), card system (PR #1)

### 5. Boss Fight (PR #8)
**Purpose**: Special challenge rounds with unique mechanics
- **Components**: Boss display, special rules UI, enhanced effects
- **Navigation**: Victory/Defeat → Rewards
- **State**: Boss state, special rules, player state
- **Dependencies**: Round Play mechanics (PR #6)

### 6. Rewards (PR #9)
**Purpose**: Post-round/boss reward distribution and progression
- **Components**: Reward selection, progress indicators, statistics
- **Navigation**: Continue → Shop OR Deck Management
- **State**: Available rewards, player progression
- **Dependencies**: Game state (PR #2), progression system

### 7. Deck Management (PR #10)
**Purpose**: Comprehensive deck viewing and organization
- **Components**: Full deck view, card details, synergy analysis
- **Navigation**: Back → Previous screen (context-dependent)
- **State**: Player deck, card details
- **Dependencies**: Card system (PR #1), game state (PR #2)

### 8. Settings (PR #11)
**Purpose**: Game configuration and preferences
- **Components**: Audio/visual options, controls, save management
- **Navigation**: Back → Previous screen (available from anywhere)
- **State**: Game settings
- **Dependencies**: None (or minimal)

## Screen Dependencies and Development Order

### Dependency Graph
```
PR #1 (Types) ──┐
                ├─▶ PR #4 (Main Menu) ──┐
PR #2 (State) ──┘                       │
                                        ├─▶ PR #5 (Setup) ──▶ PR #6 (Round Play)
PR #3 (Design) ─────────────────────────┘                           │
                                                                     ├─▶ PR #7 (Shop)
                                                                     │
                                                                     ├─▶ PR #8 (Boss Fight)
                                                                     │
                                                                     ├─▶ PR #9 (Rewards)
                                                                     │
                                                                     ├─▶ PR #10 (Deck Mgmt)
                                                                     │
                                                                     └─▶ PR #11 (Settings)
```

### Critical Path
1. **Foundation** (PRs #1-3): Must be completed first
2. **Core Flow** (PRs #4-6): Main game loop screens
3. **Meta Screens** (PRs #7-9): Enhancement screens
4. **Utility Screens** (PRs #10-11): Management and configuration

## Component Reusability

### Shared Components (to be built in PR #3)
- **Card Component**: Used in Round Play, Shop, Deck Management
- **Score Display**: Used in Round Play, Shop, Rewards
- **Navigation Header**: Used across all screens
- **Modal/Dialog**: Used for confirmations and details
- **Button Components**: Consistent styling across all screens

### Screen-Specific Components
- **Hand Display**: Round Play only
- **Shop Grid**: Shop screen only
- **Boss Display**: Boss Fight only
- **Deck Grid**: Deck Management only
- **Settings Form**: Settings only

## Data Flow Between Screens

### Game State Persistence
```
Main Menu → Game Setup → [Game State Created]
   ↓
Round Play ↔ Game State ↔ Shop ↔ Boss Fight ↔ Rewards
   ↓
Deck Management ← Game State → Settings
```

### Navigation State
- **Router-based**: Each screen has its own route
- **Context Preservation**: Game state maintained across navigation
- **Modal Overlays**: Settings and Deck Management can be overlays

## Screen Size and Responsive Considerations

### Desktop-First Approach (Tauri)
- **Primary**: 1920x1080 and 1366x768
- **Minimum**: 1024x768
- **Card Layouts**: Grid-based with responsive columns
- **UI Scaling**: Relative units for different screen sizes

### Component Sizing
- **Cards**: Fixed aspect ratio, scalable size
- **Hand**: Horizontal scrolling for overflow
- **Modals**: Centered with max-width constraints
- **Navigation**: Fixed header/sidebar approach

This breakdown ensures each pull request has a clear scope and well-defined dependencies, making parallel development possible where appropriate.