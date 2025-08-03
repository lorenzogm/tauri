import { Button } from '../common/Button';
import { useTranslation } from '../../context';
import type { Language } from '../../context';

export function LanguageSelector() {
  const { language, setLanguage, t } = useTranslation();

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-400">{t.common.language}:</span>
      <div className="flex space-x-1">
        <Button
          variant={language === 'en' ? 'primary' : 'secondary'}
          size="xs"
          onClick={() => handleLanguageChange('en')}
        >
          EN
        </Button>
        <Button
          variant={language === 'es' ? 'primary' : 'secondary'}
          size="xs"
          onClick={() => handleLanguageChange('es')}
        >
          ES
        </Button>
      </div>
    </div>
  );
}