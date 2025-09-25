import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/home/home.jsx";
import Career from "./pages/career/career.jsx";
import Article from "./pages/article/article.jsx";
import Reservation from "./pages/reservation/reservation.jsx";
import ArticleDetails from "./pages/article/articleDetails.jsx";
import CareerDetail from "./pages/career/detail.jsx";
import AdminPage from "./pages/adminPage/adminPage.jsx";

function App(){
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/career" element={<Career />} />
      <Route path="/article" element={<Article />} />
      <Route path="/reservation" element={<Reservation />} />
      <Route path="/article/:id" element={<ArticleDetails />} />
      <Route path="/career/:id" element={<CareerDetail />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App