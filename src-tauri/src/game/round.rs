use crate::types::*;

/// Round management utilities
impl RoundState {
    /// Create a new round
    pub fn new(round_number: u32, round_type: RoundType) -> Self {
        Self {
            round_type,
            round_number,
            cards_played: Vec::new(),
            effects_active: Vec::new(),
        }
    }

    /// Get the target score for this round
    pub fn get_target_score(&self) -> u32 {
        let base_score = match self.round_type {
            RoundType::SmallBlind => 100,
            RoundType::BigBlind => 150,
            RoundType::Boss => 200,
        };

        // Increase difficulty with round number
        let scaling = (self.round_number - 1) * 25;
        base_score + scaling
    }

    /// Check if this is a boss round
    pub fn is_boss_round(&self) -> bool {
        matches!(self.round_type, RoundType::Boss)
    }

    /// Get special boss mechanics if applicable
    pub fn get_boss_mechanics(&self) -> Vec<BossMechanic> {
        if !self.is_boss_round() {
            return Vec::new();
        }

        // Different boss mechanics based on round number
        match self.round_number {
            3 => vec![BossMechanic::RegulatorAudit],
            6 => vec![BossMechanic::MarketCrash],
            9 => vec![BossMechanic::RugPullAlert, BossMechanic::FUDSpread],
            12 => vec![BossMechanic::WhaleManipulation],
            15 => vec![BossMechanic::FinalBoss],
            _ => {
                // Random boss mechanic for higher rounds
                let mechanics = vec![
                    BossMechanic::RegulatorAudit,
                    BossMechanic::MarketCrash,
                    BossMechanic::FUDSpread,
                    BossMechanic::WhaleManipulation,
                ];
                vec![mechanics[((self.round_number / 3) % mechanics.len()) as usize].clone()]
            }
        }
    }

    /// Apply boss mechanics to game state
    pub fn apply_boss_mechanics(&self, game_state: &mut GameState) {
        for mechanic in self.get_boss_mechanics() {
            match mechanic {
                BossMechanic::RegulatorAudit => {
                    // Scammer cards lose effectiveness
                    game_state.score.multipliers.push(Multiplier {
                        source: "SEC Investigation".to_string(),
                        value: 0.75, // 25% penalty
                        rounds_remaining: Some(1),
                    });
                }
                BossMechanic::MarketCrash => {
                    // All point values reduced
                    game_state.score.multipliers.push(Multiplier {
                        source: "Market Crash".to_string(),
                        value: 0.5, // 50% penalty
                        rounds_remaining: Some(1),
                    });
                }
                BossMechanic::FUDSpread => {
                    // Random cards in hand get disabled
                    // This would be implemented in the card play logic
                }
                BossMechanic::RugPullAlert => {
                    // Lose some currency
                    let penalty = game_state.score.crymp_currency / 4;
                    game_state.score.crymp_currency = game_state.score.crymp_currency.saturating_sub(penalty);
                }
                BossMechanic::WhaleManipulation => {
                    // Score target increases
                    game_state.score.round_target += 100;
                }
                BossMechanic::FinalBoss => {
                    // Multiple effects
                    game_state.score.round_target += 200;
                    game_state.score.multipliers.push(Multiplier {
                        source: "Final Boss".to_string(),
                        value: 0.6,
                        rounds_remaining: Some(1),
                    });
                }
            }
        }
    }

    /// Get reward multiplier for completing this round
    pub fn get_reward_multiplier(&self) -> f32 {
        match self.round_type {
            RoundType::SmallBlind => 1.0,
            RoundType::BigBlind => 1.5,
            RoundType::Boss => 2.0,
        }
    }
}

/// Boss mechanics that can affect gameplay
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum BossMechanic {
    RegulatorAudit,      // Reduce scammer effectiveness
    MarketCrash,         // Reduce all point values
    FUDSpread,           // Disable random cards
    RugPullAlert,        // Lose currency
    WhaleManipulation,   // Increase score target
    FinalBoss,           // Multiple severe effects
}