import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/home/home.jsx";
import Career from "./pages/career/career.jsx";
import Article from "./pages/article/article.jsx";
import Reservation from "./pages/reservation/reservation.jsx";
import ArticleDetails from "./pages/article/articleDetails.jsx";
import CareerDetail from "./pages/career/detail.jsx";
import AdminPage from "./pages/adminPage/adminPage.jsx";
import AdminCareers from "./pages/adminPage/career/careerPage.jsx";
import CareerForm from "./pages/adminPage/career/CareerForm.jsx";
import LoginPage from "./pages/adminPage/login/loginPage.jsx";
import AdminOutlets from "./pages/adminPage/outlet/outletPage.jsx";
import OutletForm from "./pages/adminPage/outlet/outletForm.jsx";
import AdminArticles from "./pages/adminPage/article/articlePage.jsx";
import ArticleForm from "./pages/adminPage/article/articleForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // ✅ import
import NotFound from "./pages/notfound.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/career" element={<Career />} />
        <Route path="/article" element={<Article />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/career/:id" element={<CareerDetail />} />
        <Route path="/admin-login" element={<LoginPage />} />

        {/* Protected routes (hanya bisa diakses jika sudah login) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-careers"
          element={
            <ProtectedRoute>
              <AdminCareers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-careers/new"
          element={
            <ProtectedRoute>
              <CareerForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-careers/edit/:id"
          element={
            <ProtectedRoute>
              <CareerForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-outlets"
          element={
            <ProtectedRoute>
              <AdminOutlets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-outlets/new"
          element={
            <ProtectedRoute>
              <OutletForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-outlets/edit/:id"
          element={
            <ProtectedRoute>
              <OutletForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-articles"
          element={
            <ProtectedRoute>
              <AdminArticles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-articles/new"
          element={
            <ProtectedRoute>
              <ArticleForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-articles/edit/:id"
          element={
            <ProtectedRoute>
              <ArticleForm />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
