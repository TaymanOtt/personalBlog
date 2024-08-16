import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
console.log('Rendering App');
root.render(<App />);