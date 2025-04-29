const API_BASE = "http://localhost:5000"; // Backend server

// Register a new user
export async function registerUser(username, password) {
  const response = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
}

// Login user
export async function loginUser(username, password) {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
}

// Submit a high score
export async function submitHighScore(username, score) {
  const response = await fetch(`${API_BASE}/api/scores/highscores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, score }),
  });

  return response.json();
}

// Get all highscores for the logged-in user
export async function getMyHighScores(token) {
  const response = await fetch(`${API_BASE}/api/scores/my-scores`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

// Get all highscores (public)
export async function getHighScores() {
  const response = await fetch(`${API_BASE}/api/scores/highscores`);
  return response.json();
}
