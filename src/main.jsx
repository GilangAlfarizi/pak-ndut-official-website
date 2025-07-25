import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "@fontsource/montserrat";
import Footer from "./components/global/Foot";
// import Navbar from "./components/global/Nav";

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		{/* <Navbar /> */}
		<App />
		<Footer />
	</React.StrictMode>
);
