import { Link } from "react-router";
import "./../App.css";

const Profile = ({ username, highscores = [] }) => {
  const handleLogout = () => {
    alert("Logging out...");
    window.location.href = "/";
  };

  return (
    <div className="profile-container">
      {/* Container to align buttons side by side */}
      <div className="top-right-buttons">
        <button
          id="logout-btn"
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
        <Link to="/game">
          <button className="game-button">
            <img src="./src/img/game.log.png" alt="Game Icon" />
          </button>
        </Link>
      </div>

      <h1>PROFILE</h1>
      <p className="username">{username}</p>

      <div className="highscores">
        <h2>Highscores</h2>
        <ul>
          {highscores.length > 0 ? (
            highscores.map((score, index) => (
              <li key={index}>
                {index + 1}. {score}
              </li>
            ))
          ) : (
            <li>No highscores available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
