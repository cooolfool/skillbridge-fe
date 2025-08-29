import React, { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const LikeButton = ({ entityId, entityType = "project", initialCount = 0, clickable = true }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialCount);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          `${baseUrl}/${entityType}s/${entityId}/likes/status`,
          { headers: { authToken: token, Authorization: `Bearer ${token}` } }
        );
        setLiked(res.data);
      } catch (err) {
        console.error("Error fetching like status:", err);
      }
    };

    fetchStatus();
  }, [entityId, entityType]);


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
      await axios.post(url, null, {
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

export default LikeButton;
