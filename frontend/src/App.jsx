import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import AboutPage from './AboutPage.jsx';
import NavBar from './NavBar.jsx';
import QuizPage from './QuizPage.jsx';
import AdminQuizPage from './AdminQuizPage.jsx';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
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
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
          <Route
            path="/account"
            element={(
              <ProtectedRoute>
                <div className="page">
                  <h2>My Account</h2>
                  <p>Account settings coming soon.</p>
                </div>
              </ProtectedRoute>
            )}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
