use crate::types::*;
use std::collections::HashMap;

/// Extended deck operations
impl Deck {
    /// Shuffle the deck
    pub fn shuffle(&mut self) {
        // For now, just reverse as a simple shuffle
        // In a real implementation, use proper randomization
        self.cards.reverse();
    }

    /// Draw multiple cards
    pub fn draw_cards(&mut self, count: usize) -> Vec<Card> {
        let draw_count = count.min(self.cards.len());
        self.cards.drain(0..draw_count).collect()
    }

    /// Get cards by synergy type
    pub fn get_cards_by_synergy(&self, synergy: &Synergy) -> Vec<&Card> {
        self.cards
            .iter()
            .filter(|card| card.has_synergy(synergy))
            .collect()
    }

    /// Get cards by type
    pub fn get_cards_by_type(&self, card_type: &CardType) -> Vec<&Card> {
        self.cards
            .iter()
            .filter(|card| card.card_type == *card_type)
            .collect()
    }

    /// Get deck statistics
    pub fn get_stats(&self) -> DeckStats {
        let mut synergy_counts = HashMap::new();
        let mut type_counts = HashMap::new();
        let mut rarity_counts = HashMap::new();

        for card in &self.cards {
            // Count synergies
            for synergy in &card.synergies {
                *synergy_counts.entry(synergy.clone()).or_insert(0) += 1;
            }

            // Count types
            *type_counts.entry(card.card_type.clone()).or_insert(0) += 1;

            // Count rarities
            *rarity_counts.entry(card.rarity.clone()).or_insert(0) += 1;
        }

        DeckStats {
            total_cards: self.cards.len(),
            synergy_distribution: synergy_counts,
            type_distribution: type_counts,
            rarity_distribution: rarity_counts,
        }
    }

    /// Validate deck composition
    pub fn validate(&self) -> Result<(), String> {
        if self.cards.is_empty() {
            return Err("Deck cannot be empty".to_string());
        }

        if self.cards.len() < 10 {
            return Err("Deck must have at least 10 cards".to_string());
        }

        if self.cards.len() > self.max_size {
            return Err(format!("Deck exceeds maximum size of {}", self.max_size));
        }

        Ok(())
    }
}

/// Deck statistics for analysis
#[derive(Debug, Clone)]
pub struct DeckStats {
    pub total_cards: usize,
    pub synergy_distribution: HashMap<Synergy, usize>,
    pub type_distribution: HashMap<CardType, usize>,
    pub rarity_distribution: HashMap<Rarity, usize>,
}