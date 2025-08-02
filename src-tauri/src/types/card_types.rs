use serde::{Deserialize, Serialize};
use std::collections::HashSet;

/// Unique identifier for cards
pub type CardId = String;

/// Card rarity levels
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Rarity {
    Common,
    Uncommon,
    Rare,
    Epic,
    Legendary,
}

/// Card types representing different gameplay mechanics
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum CardType {
    Token,    // Generate $CW3 points
    Joker,    // Passive modifiers
    Tool,     // One-time effects
    Trap,     // High-risk cards
    Event,    // Game state modifiers
}

/// Synergy categories for card interactions
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
pub enum Synergy {
    Influencer,  // Social media manipulation
    Trader,      // Market analysis
    DAO,         // Decentralized governance
    Memecoin,    // Viral tokens
    DeFi,        // Decentralized finance
    NFT,         // Non-fungible tokens
    Scammer,     // Rug pulls and fraud
}

/// Card effects that modify gameplay
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Effect {
    pub id: String,
    pub description: String,
    pub effect_type: EffectType,
    pub value: Option<i32>,
    pub condition: Option<String>,
}

/// Types of effects cards can have
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum EffectType {
    AddPoints,
    MultiplyPoints,
    AddCurrency,
    DrawCards,
    DiscardCards,
    ConditionalBonus,
    ModifyOtherCards,
    GameStateChange,
}

/// Core card structure
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
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

/// Player's deck of cards
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Deck {
    pub cards: Vec<Card>,
    pub max_size: usize,
}

impl Deck {
    pub fn new() -> Self {
        Self {
            cards: Vec::new(),
            max_size: 30, // Default deck size
        }
    }

    pub fn add_card(&mut self, card: Card) -> Result<(), String> {
        if self.cards.len() >= self.max_size {
            return Err("Deck is at maximum size".to_string());
        }
        self.cards.push(card);
        Ok(())
    }

    pub fn remove_card(&mut self, card_id: &CardId) -> Option<Card> {
        if let Some(pos) = self.cards.iter().position(|c| c.id == *card_id) {
            Some(self.cards.remove(pos))
        } else {
            None
        }
    }

    pub fn size(&self) -> usize {
        self.cards.len()
    }
}

impl Default for Deck {
    fn default() -> Self {
        Self::new()
    }
}