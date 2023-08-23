import React, { useState } from "react";
import axios from "axios";
import "../css/form.css";

function Login({
  setToken,
  email,
  setEmail,
  handleLogin,
  password,
  setPassword,
}) {
  const [error, setError] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        email: email,
        password: password,
      });
      const token = response.data.token;
      setToken(token);
      localStorage.setItem("token", token);
    } catch (error) {
      setError("Signup failed");
      console.error("Signup failed", error);
    }
  }

  return (
    <div className="form">
      <form>
        <h1>Login / Signup 👮🏻‍♂️</h1>
        <div className="content">
          <div className="input-field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="error">{error}</div>
        </div>
        <div className="action">
          <button
            onClick={async (e) => {
              try {
                await handleLogin(e);
              } catch (error) {
                setError("Login failed");
                console.error("Login failed", error);
              }
            }}
          >
            Login
          </button>
          <button onClick={handleSignup}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
