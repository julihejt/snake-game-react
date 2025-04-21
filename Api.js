const API_BASE = "http://localhost:5173/"; // Adjust if backend is hosted elsewhere

// Register a new user
export async function registerUser(username, password) {
  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
}

// Login user
export async function loginUser(username, password) {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
}

// Submit a high score
export async function submitHighScore(username, score) {
  const response = await fetch(`${API_BASE}/highscores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, score }),
  });

  return response.json();
}

// Get highscores
export async function getHighScores() {
  const response = await fetch(`${API_BASE}/highscores`);
  return response.json();
}
