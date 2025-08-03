import './App.css';
import { GameProvider, I18nProvider, useTranslation } from './context';
import { Layout, Header, MainContent, Button } from './components';
import { LanguageSelector } from './components/common/LanguageSelector';
import { MainScreen } from './components/screens/MainScreen';

function AppContent() {
  const { t } = useTranslation();

  return (
    <Layout>
      <Header 
        title={t.header.title}
        subtitle={t.header.subtitle}
      >
        <Button variant="neon" size="sm">
          {t.main.actions.newGame}
        </Button>
        <Button variant="secondary" size="sm">
          {t.main.actions.settings}
        </Button>
        <LanguageSelector />
      </Header>

      <MainContent>
        <MainScreen />
      </MainContent>
    </Layout>
  );
}

function App() {
  return (
    <I18nProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </I18nProvider>
  );
}

export default App;
