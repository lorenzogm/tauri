import { Button, Card, ScoreDisplay, RoundInfo } from '../';
import { CardType, Rarity, Synergy } from '../../types';
import { useTranslation } from '../../context';

// Demo card data
const demoCard = {
  id: 'demo-doge',
  name: 'DOGE Classic',
  card_type: CardType.Token,
  rarity: Rarity.Uncommon,
  base_points: 30,
  cost: 5,
  synergies: [Synergy.Memecoin, Synergy.Influencer],
  effects: [
    {
      id: 'doge-effect',
      description: 'Gains +5 points for each Influencer card played this round',
      effect_type: 'ConditionalBonus' as const,
      value: 5,
    }
  ],
  flavor_text: 'Much wow, very gains, such profit!',
};

export function MainScreen() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold font-display bg-gradient-crypto bg-clip-text text-transparent">
          {t.main.welcome.title}
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          {t.main.welcome.subtitle}
        </p>
      </div>

      {/* Demo Components Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Card Demo */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-crypto-gold-400">{t.main.welcome.cardSystemTitle}</h3>
          <div className="flex justify-center">
            <Card card={demoCard} size="lg" />
          </div>
          <p className="text-sm text-gray-400 text-center">
            {t.main.welcome.cardSystemDescription}
          </p>
        </div>

        {/* Score Display Demo */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-crypto-gold-400">{t.main.welcome.scoringSystemTitle}</h3>
          <ScoreDisplay 
            cw3Points={750}
            crympCurrency={120}
            target={1000}
            showProgress={true}
            size="lg"
          />
          <p className="text-sm text-gray-400 text-center">
            {t.main.welcome.scoringSystemDescription}
          </p>
        </div>

        {/* Round Info Demo */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-crypto-gold-400">{t.main.welcome.roundProgressionTitle}</h3>
          <RoundInfo 
            roundNumber={3}
            roundType="Boss"
            target={1500}
            current={1200}
          />
          <p className="text-sm text-gray-400 text-center">
            {t.main.welcome.roundProgressionDescription}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button variant="primary" size="lg">
          {t.main.actions.startNewGame}
        </Button>
        <Button variant="secondary" size="lg">
          {t.main.actions.loadGame}
        </Button>
        <Button variant="neon" size="lg" neonColor="crypto-purple-500">
          {t.main.actions.viewCollection}
        </Button>
      </div>

      {/* Theme Showcase */}
      <div className="bg-crypto-dark-800 rounded-lg p-6 border border-crypto-dark-600">
        <h3 className="text-xl font-bold text-crypto-gold-400 mb-4">{t.main.welcome.designSystemTitle}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Currency Colors */}
          <div className="text-center">
            <div className="w-16 h-16 bg-currency-cw3 rounded-lg mx-auto mb-2 shadow-neon"></div>
            <p className="text-sm text-currency-cw3">{t.cards.currencies.cw3Gold}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-currency-crymp rounded-lg mx-auto mb-2 shadow-neon"></div>
            <p className="text-sm text-currency-crymp">{t.cards.currencies.crympGreen}</p>
          </div>
          
          {/* Synergy Colors */}
          <div className="text-center">
            <div className="w-16 h-16 bg-synergy-memecoin rounded-lg mx-auto mb-2 shadow-neon"></div>
            <p className="text-sm text-synergy-memecoin">{t.cards.synergies.Memecoin}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-synergy-scammer rounded-lg mx-auto mb-2 shadow-neon"></div>
            <p className="text-sm text-synergy-scammer">{t.cards.synergies.Scammer}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm">
        <p>{t.main.welcome.footer}</p>
      </div>
    </div>
  );
}