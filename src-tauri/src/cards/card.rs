use crate::types::*;

/// Card utilities and operations
impl Card {
    /// Create a new card with basic properties
    pub fn new(id: CardId, name: String, card_type: CardType, rarity: Rarity) -> Self {
        Self {
            id,
            name,
            card_type,
            rarity,
            base_points: None,
            cost: None,
            synergies: Vec::new(),
            effects: Vec::new(),
            flavor_text: String::new(),
            image_path: None,
        }
    }

    /// Builder pattern for creating cards
    pub fn with_points(mut self, points: u32) -> Self {
        self.base_points = Some(points);
        self
    }

    pub fn with_cost(mut self, cost: u32) -> Self {
        self.cost = Some(cost);
        self
    }

    pub fn with_synergies(mut self, synergies: Vec<Synergy>) -> Self {
        self.synergies = synergies;
        self
    }

    pub fn with_effect(mut self, effect: Effect) -> Self {
        self.effects.push(effect);
        self
    }

    pub fn with_flavor_text(mut self, text: String) -> Self {
        self.flavor_text = text;
        self
    }

    /// Check if card has a specific synergy
    pub fn has_synergy(&self, synergy: &Synergy) -> bool {
        self.synergies.contains(synergy)
    }

    /// Calculate effective points considering effects and synergies
    pub fn calculate_points(&self, context: &GameState) -> u32 {
        let mut points = self.base_points.unwrap_or(0);

        // Apply effects that modify points
        for effect in &self.effects {
            match effect.effect_type {
                EffectType::AddPoints => {
                    if let Some(value) = effect.value {
                        points += value as u32;
                    }
                }
                EffectType::MultiplyPoints => {
                    if let Some(value) = effect.value {
                        points = (points as f32 * (value as f32 / 100.0)) as u32;
                    }
                }
                EffectType::ConditionalBonus => {
                    // Check conditions and apply bonus if met
                    if self.check_condition(&effect.condition, context) {
                        if let Some(value) = effect.value {
                            points += value as u32;
                        }
                    }
                }
                _ => {} // Other effects don't modify points directly
            }
        }

        points
    }

    /// Check if a condition is met for effects
    fn check_condition(&self, condition: &Option<String>, _context: &GameState) -> bool {
        // This would implement condition checking logic
        // For now, just return true
        condition.is_some()
    }
}
