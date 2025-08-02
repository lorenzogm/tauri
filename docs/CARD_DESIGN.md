# CryptoMafia Card Design Document

## Card System Overview

Cards are the core gameplay mechanic in CryptoMafia. Each card represents a crypto/Web3 concept with satirical flavor and strategic gameplay value.

## Card Categories

### 1. Tokens (Generate $CW3 Points)
These are playable cards that generate the primary scoring currency.

**Examples:**

#### DOGE Classic
- **Type**: Token
- **Rarity**: Common
- **Base Points**: 30
- **Cost**: 5 $CRYMP
- **Synergies**: Memecoin, Influencer
- **Effect**: "Gains +5 points for each Influencer card played this round"
- **Flavor Text**: "Much wow, very gains, such profit!"

#### Bitcoin Maxi
- **Type**: Token  
- **Rarity**: Rare
- **Base Points**: 100
- **Cost**: 25 $CRYMP
- **Synergies**: Trader, HODLer
- **Effect**: "Cannot be affected by negative effects. +50 points if no other crypto tokens played this round"
- **Flavor Text**: "There is no second best. Orange coin good."

#### Shiba Inu CEO
- **Type**: Token
- **Rarity**: Uncommon
- **Base Points**: 40
- **Cost**: 12 $CRYMP
- **Synergies**: Memecoin, Scammer
- **Effect**: "Double points if played after another Memecoin. Burns 10 $CRYMP when played"
- **Flavor Text**: "Who's a good boy? The community decides!"

### 2. Jokers/Comodines (Passive Modifiers)
These provide ongoing effects that modify game rules or boost other cards.

**Examples:**

#### Elon Simp
- **Type**: Joker
- **Rarity**: Rare
- **Effect**: "Doubles the effect of all Memecoin cards. When Elon tweets, gain 25 $CW3"
- **Flavor Text**: "Will defend daddy Elon's tweets at any cost"

#### Diamond Hands
- **Type**: Joker
- **Rarity**: Uncommon
- **Effect**: "Cards in your hand cannot be discarded or destroyed. +10 points per card held at round end"
- **Flavor Text**: "HODL till the grave 💎🙌"

#### Rug Pull Insurance
- **Type**: Joker
- **Rarity**: Epic
- **Effect**: "Immune to Scammer synergy effects. When opponent plays Scammer card, steal 50 $CRYMP"
- **Flavor Text**: "Trust, but verify. Actually, just verify."

### 3. Tools/Herramientas (One-time Effects)
Utility cards with immediate effects that help manage your deck or situation.

**Examples:**

#### Smart Contract Audit
- **Type**: Tool
- **Rarity**: Common
- **Cost**: 8 $CRYMP
- **Effect**: "Look at next 5 cards from deck. Keep 2, discard the rest"
- **Flavor Text**: "Code is law, but lawyers are expensive"

#### Whale Alert
- **Type**: Tool
- **Rarity**: Uncommon
- **Cost**: 15 $CRYMP
- **Effect**: "Double the points of your highest-value Token card this round"
- **Flavor Text**: "🚨 100,000 $COPE moved to unknown wallet 🚨"

#### Fork Bomb
- **Type**: Tool
- **Rarity**: Rare
- **Cost**: 20 $CRYMP
- **Effect**: "Copy the effect of any card played this round"
- **Flavor Text**: "Hard fork or soft fork? Why not both?"

### 4. Traps/Trampas (High-risk Cards)
Cards with powerful effects but significant drawbacks or conditions.

**Examples:**

#### Margin Call
- **Type**: Trap
- **Rarity**: Uncommon
- **Base Points**: 80
- **Cost**: 5 $CRYMP
- **Effect**: "At round end, lose 20 $CRYMP for each card in hand"
- **Flavor Text**: "Leverage is a hell of a drug"

#### Exit Scam
- **Type**: Trap
- **Rarity**: Rare
- **Base Points**: 200
- **Effect**: "Gain massive points but lose 50% of all $CRYMP. Can only be played once per game"
- **Flavor Text**: "Thanks for playing! *deletes social media*"

#### Ponzi Scheme
- **Type**: Trap
- **Rarity**: Epic
- **Base Points**: Variable
- **Effect**: "Points = 10 × number of Tokens played this game. If you have less than 3 Tokens, lose the round"
- **Flavor Text**: "It's not a pyramid, it's a reverse funnel system!"

### 5. Events/Eventos (Game State Modifiers)
Cards that change the rules or environment for all players.

**Examples:**

#### SEC Investigation
- **Type**: Event
- **Rarity**: Rare
- **Effect**: "All Token cards lose 25% value for 3 rounds. Scammer synergy cards are destroyed"
- **Flavor Text**: "The Securities and Exchange Commission has entered the chat"

#### Bull Market
- **Type**: Event
- **Rarity**: Uncommon
- **Effect**: "All cards gain +20 points for 2 rounds. Drawing cards costs 2x $CRYMP"
- **Flavor Text**: "Number go up! 📈🚀🌙"

