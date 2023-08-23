import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

function BookmarkCard({
  bookmark,
  setEditingBookmark,
  setCurrentBookmark,
  setBookmarks,
}) {
  function handleDelete(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8080/bookmarks/${bookmark.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setBookmarks((prev) => prev.filter((b) => b.id !== bookmark.id));
      });
  }
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{bookmark.title}</Card.Title>
        <Card.Text>{bookmark.description}</Card.Text>
        <Card.Link
          href={bookmark.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Link
        </Card.Link>
      </Card.Body>
      <div className="d-flex justify-content-around p-3">
        <Button
          variant="info"
          style={{ flex: "1", width: "5rem", margin: "0.5rem" }}
          onClick={() => {
            setEditingBookmark(true);
            setCurrentBookmark(bookmark);
          }}
        >
          Edit
        </Button>

        <Button
          variant="danger"
          style={{ flex: "1", width: "5rem", margin: "0.5rem" }}
          onClick={(e) => handleDelete(e)}
        >
          {" "}
          Delete{" "}
        </Button>
      </div>
    </Card>
  );
}

export default BookmarkCard;
