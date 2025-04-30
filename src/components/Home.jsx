import { useState } from "react";
import Modal from "./Modal";
import { loginUser, registerUser } from "../../Api"; // Make sure this path is correct

export default function Home() {
  const [activeModal, setActiveModal] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginUser(username, password);
      console.log("Login response:", res);

      if (res.success || res.token || res.message === "Login successful") {
        // ✅ Store token and username in localStorage
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", username);

        // Redirect to game or profile
        window.location.href = "/game";
      } else {
        alert("Login failed: " + (res.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Error logging in.");
    }
  };

  const handleRegister = async () => {
    try {
      const res = await registerUser(username, password);
      console.log("Register response:", res);

      if (res.success || res.message === "User created successfully") {
        alert("Registration successful! You can now log in.");
        setActiveModal(null); // Close the modal
      } else {
        alert("Registration failed: " + (res.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Error registering.");
    }
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
        <button
          id="guest-btn"
          onClick={() => (window.location.href = "/game?guest=true")}
        >
          Continue as Guest
        </button>
      </div>

      {/* Login Modal */}
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

      {/* Register Modal */}
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