#### The Flippening
- **Type**: Event
- **Rarity**: Legendary
- **Effect**: "Swap the effects of the two highest-value cards in play"
- **Flavor Text**: "What if ETH was the real Bitcoin all along?"

## Synergy Categories

### Influencer
**Theme**: Social media manipulation and hype building
- **Cards**: Crypto YouTuber, TikTok Trader, Twitter Shill
- **Mechanics**: Bonus points for viral effects, chain bonuses
- **Risk/Reward**: High volatility, dependent on market sentiment

### Trader  
**Theme**: Market analysis and trading strategies
- **Cards**: Technical Analysis Bot, Futures Degen, Arbitrage King
- **Mechanics**: Predictive effects, risk management, profit scaling
- **Risk/Reward**: Consistent but requires skill/timing

### DAO
**Theme**: Decentralized governance and collective schemes  
- **Cards**: Governance Token, Voting Whale, DAO Treasury
- **Mechanics**: Collaborative effects, consensus mechanics
- **Risk/Reward**: Powerful when coordinated, weak individually

### Memecoin
**Theme**: Viral tokens and community-driven assets
- **Cards**: DOGE variants, Animal coins, Food tokens
- **Mechanics**: Explosive growth potential, crowd effects
- **Risk/Reward**: Extreme volatility, boom or bust

### DeFi
**Theme**: Decentralized finance protocols and yield farming
- **Cards**: Liquidity Pool, Yield Farm, Flash Loan
- **Mechanics**: Compound interest, liquidity effects, complex interactions
- **Risk/Reward**: Steady growth with smart contract risks

### NFT
**Theme**: Non-fungible tokens and digital collectibles
- **Cards**: Bored Ape, CryptoPunk, Profile Picture
- **Mechanics**: Uniqueness bonuses, collection effects, speculation
- **Risk/Reward**: High individual value, market dependent

### Scammer
**Theme**: Rug pulls, exit scams, and fraudulent schemes
- **Cards**: Rug Pull, Fake Whitepaper, Pump and Dump
- **Mechanics**: High immediate rewards with delayed penalties
- **Risk/Reward**: Extreme risk/reward, potential game loss

## Card Mechanics

### Point Generation
```
Base Points + Synergy Bonuses + Effect Modifications = Final Score
```

### Synergy Interactions
- **Same Synergy**: Cards of the same synergy type provide bonuses
- **Anti-Synergy**: Some synergies oppose each other (e.g., Trader vs Scammer)
- **Conditional Synergy**: Effects that only trigger under specific conditions

### Rarity Distribution
- **Common**: 60% - Basic effects, low risk/reward
- **Uncommon**: 25% - Moderate effects, some synergy focus
- **Rare**: 12% - Strong effects, clear synergy identity
- **Epic**: 2.5% - Powerful effects with conditions
- **Legendary**: 0.5% - Game-changing effects, high risk/reward

## Balancing Principles

### Power Level Guidelines
- **Commons**: 20-50 points base
- **Uncommons**: 30-70 points base  
- **Rares**: 50-100 points base
- **Epics**: 75-150 points base
- **Legendaries**: 100-300 points base (with conditions)

### Risk/Reward Balance
- Higher point cards should have higher costs or risks
- Powerful effects should have meaningful counterplay
- No single card should dominate entire strategies

### Synergy Balance
- Each synergy should have viable deck archetypes
- Anti-synergy relationships prevent overpowered combinations
- Hybrid strategies should be possible but not optimal

## Flavor and Theming

### Crypto Culture References
- **HODL**: Long-term holding strategies
- **Diamond Hands**: Refusing to sell despite volatility
- **Paper Hands**: Selling at the first sign of trouble  
- **Aping In**: Making impulsive investment decisions
- **FOMO**: Fear of missing out on gains
- **FUD**: Fear, uncertainty, and doubt spreading

### Mafia Terminology
- **Family**: Your deck/community
- **Protection**: Insurance/defensive cards
- **Territory**: Market dominance
- **Respect**: Reputation and influence
- **Hit**: Targeted attacks on opponents
- **Omertà**: Code of silence (hidden information)

### Web3 Jargon
- **Gas Fees**: Transaction costs
- **Smart Contracts**: Automated effects
- **Oracles**: Information sources
- **Staking**: Locking resources for rewards
- **Governance**: Voting and decision making
- **Bridges**: Cross-chain interactions

## Card Evolution System

### Upgrade Paths
Some cards can be upgraded through gameplay:
- **DOGE → DOGE Classic → DOGE King**
- **Paper Hands → Weak Hands → Diamond Hands**
- **Small Scam → Exit Scam → Ponzi Empire**

### Unlock Conditions
- Complete specific challenges
- Reach certain game milestones  
- Discover through gameplay exploration
- Purchase with accumulated resources

This card system provides deep strategic gameplay while maintaining the satirical crypto/Web3 theme throughout.