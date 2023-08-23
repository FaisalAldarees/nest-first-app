import BookmarkForm from "./BookmarkForm";

function CreateBookmark({ token, setCreatingBookmark }) {
  return (
    <BookmarkForm
      token={token}
      setCreatingBookmark={setCreatingBookmark}
      action="create"
    />
  );
}

export default CreateBookmark;
