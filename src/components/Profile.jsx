import { useEffect, useState } from "react";
import "./../App.css";

const Profile = ({ username, highscores }) => {
  return (
    <div className="profile-container">
      <h1>PROFILE</h1>
      <p className="username">{username}</p>
      <div className="highscores">
        <h2>Highscores</h2>
        <ul>
          {highscores.map((score, index) => (
            <li key={index}>
              {index + 1}. {score}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
