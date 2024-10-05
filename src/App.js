
import React, { useState } from 'react';
import TrackingComponent from './components/TrackingComponent';
import { TrackingProvider } from './context/TrackingContext';
import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [language, setLanguage] = useState('en'); 

    const handleLanguageSwitch = (lang) => {
        setLanguage(lang);
    };

    return (
        <TrackingProvider>
            <div className="App">
                <TrackingComponent language={language} onLanguageChange={handleLanguageSwitch} />
            </div>
        </TrackingProvider>
    );
}

export default App;
