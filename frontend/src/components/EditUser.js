import axios from "axios";
import React, { useState } from "react";
function EditUser({
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword,
  error,
  setError,
  handleLogin,
  setEditingUser,
}) {
  const [tempEmail, setTempEmail] = useState(email);
  async function handleEdit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const payload = {};
    if (tempEmail) {
      payload.email = tempEmail;
    }
    if (name) {
      payload.name = name;
    }
    try {
      console.log(email, password);
      await handleLogin(e);

      await axios.patch(
        "http://localhost:8080/users/me/edit",
        {
          ...payload,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmail(tempEmail);
      setEditingUser(false);
      setError("");
    } catch (error) {
      console.error("Edit failed", error);
      setError("Edit failed");
    }
  }
  return (
    <div className="form">
      <form>
        <h1>Edit User</h1>
        <div className="content">
          <div className="input-field">
            <input
              type="email"
              placeholder="Email"
              value={tempEmail}
              onChange={(e) => setTempEmail(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="error">{error}</div>
        </div>
        <div className="action">
          <button onClick={handleEdit}>Edit</button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
