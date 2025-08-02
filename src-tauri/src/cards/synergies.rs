use crate::types::*;
use std::collections::HashMap;

/// Synergy system for calculating bonuses between cards
pub struct SynergyCalculator;

impl SynergyCalculator {
    /// Calculate synergy bonuses for a given hand and game state
    pub fn calculate_synergies(hand: &[Card], game_state: &GameState) -> SynergyResult {
        let mut bonuses = HashMap::new();
        let mut synergy_counts = HashMap::new();

        // Count synergies in hand
        for card in hand {
            for synergy in &card.synergies {
                *synergy_counts.entry(synergy.clone()).or_insert(0) += 1;
            }
        }

        // Calculate bonuses based on synergy counts
        for (synergy, count) in synergy_counts.iter() {
            let bonus = Self::calculate_synergy_bonus(synergy, *count, game_state);
            if bonus > 0 {
                bonuses.insert(synergy.clone(), bonus);
            }
        }

        let total_bonus = bonuses.values().sum();

        SynergyResult {
            active_synergies: bonuses,
            total_bonus,
        }
    }

    /// Calculate bonus for a specific synergy based on count
    fn calculate_synergy_bonus(synergy: &Synergy, count: usize, _game_state: &GameState) -> u32 {
        if count < 2 {
            return 0; // Need at least 2 cards for synergy
        }

        match synergy {
            Synergy::Influencer => {
                // Viral effect: exponential growth
                (count * count * 5) as u32
            }
            Synergy::Trader => {
                // Consistent profit: linear growth
                (count * 10) as u32
            }
            Synergy::DAO => {
                // Collective power: bonus for large groups
                if count >= 3 {
                    (count * 15) as u32
                } else {
                    (count * 5) as u32
                }
            }
            Synergy::Memecoin => {
                // Explosive but unstable: high variance
                (count * count * 8) as u32
            }
            Synergy::DeFi => {
                // Compound interest: scaling bonus
                let base = count * 12;
                (base + (base * count / 4)) as u32
            }
            Synergy::NFT => {
                // Unique value: bonus for diversity
                (count * 20) as u32
            }
            Synergy::Scammer => {
                // High risk/reward: big bonus but with penalties
                (count * count * 10) as u32
            }
        }
    }

    /// Check for anti-synergies (negative interactions)
    pub fn check_anti_synergies(hand: &[Card]) -> Vec<AntiSynergy> {
        let mut anti_synergies = Vec::new();
        let mut synergy_counts = HashMap::new();

        // Count synergies
        for card in hand {
            for synergy in &card.synergies {
                *synergy_counts.entry(synergy.clone()).or_insert(0) += 1;
            }
        }

        // Check for conflicting synergies
        if synergy_counts.contains_key(&Synergy::Trader)
            && synergy_counts.contains_key(&Synergy::Scammer)
        {
            anti_synergies.push(AntiSynergy {
                synergy1: Synergy::Trader,
                synergy2: Synergy::Scammer,
                penalty: 20,
                description: "Traders don't trust scammers - reduced effectiveness".to_string(),
            });
        }

        if synergy_counts.contains_key(&Synergy::DeFi)
            && synergy_counts.contains_key(&Synergy::Scammer)
        {
            anti_synergies.push(AntiSynergy {
                synergy1: Synergy::DeFi,
                synergy2: Synergy::Scammer,
                penalty: 15,
                description: "DeFi protocols vulnerable to scams".to_string(),
            });
        }

        anti_synergies
    }
}

/// Result of synergy calculations
#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct SynergyResult {
    pub active_synergies: HashMap<Synergy, u32>,
    pub total_bonus: u32,
}

/// Anti-synergy (negative interaction between synergies)
#[derive(Debug, Clone)]
pub struct AntiSynergy {
    pub synergy1: Synergy,
    pub synergy2: Synergy,
    pub penalty: u32,
    pub description: String,
}
