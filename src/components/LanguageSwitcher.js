import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ onLanguageChange }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    onLanguageChange(language); // Notify parent component of language change
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ar')}>عربي</button>
    </div>
  );
};

export default LanguageSwitcher;
