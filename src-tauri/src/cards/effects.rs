use crate::types::*;

/// Effect processor for handling card effects
pub struct EffectProcessor;

impl EffectProcessor {
    /// Apply an effect to the game state
    pub fn apply_effect(effect: &Effect, game_state: &mut GameState, card: &Card) -> GameResult<()> {
        match effect.effect_type {
            EffectType::AddPoints => {
                if let Some(value) = effect.value {
                    game_state.score.add_points(value as u32);
                }
            }
            EffectType::AddCurrency => {
                if let Some(value) = effect.value {
                    game_state.score.add_currency(value as u32);
                }
            }
            EffectType::DrawCards => {
                if let Some(value) = effect.value {
                    for _ in 0..value {
                        if let Some(card) = game_state.draw_card() {
                            game_state.hand.push(card);
                        }
                    }
                }
            }
            EffectType::DiscardCards => {
                if let Some(value) = effect.value {
                    let discard_count = (value as usize).min(game_state.hand.len());
                    game_state.hand.drain(0..discard_count);
                }
            }
            EffectType::MultiplyPoints => {
                if let Some(value) = effect.value {
                    let multiplier = Multiplier {
                        source: card.name.clone(),
                        value: value as f32 / 100.0,
                        rounds_remaining: Some(1),
                    };
                    game_state.score.multipliers.push(multiplier);
                }
            }
            EffectType::ConditionalBonus => {
                // Check condition and apply bonus if met
                if Self::check_condition(&effect.condition, game_state) {
                    if let Some(value) = effect.value {
                        game_state.score.add_points(value as u32);
                    }
                }
            }
            EffectType::ModifyOtherCards => {
                // This would modify other cards in play
                // Implementation depends on specific effect
            }
            EffectType::GameStateChange => {
                // This would modify global game state
                // Implementation depends on specific effect
            }
        }

        Ok(())
    }

    /// Check if a condition is met
    fn check_condition(condition: &Option<String>, game_state: &GameState) -> bool {
        if let Some(cond) = condition {
            // Simple condition checking - in a real implementation this would be more sophisticated
            match cond.as_str() {
                "hand_size_greater_than_5" => game_state.hand.len() > 5,
                "currency_greater_than_50" => game_state.score.crymp_currency > 50,
                "first_round" => game_state.current_round.round_number == 1,
                _ => false,
            }
        } else {
            true
        }
    }

    /// Create common effects
    pub fn create_point_effect(points: i32) -> Effect {
        Effect {
            id: format!("add_points_{}", points),
            description: format!("Gain {} $CW3 points", points),
            effect_type: EffectType::AddPoints,
            value: Some(points),
            condition: None,
        }
    }

    pub fn create_currency_effect(currency: i32) -> Effect {
        Effect {
            id: format!("add_currency_{}", currency),
            description: format!("Gain {} $CRYMP", currency),
            effect_type: EffectType::AddCurrency,
            value: Some(currency),
            condition: None,
        }
    }

    pub fn create_draw_effect(cards: i32) -> Effect {
        Effect {
            id: format!("draw_cards_{}", cards),
            description: format!("Draw {} cards", cards),
            effect_type: EffectType::DrawCards,
            value: Some(cards),
            condition: None,
        }
    }

    pub fn create_conditional_effect(points: i32, condition: String) -> Effect {
        Effect {
            id: format!("conditional_{}_{}", condition, points),
            description: format!("If {}, gain {} points", condition, points),
            effect_type: EffectType::ConditionalBonus,
            value: Some(points),
            condition: Some(condition),
        }
    }
}