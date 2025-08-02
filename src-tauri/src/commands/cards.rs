use crate::cards::*;
use crate::types::*;

/// Play a card from the player's hand
#[tauri::command]
pub async fn play_card(card_id: CardId, mut state: GameState) -> Result<GameState, GameError> {
    log::info!("Playing card {} in game {}", card_id, state.id);

    // Validate the move
    GameManager::validate_card_play(&state, &card_id)?;

    // Find the card in hand to get its details before playing
    let card = state
        .hand
        .iter()
        .find(|c| c.id == card_id)
        .ok_or_else(|| GameError::CardNotFound(card_id.clone()))?
        .clone();

    // Apply card effects before playing
    for effect in &card.effects {
        EffectProcessor::apply_effect(effect, &mut state, &card)?;
    }

    // Play the card (removes from hand, adds to played cards)
    state.play_card(&card_id)?;

    log::info!("Card {} played successfully", card_id);

    Ok(state)
}

/// Buy a card from the shop
#[tauri::command]
pub async fn buy_card(card_id: CardId, mut state: GameState) -> Result<GameState, GameError> {
    log::info!("Buying card {} in game {}", card_id, state.id);

    // Find the card in the shop
    let card_index = state
        .shop
        .available_cards
        .iter()
        .position(|c| c.id == card_id)
        .ok_or_else(|| GameError::CardNotFound(card_id.clone()))?;

    let card = state.shop.available_cards[card_index].clone();

    // Check if player has enough currency
    let cost = card.cost.unwrap_or(0);
    if state.score.crymp_currency < cost {
        return Err(GameError::InsufficientCurrency {
            needed: cost,
            have: state.score.crymp_currency,
        });
    }

    // Check if deck has space
    if state.deck.size() >= state.deck.max_size {
        return Err(GameError::DeckFull);
    }

    // Complete the purchase
    state.score.spend_currency(cost)?;
    state
        .deck
        .add_card(card)
        .map_err(|e| GameError::InvalidGameState(e))?;
    state.shop.available_cards.remove(card_index);

    log::info!("Card {} purchased for {} $CRYMP", card_id, cost);

    Ok(state)
}

/// Draw cards from deck to hand
#[tauri::command]
pub async fn draw_cards(count: usize, mut state: GameState) -> Result<GameState, GameError> {
    log::info!("Drawing {} cards in game {}", count, state.id);

    for _ in 0..count {
        if let Some(card) = state.draw_card() {
            state.hand.push(card);
        } else {
            break; // No more cards in deck
        }
    }

    log::info!("Drew cards, hand size now: {}", state.hand.len());

    Ok(state)
}

/// Discard a card from hand
#[tauri::command]
pub async fn discard_card(card_id: CardId, mut state: GameState) -> Result<GameState, GameError> {
    log::info!("Discarding card {} in game {}", card_id, state.id);

    // Find and remove card from hand
    let card_index = state
        .hand
        .iter()
        .position(|c| c.id == card_id)
        .ok_or_else(|| GameError::CardNotFound(card_id.clone()))?;

    let _discarded_card = state.hand.remove(card_index);

    log::info!("Card {} discarded", card_id);

    Ok(state)
}

/// Get available cards in shop (refresh shop)
#[tauri::command]
pub async fn refresh_shop(mut state: GameState) -> Result<GameState, GameError> {
    log::info!("Refreshing shop in game {}", state.id);

    // Check if player can afford reroll
    if state.score.crymp_currency < state.shop.reroll_cost {
        return Err(GameError::InsufficientCurrency {
            needed: state.shop.reroll_cost,
            have: state.score.crymp_currency,
        });
    }

    if state.shop.rerolls_remaining == 0 {
        return Err(GameError::InvalidGameState(
            "No rerolls remaining".to_string(),
        ));
    }

    // Pay for reroll
    state.score.spend_currency(state.shop.reroll_cost)?;
    state.shop.rerolls_remaining -= 1;

    // Generate new shop cards (simplified - would use proper card generation)
    state.shop.available_cards = generate_shop_cards(&state);

    log::info!(
        "Shop refreshed, {} rerolls remaining",
        state.shop.rerolls_remaining
    );

    Ok(state)
}

/// Calculate synergy bonuses for current hand
#[tauri::command]
pub async fn calculate_synergies(state: GameState) -> Result<SynergyResult, GameError> {
    log::info!("Calculating synergies for game {}", state.id);

    let synergy_result = SynergyCalculator::calculate_synergies(&state.hand, &state);

    Ok(synergy_result)
}

/// Helper function to generate shop cards
fn generate_shop_cards(state: &GameState) -> Vec<Card> {
    // Simplified shop generation - in a real implementation this would be more sophisticated
    let mut shop_cards = Vec::new();

    // Generate 3-5 random cards based on player level and round
    let card_count = 3 + (state.player.level / 5).min(2) as usize;

    for i in 0..card_count {
        let card = Card::new(
            format!("shop_card_{}_{}", state.current_round.round_number, i),
            format!("Shop Card #{}", i + 1),
            CardType::Token,
            Rarity::Common,
        )
        .with_points(25 + state.current_round.round_number * 5)
        .with_cost(10 + state.current_round.round_number * 2)
        .with_synergies(vec![Synergy::Trader])
        .with_flavor_text("A card from the shop".to_string());

        shop_cards.push(card);
    }

    shop_cards
}
