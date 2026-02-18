import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import AboutPage from './AboutPage.jsx';
import NavBar from './NavBar.jsx';
import QuizPage from './QuizPage.jsx';
import AdminQuizPage from './AdminQuizPage.jsx';


function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/admin/quiz" element={<AdminQuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;