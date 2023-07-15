import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalProvider } from './context/globalContext'
import { GlobalStyle } from './styles/GlobalStyle'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	<GlobalStyle />
	<BrowserRouter>
		<GlobalProvider>
      	<App />
    	</GlobalProvider>
	</BrowserRouter>
  </React.StrictMode>
);

