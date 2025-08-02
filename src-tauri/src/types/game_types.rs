use serde::{Deserialize, Serialize};
use std::collections::HashMap;

use super::card_types::{Card, CardId, Deck};

/// Scoring multiplier effects
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Multiplier {
    pub source: String,
    pub value: f32,
    pub rounds_remaining: Option<u32>,
}

/// Primary scoring system
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct CryptoScore {
    pub cw3_points: u32,      // Primary scoring currency
    pub crymp_currency: u32,  // Shop currency
    pub multipliers: Vec<Multiplier>,
    pub round_target: u32,    // Target score to pass round
}

impl CryptoScore {
    pub fn new(round_target: u32) -> Self {
        Self {
            cw3_points: 0,
            crymp_currency: 100, // Starting currency
            multipliers: Vec::new(),
            round_target,
        }
    }

    pub fn add_points(&mut self, points: u32) {
        let mut final_points = points as f32;
        
        // Apply multipliers
        for multiplier in &self.multipliers {
            final_points *= multiplier.value;
        }
        
        self.cw3_points += final_points as u32;
    }

    pub fn add_currency(&mut self, currency: u32) {
        self.crymp_currency += currency;
    }

    pub fn spend_currency(&mut self, amount: u32) -> Result<(), String> {
        if self.crymp_currency >= amount {
            self.crymp_currency -= amount;
            Ok(())
        } else {
            Err("Insufficient currency".to_string())
        }
    }

    pub fn is_round_passed(&self) -> bool {
        self.cw3_points >= self.round_target
    }
}

/// Round types with different difficulties
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum RoundType {
    SmallBlind,  // Easy round
    BigBlind,    // Medium round
    Boss,        // Hard round with special mechanics
}

/// Current round state
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct RoundState {
    pub round_type: RoundType,
    pub round_number: u32,
    pub cards_played: Vec<CardId>,
    pub effects_active: Vec<String>,
}

/// Player progression and statistics
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct PlayerState {
    pub level: u32,
    pub experience: u32,
    pub total_games: u32,
    pub wins: u32,
    pub highest_score: u32,
    pub unlocked_cards: Vec<CardId>,
}

impl PlayerState {
    pub fn new() -> Self {
        Self {
            level: 1,
            experience: 0,
            total_games: 0,
            wins: 0,
            highest_score: 0,
            unlocked_cards: Vec::new(),
        }
    }

    pub fn add_experience(&mut self, xp: u32) {
        self.experience += xp;
        // Simple leveling: every 100 XP = 1 level
        let new_level = (self.experience / 100) + 1;
        if new_level > self.level {
            self.level = new_level;
        }
    }
}

impl Default for PlayerState {
    fn default() -> Self {
        Self::new()
    }
}

/// Shop state for card purchasing
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ShopState {
    pub available_cards: Vec<Card>,
    pub reroll_cost: u32,
    pub rerolls_remaining: u32,
}

impl ShopState {
    pub fn new() -> Self {
        Self {
            available_cards: Vec::new(),
            reroll_cost: 10,
            rerolls_remaining: 3,
        }
    }
}

impl Default for ShopState {
    fn default() -> Self {
        Self::new()
    }
}

/// Complete game state
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct GameState {
    pub id: String,
    pub player: PlayerState,
    pub current_round: RoundState,
    pub deck: Deck,
    pub hand: Vec<Card>,
    pub score: CryptoScore,
    pub shop: ShopState,
    pub game_over: bool,
    pub victory: bool,
}

impl GameState {
    pub fn new(id: String) -> Self {
        Self {
            id,
            player: PlayerState::new(),
            current_round: RoundState {
                round_type: RoundType::SmallBlind,
                round_number: 1,
                cards_played: Vec::new(),
                effects_active: Vec::new(),
            },
            deck: Deck::new(),
            hand: Vec::new(),
            score: CryptoScore::new(100), // First round target
            shop: ShopState::new(),
            game_over: false,
            victory: false,
        }
    }

    pub fn draw_card(&mut self) -> Option<Card> {
        if !self.deck.cards.is_empty() {
            Some(self.deck.cards.remove(0))
        } else {
            None
        }
    }

    pub fn play_card(&mut self, card_id: &CardId) -> Result<(), String> {
        // Find and remove card from hand
        if let Some(pos) = self.hand.iter().position(|c| c.id == *card_id) {
            let card = self.hand.remove(pos);
            
            // Apply card effects based on type
            match card.card_type {
                super::card_types::CardType::Token => {
                    if let Some(points) = card.base_points {
                        self.score.add_points(points);
                    }
                }
                _ => {
                    // Other card types will be implemented later
                }
            }
            
            self.current_round.cards_played.push(card_id.clone());
            Ok(())
        } else {
            Err("Card not found in hand".to_string())
        }
    }

    pub fn end_round(&mut self) -> bool {
        let passed = self.score.is_round_passed();
        
        if passed {
            // Advance to next round
            self.current_round.round_number += 1;
            self.score.round_target += 50; // Increase difficulty
            self.score.cw3_points = 0; // Reset score for new round
            self.current_round.cards_played.clear();
            
            // Add currency reward
            self.score.add_currency(50);
        } else {
            // Game over
            self.game_over = true;
        }
        
        passed
    }
}