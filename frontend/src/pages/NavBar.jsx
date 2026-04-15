import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/NavBar.css';
import logo from '../assets/fluentlogo.png';
import useAuth from '../hooks/useAuth.js';

function NavBar() {
  const { token, user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      {!isMobile && (
        <div className="nav-left">
          <Link to="/">Home</Link>
          <Link to="/courses">Content</Link>
          <Link to="/about">About</Link>
        </div>
      )}

      <div className="nav-center">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      {!isMobile && (
        <div className="nav-right">
          {token && hasRole(['ADMIN', 'CONTRIBUTOR']) && (
            <Link to="/admin/quiz">Admin Quiz</Link>
          )}
          {token && hasRole('ADMIN') && (
            <Link to="/admin/users">User Admin</Link>
          )}

          {/* Temporary profile button — always visible for testing */}
          <Link to="/account" className="nav-profile-btn">
            👤 {user?.firstName ?? 'Profile'}
          </Link>

          {token ? (
            <button onClick={handleLogout} className="nav-button">Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="register-button">Register</Link>
            </>
          )}
        </div>
      )}

      {isMobile && (
        <>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>

          {menuOpen && (
            <div className="nav-menu">
              <Link to="/"        onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/courses" onClick={() => setMenuOpen(false)}>Content</Link>
              <Link to="/about"   onClick={() => setMenuOpen(false)}>About</Link>

              {token && hasRole(['ADMIN', 'CONTRIBUTOR']) && (
                <Link to="/admin/quiz" onClick={() => setMenuOpen(false)}>Admin Quiz</Link>
              )}
              {token && hasRole('ADMIN') && (
                <Link to="/admin/users" onClick={() => setMenuOpen(false)}>User Admin</Link>
              )}

              {/* Temporary profile button — always visible for testing */}
              <Link to="/account" onClick={() => setMenuOpen(false)} className="nav-profile-btn">
                👤 {user?.firstName ?? 'Profile'}
              </Link>

              {token ? (
                <button onClick={handleLogout} className="nav-button">Logout</button>
              ) : (
                <>
                  <Link to="/login"    onClick={() => setMenuOpen(false)}>Log In</Link>
                  <Link to="/register" className="register-button" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                </>
              )}
            </div>
          )}
        </>
      )}
    </nav>
  );
}

export default NavBar;