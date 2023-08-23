import React, { useState } from "react";
import Login from "../components/Login";
import Header from "../components/Header";
import CreateBookmark from "../components/CreateBookmark";
import EditBookmark from "../components/EditBookmark";
import BookmarkList from "../components/BookmarkList";
import EditUser from "../components/EditUser";
function FirstPage({
  token,
  setToken,
  handleLogout,
  handleLogin,
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword,
  error,
  setError,
}) {
  const [creatingBookmark, setCreatingBookmark] = useState(false);
  const [editingUser, setEditingUser] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(false);
  const [currentBookmark, setCurrentBookmark] = useState({});
  return (
    <main>
      {token ? (
        <>
          <Header
            token={token}
            handleLogout={handleLogout}
            email={email}
            setEmail={setEmail}
            creatingBookmark={creatingBookmark}
            setCreatingBookmark={setCreatingBookmark}
            setEditingBookmark={setEditingBookmark}
            setEditingUser={setEditingUser}
          />
          {creatingBookmark ? (
            <CreateBookmark
              token={token}
              setCreatingBookmark={setCreatingBookmark}
            />
          ) : editingUser ? (
            <EditUser
              token={token}
              setEditingUser={setEditingUser}
              setEmail={setEmail}
              handleLogin={handleLogin}
              email={email}
              name={name}
              setName={setName}
              password={password}
              setPassword={setPassword}
              error={error}
              setError={setError}
            />
          ) : editingBookmark ? (
            <EditBookmark
              token={token}
              setEditingBookmark={setEditingBookmark}
              currentBookmark={currentBookmark}
              setCurrentBookmark={setCurrentBookmark}
            />
          ) : (
            <BookmarkList
              token={token}
              setEditingBookmark={setEditingBookmark}
              editingBookmark={editingBookmark}
              currentBookmark={currentBookmark}
              setCurrentBookmark={setCurrentBookmark}
            />
          )}
        </>
      ) : (
        <div>
          <Login
            setToken={setToken}
            email={email}
            setEmail={setEmail}
            handleLogin={handleLogin}
            password={password}
            setPassword={setPassword}
          />
        </div>
      )}
    </main>
  );
}

export default FirstPage;
