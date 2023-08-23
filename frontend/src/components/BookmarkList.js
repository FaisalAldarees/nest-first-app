import React, { useEffect, useState } from "react";
import BookmarkCard from "./BookmarkCard";
import axios from "axios";

function BookmarkList({ token, setEditingBookmark, setCurrentBookmark }) {
  const [bookmarks, setBookmarks] = useState([]);
  useEffect(() => {
    async function getBookmarks() {
      try {
        const response = await axios.get("http://localhost:8080/bookmarks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookmarks(response.data);
      } catch (error) {
        console.error("Get bookmarks failed", error);
      }
    }
    getBookmarks();
  }, [token]);
  return (
    <div className="container mt-5">
      <div className="row">
        {bookmarks.length ? (
          bookmarks.map((bookmark) => (
            <div className="col-6 col-md-3 mb-2">
              <BookmarkCard
                bookmark={bookmark}
                setEditingBookmark={setEditingBookmark}
                setCurrentBookmark={setCurrentBookmark}
                setBookmarks={setBookmarks}
                key={bookmark.id}
              />
            </div>
          ))
        ) : (
          <div className="col-12 text-center justify-content-center align-items-center m-5">
            <div className="py-5">
              <h1 className="text-muted">Looks like this page is empty 🤕</h1>
              {/* You can add some icon or image here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookmarkList;
