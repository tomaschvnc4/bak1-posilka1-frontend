import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { AppProvider } from './context/Provider2';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
   palette: {
      secondary: {
         // main: '#c62828',
         main: '#8B0000',
      },
   },
});
ReactDOM.render(
   // <React.StrictMode>
   <Router>
      <Auth0ProviderWithHistory>
         <AppProvider>
            <ThemeProvider theme={theme}>
               <App />
            </ThemeProvider>
         </AppProvider>
      </Auth0ProviderWithHistory>
   </Router>,
   // </React.StrictMode>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// reportWebVitals();
