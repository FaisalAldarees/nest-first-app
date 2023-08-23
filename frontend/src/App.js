import React, { useState } from "react";
import FirstPage from "./pages/FirstPage";
import axios from "axios";
import "./css/app.css";
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email: email,
        password: password,
      });
      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
      setToken(newToken);
    } catch (error) {
      setError("Login failed");
      console.error("Login failed", error);
      throw error;
    }
  }

  return (
    <div className="app">
      <FirstPage
        token={token}
        setToken={setToken}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        setError={setError}
        name={name}
        setName={setName}
      />
    </div>
  );
}

export default App;
