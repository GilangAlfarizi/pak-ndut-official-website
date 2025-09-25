import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "@fontsource/montserrat"; // Defaults to weight 400
// import "@fontsource/montserrat/400.css"; // Specify weight
// import "@fontsource/montserrat/400-italic.css";
import Footer from "./components/global/Foot";
import { LanguageProvider } from "./context/LanguageContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
