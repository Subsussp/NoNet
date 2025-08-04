import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClientProvider,QueryClient} from '@tanstack/react-query'
import { HashRouter } from 'react-router-dom';
import ScrollToTop from 'utills/ScrollToTop';
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter >
    <QueryClientProvider client={queryClient}>
    <ScrollToTop/>
    <App />
    </QueryClientProvider>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
