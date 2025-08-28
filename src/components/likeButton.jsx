const LikeButton = ({ entityId, entityType = "project", initialCount = 0, clickable = true }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialCount);

  // ... your existing useEffect to fetch likes

  const toggleLike = async () => {
    if (!clickable) return; // ignore clicks if not clickable

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to like.");
      return;
    }

    const url = liked
      ? `${baseUrl}/${entityType}s/${entityId}/unlike`
      : `${baseUrl}/${entityType}s/${entityId}/like`;

    try {
      await axios.post(url, {}, {
        headers: {
          authToken: token,
          Authorization: `Bearer ${token}`,
        }
      });
      setLiked(!liked);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleLike}
        className="text-2xl focus:outline-none"
        aria-label={liked ? "Unlike" : "Like"}
        disabled={!clickable} // disables pointer events when not clickable
      >
        {liked ? "❤️" : "🤍"}
      </button>
      <span>{likeCount}</span>
    </div>
  );
};
