import { createBrowserRouter } from "react-router-dom";
import App from "./pages/home/App.jsx";
import Career from "./pages/careers/careers.jsx";
import Article from "./pages/article/detail/article.jsx";
import Reservation from "./pages/reservation/reservation.jsx";
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/career",
		element: <Career />,
	},
	{
		path: "/article",
		element: <Article />,
	},
	{
		path: "/reservation",
		element: <Reservation />,
	},
]);

export default router;
