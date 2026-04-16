import React, { useState } from "react";
import api from "../api/api";

const LikeButton = ({
entityId,
entityType = "project",
initialCount = 0,
initialLiked = false,
clickable = true
}) => {

const [liked, setLiked] = useState(initialLiked);
const [likeCount, setLikeCount] = useState(initialCount);
const [loading, setLoading] = useState(false);

const handleLike = async () => {
  if (!clickable || loading) return;

  setLoading(true);

  try {
    const res = await api.post(`/${entityType}s/${entityId}/like-toggle`);

    setLiked(res.data.liked);
    setLikeCount(res.data.likesCount);

  } catch (err) {
    console.error("Error toggling like:", err);
  } finally {
    setLoading(false);
  }
};

return ( <div className="flex items-center gap-2">
<button
onClick={handleLike}
  disabled={!clickable || loading}
className="text-2xl focus:outline-none"
aria-label={liked ? "Unlike" : "Like"}

>
{loading ? "⏳" : liked ? "❤️" : "🤍"}</button> <span>{likeCount}</span> </div>
);
};

export default LikeButton;
