// src/components/Comment.jsx
import React from "react";
import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
  if (!comment || comment.deleted) return null; // skip deleted comments

  return (
    <div className="pl-4 border-l border-gray-200 mt-2">
      {/* User and Comment */}
      <div className="flex items-start space-x-2">
        <Link
          to={`/profile/${comment.userId}`}
          className="font-medium text-blue-600 hover:underline"
        >
          {comment.userName}
        </Link>
        <span className="text-gray-700">{comment.content}</span>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
