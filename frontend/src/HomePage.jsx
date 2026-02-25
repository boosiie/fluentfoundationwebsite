import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-hero">
      <div className="home-overlay" />
      <div className="home-content">
        <h1>Master complex concepts with confident practice.</h1>
        <p>
          Fluent Foundation helps students transform challenging ideas into lasting knowledge.
          Explore curated quiz sets crafted by exceptional experts to build comprehension, accuracy,
          and confidence at your own pace.
        </p>
        <div className="home-actions">
          <Link to="/quiz" className="home-primary">Start Practicing</Link>
          <Link to="/about" className="home-secondary">Discover How It Works</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
