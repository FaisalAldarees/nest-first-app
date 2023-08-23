import axios from "axios";
import { useState } from "react";
import "../css/form.css";

function BookmarkForm({
  setCreatingBookmark,
  setEditingBookmark,
  action,
  currentBookmark,
  setCurrentBookmark,
}) {
  const [title, setTitle] = useState(
    (currentBookmark && currentBookmark.title) || ""
  );
  const [link, setLink] = useState(
    (currentBookmark && currentBookmark.link) || ""
  );
  const [description, setDescription] = useState(
    (currentBookmark && currentBookmark.description) || ""
  );
  const [error, setError] = useState("");

  async function handleCreate(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:8080/bookmarks",
        {
          title: title,
          link: link,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCreatingBookmark(false);
    } catch (error) {
      setError("Create failed");
    }
  }
  async function handleEdit(e) {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:8080/bookmarks/${currentBookmark.id}`,
        {
          title: title,
          link: link,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditingBookmark(false);
      setCurrentBookmark({});
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="form">
      <form>
        <h1>{action} bookmark</h1>
        <div className="content">
          <div className="input-field">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="error">{error}</div>
        </div>
        <div className="action">
          {action === "edit" ? (
            <button onClick={handleEdit}>Edit</button>
          ) : (
            <button onClick={handleCreate}>Add</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BookmarkForm;
