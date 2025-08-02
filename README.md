# CryptoMafia

A satirical roguelike deckbuilder Web3 game inspired by *Balatro*. Players take on the role of a crypto-mafia boss navigating the Web3 ecosystem through strategic card play, market manipulation, and avoiding regulators.

## 🎮 Game Overview

- **Genre**: Roguelike Deckbuilder with satirical crypto theme
- **Inspiration**: Balatro, Slay the Spire, Poker Roguelikes  
- **Theme**: Crypto/Web3 mafia satire with cryptobros as characters
- **Platform**: Desktop (PC, Mac, Linux) via Tauri

## 🏗️ Architecture

- **Backend**: Rust (game logic, state management, persistence)
- **Frontend**: React + TypeScript (UI, animations, interactions)
- **Framework**: Tauri (desktop app with web frontend)
- **Styling**: Tailwind CSS with crypto-inspired dark theme

## 📋 Implementation Status

This project is currently in the planning phase. The implementation is broken down into focused pull requests following the user flow:

### 📖 Planning Documents
- [📋 Implementation Plan](docs/IMPLEMENTATION_PLAN.md) - Complete development roadmap
- [🔄 User Flow](docs/USER_FLOW.md) - Screen breakdown and navigation flow  
- [🏗️ Technical Architecture](docs/TECHNICAL_ARCHITECTURE.md) - System design and patterns
- [🃏 Card Design](docs/CARD_DESIGN.md) - Game mechanics and satirical card examples

### 🎯 Development Phases
1. **Foundation** (PRs #1-3): Core types, state management, design system
2. **Core Screens** (PRs #4-6): Main menu, game setup, gameplay board
3. **Meta Screens** (PRs #7-9): Shop, boss fights, rewards
4. **Enhanced Features** (PRs #10-11): Deck management, settings
5. **Polish** (PRs #12-13): Content implementation, balancing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Rust 1.77.2+
- System dependencies for Tauri (GTK on Linux, WebView2 on Windows)

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/lorenzogm/cryptomafia.git
   cd cryptomafia
   ```

2. **Install frontend dependencies**:
   ```bash
   cd frontend
   npm install
   ```

3. **Build frontend** (for development):
   ```bash
   npm run build
   ```

4. **Run Tauri development server**:
   ```bash
   cd ../src-tauri
   cargo tauri dev
   ```

### Current Status
- ✅ Basic Tauri + React setup
- ✅ Tailwind CSS configuration
- ✅ Project structure established
- ✅ Comprehensive planning documentation
- 🚧 Ready for feature implementation

## 🎨 Game Design

### Core Loop
```
Main Menu → Game Setup → Round Play → Shop → Boss Fight → Rewards → [Loop]
```

### Card Types
- **Tokens**: Generate $CW3 points (cryptocurrencies, assets)
- **Jokers**: Passive modifiers that change rules or boost combos
- **Tools**: One-time effects or deck management utilities  
- **Traps**: High-risk cards with negative or conditional effects
- **Events**: Game state modifiers (regulation, crashes, hacks)

### Synergy Categories
- **Influencer**: Social media manipulation and hype
- **Trader**: Market analysis and trading bots
- **DAO**: Decentralized governance schemes
- **Memecoin**: Viral tokens and community-driven assets
- **DeFi**: Protocols and yield farming
- **NFT**: Digital collectibles and speculation
- **Scammer**: Rug pulls, exit scams, fraudulent schemes

## 🤝 Contributing

This project follows a structured development approach with each feature implemented in focused pull requests. See the [Implementation Plan](docs/IMPLEMENTATION_PLAN.md) for details on how to contribute.

## 📄 License

[License information to be added]

---

*Remember: This is a satirical game that pokes fun at crypto culture while providing engaging strategic gameplay. Keep it light-hearted! 🚀*