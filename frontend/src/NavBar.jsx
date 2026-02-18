import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/quiz">Quiz</Link>
      <Link to="/admin/quiz">Admin Quiz</Link>
    </nav>
  );
}

export default NavBar;
