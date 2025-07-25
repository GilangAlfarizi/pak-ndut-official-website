import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "@fontsource/montserrat";
import Footer from "./components/global/Foot";
import Navbar from "./components/global/Nav";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Navbar />
		<RouterProvider router={router} />
		<Footer />
	</StrictMode>
);
