import React, { Component, Suspense , useState } from 'react';

import { useTranslation, withTranslation, Trans } from 'react-i18next';
import logo from './logo.svg';
import './App.css';

// use hoc for class based components
class LegacyWelcomeClass extends Component {
  render() {
    const { t } = this.props;
    return <h2>{t('title')}</h2>;
  }
}
const Welcome = withTranslation()(LegacyWelcomeClass);

// Component using the Trans component
function MyComponent() {
  return (
    <Trans i18nKey="description.part1">
      To get started, edit src/App.js and jatin sehgal.
    </Trans>
  );
}

// page uses the hook
function Page() {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Welcome />
      </div>
      <div className="App-intro">
        <div>
          <select value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="de">Deutsch</option>
            <option value="en">English</option>
          </select>
        </div>
        <MyComponent />
      </div>
      <div>{t('description.part2')}</div>
    </div>
  );
}

// loading component for suspence fallback
const Loader = () => (
  <div className="App">
    <img src={logo} className="App-logo" alt="logo" />
    <div>loading...</div>
  </div>
);

// here app catches the suspense from page in case translations are not yet loaded
export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}