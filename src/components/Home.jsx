import { useState } from "react";
import Modal from "./Modal";

export default function Home() {
  const [activeModal, setActiveModal] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your login logic here
    console.log("Logging in with", username, password);
    // Navigate to the game page
    window.location.href = "/game";
  };

  const handleRegister = () => {
    // Add your registration logic here
    console.log("Registering with", username, password);
    // Close the modal after registration
    setActiveModal(null);
  };

  return (
    <>
      <h1>Welcome to the Game</h1>
      <div className="options">
        <button id="login-btn" onClick={() => setActiveModal("login")}>
          Login
        </button>
        <button id="register-btn" onClick={() => setActiveModal("register")}>
          Register
        </button>
        <button id="guest-btn">Continue as Guest</button>
      </div>

      <Modal
        title="Login"
        buttonText="Login"
        isOpen={activeModal === "login"}
        onSubmit={handleLogin}
      >
        <input
          type="text"
          id="login-username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          id="login-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Modal>

      <Modal
        title="Register"
        buttonText="Submit"
        isOpen={activeModal === "register"}
        onSubmit={handleRegister}
      >
        <input
          type="text"
          id="register-username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          id="register-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Modal>
    </>
  );
}
