use crate::types::*;

/// Player management utilities
impl PlayerState {
    /// Award experience and handle leveling
    pub fn award_experience(&mut self, base_xp: u32, bonus_xp: u32) {
        let total_xp = base_xp + bonus_xp;
        let old_level = self.level;

        self.add_experience(total_xp);

        if self.level > old_level {
            // Player leveled up - could trigger rewards
            self.on_level_up(old_level, self.level);
        }
    }

    /// Handle level up events
    fn on_level_up(&mut self, old_level: u32, new_level: u32) {
        // Award new cards for leveling up
        let levels_gained = new_level - old_level;

        for level in (old_level + 1)..=new_level {
            self.unlock_level_rewards(level);
        }
    }

    /// Unlock rewards for reaching a specific level
    fn unlock_level_rewards(&mut self, level: u32) {
        match level {
            2 => self.unlocked_cards.push("whale_alert".to_string()),
            3 => self.unlocked_cards.push("smart_contract_audit".to_string()),
            5 => self.unlocked_cards.push("elon_simp".to_string()),
            10 => self.unlocked_cards.push("exit_scam".to_string()),
            15 => self.unlocked_cards.push("the_flippening".to_string()),
            _ => {
                // Every 5 levels, unlock a random rare card
                if level % 5 == 0 {
                    self.unlocked_cards
                        .push(format!("rare_card_level_{}", level));
                }
            }
        }
    }

    /// Record game completion
    pub fn record_game(&mut self, won: bool, final_score: u32, rounds_survived: u32) {
        self.total_games += 1;

        if won {
            self.wins += 1;
        }

        if final_score > self.highest_score {
            self.highest_score = final_score;
        }

        // Award experience based on performance
        let base_xp = rounds_survived * 10;
        let score_bonus = final_score / 100;
        let completion_bonus = if won { 100 } else { 25 };

        self.award_experience(base_xp, score_bonus + completion_bonus);
    }

    /// Get win rate percentage
    pub fn win_rate(&self) -> f32 {
        if self.total_games == 0 {
            0.0
        } else {
            (self.wins as f32 / self.total_games as f32) * 100.0
        }
    }

    /// Check if a card is unlocked
    pub fn has_unlocked_card(&self, card_id: &CardId) -> bool {
        self.unlocked_cards.contains(card_id)
    }

    /// Get level progress to next level
    pub fn level_progress(&self) -> (u32, u32) {
        let current_level_xp = (self.level - 1) * 100;
        let xp_in_level = self.experience - current_level_xp;
        let xp_needed = 100;

        (xp_in_level, xp_needed)
    }
}
