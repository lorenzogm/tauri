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
- ✅ Android CI/CD pipeline for APK generation
- ✅ **Comprehensive CI/CD pipeline for quality assurance**
- 🚧 Ready for feature implementation

## 🔧 Development & CI/CD

The project includes a comprehensive CI/CD pipeline that ensures code quality and stable builds:

### Quality Assurance
- **Frontend**: ESLint, TypeScript checking, React best practices
- **Backend**: Rust formatting (`rustfmt`), linting (`clippy`), unit tests
- **Integration**: Full Tauri application build verification
- **Security**: Dependency auditing and vulnerability scanning

### Automated Workflows
- **PR Checks**: All pull requests are validated for quality and buildability
- **Main Branch Builds**: Comprehensive weekly builds with security audits
- **Android Releases**: Automated APK generation for tagged releases

📚 **See [CI/CD Documentation](docs/CI-CD.md) for complete details on the pipeline and quality standards.**

## 📱 Android Builds

The project supports building Android APK files with both automated CI/CD and local development options.

### Automated Builds
- **Tag releases**: Push a version tag (e.g., `v1.0.0`) to trigger an automatic APK build and GitHub release
- **Manual builds**: Use GitHub Actions "workflow_dispatch" to manually trigger a build

### Local Android Development
For local Android development and building:

1. **Quick Setup**: Run the automated setup script:
   ```bash
   ./scripts/android-setup.sh
   ```

2. **Manual Setup**: See [Android Setup Guide](docs/android-setup.md) for detailed instructions

3. **Build APK**:
   ```bash
   cd src-tauri
   tauri android init  # First time only
   tauri android build --apk --target aarch64
   ```

### Build Output
- APK files are generated in: `src-tauri/gen/android/app/build/outputs/apk/`
- Supports ARM64 (aarch64) Android devices
- Minimum Android SDK: 24 (Android 7.0)
- For CI builds, APKs are uploaded as artifacts and attached to GitHub releases

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

This project is proprietary software with all rights reserved. See the [LICENSE](LICENSE) file for complete terms and restrictions. 

**No sharing, no reuse, no copying permitted.**

---

*Remember: This is a satirical game that pokes fun at crypto culture while providing engaging strategic gameplay. Keep it light-hearted! 🚀*