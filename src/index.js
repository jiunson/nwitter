import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
/*
// StrictMode는 useEffect가 2번 실행된다.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/
root.render(<App />);