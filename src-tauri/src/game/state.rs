use crate::cards::*;
use crate::types::*;

/// Game state manager
pub struct GameManager;

impl GameManager {
    /// Create a new game with default settings
    pub fn new_game(id: String) -> GameState {
        let mut game_state = GameState::new(id);

        // Initialize with a starter deck
        Self::setup_starter_deck(&mut game_state);

        // Draw initial hand
        Self::draw_initial_hand(&mut game_state);

        game_state
    }

    /// Set up the starter deck with basic cards
    fn setup_starter_deck(game_state: &mut GameState) {
        // Create some basic starter cards
        let starter_cards = vec![
            Card::new(
                "doge_classic".to_string(),
                "DOGE Classic".to_string(),
                CardType::Token,
                Rarity::Common,
            )
            .with_points(30)
            .with_cost(5)
            .with_synergies(vec![Synergy::Memecoin, Synergy::Influencer])
            .with_flavor_text("Much wow, very gains, such profit!".to_string()),
            Card::new(
                "bitcoin_maxi".to_string(),
                "Bitcoin Maxi".to_string(),
                CardType::Token,
                Rarity::Rare,
            )
            .with_points(100)
            .with_cost(25)
            .with_synergies(vec![Synergy::Trader])
            .with_flavor_text("There is no second best. Orange coin good.".to_string()),
            Card::new(
                "diamond_hands".to_string(),
                "Diamond Hands".to_string(),
                CardType::Joker,
                Rarity::Uncommon,
            )
            .with_effect(EffectProcessor::create_point_effect(10))
            .with_flavor_text("HODL till the grave 💎🙌".to_string()),
        ];

        for card in starter_cards {
            let _ = game_state.deck.add_card(card);
        }

        // Add more basic cards to fill the deck
        for i in 1..=15 {
            let card = Card::new(
                format!("basic_token_{}", i),
                format!("Basic Token #{}", i),
                CardType::Token,
                Rarity::Common,
            )
            .with_points(20)
            .with_cost(3)
            .with_synergies(vec![Synergy::Trader])
            .with_flavor_text("A basic crypto token".to_string());

            let _ = game_state.deck.add_card(card);
        }

        // Shuffle the deck
        game_state.deck.shuffle();
    }

    /// Draw initial hand of cards
    fn draw_initial_hand(game_state: &mut GameState) {
        let initial_hand_size = 5;
        for _ in 0..initial_hand_size {
            if let Some(card) = game_state.draw_card() {
                game_state.hand.push(card);
            }
        }
    }

    /// Process the end of a round
    pub fn end_round(game_state: &mut GameState) -> RoundResult {
        let passed = game_state.end_round();

        if passed {
            // Prepare for next round
            Self::setup_next_round(game_state);
            RoundResult::Victory
        } else {
            RoundResult::Defeat
        }
    }

    /// Set up the next round
    fn setup_next_round(game_state: &mut GameState) {
        // Draw new cards to refill hand
        let target_hand_size = 5;
        while game_state.hand.len() < target_hand_size {
            if let Some(card) = game_state.draw_card() {
                game_state.hand.push(card);
            } else {
                break; // No more cards in deck
            }
        }

        // Update round type based on round number
        game_state.current_round.round_type = match game_state.current_round.round_number % 3 {
            0 => RoundType::Boss,
            1 => RoundType::SmallBlind,
            _ => RoundType::BigBlind,
        };

        // Clear effects and reset for new round
        game_state.current_round.effects_active.clear();
        game_state.score.multipliers.retain(|m| {
            if let Some(rounds) = m.rounds_remaining {
                rounds > 1
            } else {
                true
            }
        });

        // Reduce remaining rounds for multipliers
        for multiplier in &mut game_state.score.multipliers {
            if let Some(ref mut rounds) = multiplier.rounds_remaining {
                *rounds -= 1;
            }
        }
    }

    /// Validate a move (playing a card)
    pub fn validate_card_play(game_state: &GameState, card_id: &CardId) -> GameResult<()> {
        // Check if card is in hand
        if !game_state.hand.iter().any(|c| c.id == *card_id) {
            return Err(GameError::CardNotFound(card_id.clone()));
        }

        // Check if game is over
        if game_state.game_over {
            return Err(GameError::InvalidGameState("Game is over".to_string()));
        }

        Ok(())
    }

    /// Calculate current score including synergies
    pub fn calculate_total_score(game_state: &GameState) -> u32 {
        let base_score = game_state.score.cw3_points;
        let synergy_result = SynergyCalculator::calculate_synergies(&game_state.hand, game_state);

        base_score + synergy_result.total_bonus
    }
}

/// Result of ending a round
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum RoundResult {
    Victory,
    Defeat,
}
