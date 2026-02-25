import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import useAuth from './hooks/useAuth.js';

function NavBar() {
  const { token, user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">Fluent Foundation</Link>
      </div>
      <div className="navbar-links">
        <Link to="/about">About</Link>
        <Link to="/quiz">Quiz</Link>
        {token && hasRole(['ADMIN', 'CONTRIBUTOR']) && (
          <Link to="/admin/quiz">Admin Quiz</Link>
        )}
        {token && hasRole('ADMIN') && (
          <Link to="/admin/users">User Admin</Link>
        )}
        {token ? (
          <>
            <Link to="/account">{user?.firstName ?? user?.email}</Link>
            <button type="button" onClick={handleLogout} className="nav-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
