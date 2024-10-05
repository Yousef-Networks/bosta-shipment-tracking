import React from 'react';
import ReactDOM from 'react-dom/client'; // Update this line
import App from './App';
import './index.css'; // If you have any global CSS

// Create a root for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
