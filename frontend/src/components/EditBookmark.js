import BookmarkForm from "./BookmarkForm";

function EditBookmark({
  setEditingBookmark,
  currentBookmark,
  setCurrentBookmark,
}) {
  return (
    <BookmarkForm
      setEditingBookmark={setEditingBookmark}
      currentBookmark={currentBookmark}
      setCreatingBookmark={setCurrentBookmark}
      action="edit"
    />
  );
}

export default EditBookmark;
