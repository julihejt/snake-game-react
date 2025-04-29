import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyHighScores } from "../../Api";
import "./../App.css";

const Profile = () => {
  const [highscores, setHighscores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);

    if (!token) {
      console.warn("No token found");
      setLoading(false);
      return;
    }

    getMyHighScores(token)
      .then((data) => {
        console.log("Fetched scores:", data); // ADD THIS
        setHighscores(data.scores || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch highscores:", err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <div className="profile-container">
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
        {loading ? (
          <p>Loading...</p>
        ) : highscores.length > 0 ? (
          <ul>
            {highscores.map((score, index) => (
              <li key={index}>
                {index + 1}. {score.score}
              </li>
            ))}
          </ul>
        ) : (
          <p>No highscores available</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
