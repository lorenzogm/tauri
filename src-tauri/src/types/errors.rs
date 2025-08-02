use serde::{Deserialize, Serialize};
use std::fmt;

/// Game-specific error types
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum GameError {
    InvalidCard(String),
    InsufficientCurrency { needed: u32, have: u32 },
    DeckFull,
    CardNotFound(String),
    InvalidGameState(String),
    SerializationError(String),
    PersistenceError(String),
}

impl fmt::Display for GameError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            GameError::InvalidCard(msg) => write!(f, "Invalid card operation: {}", msg),
            GameError::InsufficientCurrency { needed, have } => {
                write!(f, "Insufficient currency: needed {}, have {}", needed, have)
            }
            GameError::DeckFull => write!(f, "Deck is at maximum capacity"),
            GameError::CardNotFound(id) => write!(f, "Card not found: {}", id),
            GameError::InvalidGameState(msg) => write!(f, "Invalid game state: {}", msg),
            GameError::SerializationError(msg) => write!(f, "Serialization error: {}", msg),
            GameError::PersistenceError(msg) => write!(f, "Persistence error: {}", msg),
        }
    }
}

impl std::error::Error for GameError {}

/// Result type for game operations
pub type GameResult<T> = Result<T, GameError>;