import { Link } from 'react-router-dom';
import '../css/HomePage.css';

function HomePage() {
  return (
    <div className="home-hero">
      <div className="home-orb home-orb-1" />
      <div className="home-orb home-orb-2" />
      <div className="home-content">
        <h1>
          Learn language.<br />
          <em>Build connections.</em>
        </h1>
        <p>
          Fluent Foundation is a free, community-driven platform that makes
          language learning accessible to everyone — wherever you are, whatever
          your level.
        </p>
        <div className="home-actions">
          <Link to="/quiz" className="home-primary">Jump Straight In</Link>
          <Link to="/about" className="home-secondary">Discover How It Works</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;