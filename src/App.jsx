import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/home/home.jsx";
import Career from "./pages/career/career.jsx";
import Article from "./pages/article/article.jsx";
import Reservation from "./pages/reservation/reservation.jsx";

function App(){
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/career" element={<Career />} />
      <Route path="/article" element={<Article />} />
      <Route path="/reservation" element={<Reservation />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App