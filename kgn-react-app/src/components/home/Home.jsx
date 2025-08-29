import { Link } from "react-router";
import kgnImage from "../../assets/kgn-g1.jpg";
function Home() {
  return (
    <div className="home-container">
      <img
        src={kgnImage} // Replace with your image path
        alt="Profile"
        className="profile-image"
        title="kgn profile"
      />
      <h1>Welcome to kgn services</h1>
      <p>I am dedicated to delivering excellence in all my services.</p>
      <nav className="nav-links">
        <Link to="/die">Tenzies Game</Link>
        <Link to="/todo">To-Do List</Link>
      </nav>
    </div>
  );
}

export default Home;
