import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import NavBar from './pages/NavBar.jsx';
import QuizPage from './pages/QuizPage.jsx';
import CoursesPage from './pages/CoursesPage.jsx';
import LessonPage from './pages/LessonPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AdminQuizPage from './pages/AdminQuizPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import RequireContributor from './components/RequireContributor.jsx';
import RequireAdmin from './components/RequireAdmin.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import AdminUsersPage from './pages/AdminUsersPage.jsx';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/"                element={<HomePage />} />
          <Route path="/about"           element={<AboutPage />} />
          <Route path="/quiz"            element={<QuizPage />} />
          <Route path="/courses"         element={<CoursesPage />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/login"           element={<LoginPage />} />
          <Route path="/register"        element={<RegisterPage />} />
          <Route path="/account"         element={<ProfilePage />} />
          <Route
            path="/admin/quiz"
            element={(
              <RequireContributor>
                <AdminQuizPage />
              </RequireContributor>
            )}
          />
          <Route
            path="/admin/users"
            element={(
              <RequireAdmin>
                <AdminUsersPage />
              </RequireAdmin>
            )}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;