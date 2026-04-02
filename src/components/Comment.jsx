import React, { useState } from "react";
import { Link } from "react-router-dom";

const Comment = ({ comment, onReply, onEdit, onDelete }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  if (!comment) return null;

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;

    await onReply({
      content: replyText,
      projectId: comment.projectId,
      parentCommentId: comment.id,
    });

    setReplyText("");
    setIsReplying(false);
  };

  const handleEditSubmit = async () => {
    if (!editText.trim()) return;

    await onEdit({
      id: comment.id,
      content: editText,
    });

    setIsEditing(false);
  };

  return (
    <div className="pl-4 border-l border-gray-200 mt-3">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm">
        <Link
          to={`/profile/${comment.userId}`}
          className="font-semibold text-blue-600 hover:underline"
        >
          {comment.userName}
        </Link>
      </div>

      {/* Content */}
      <div className="mt-1 text-gray-700 text-sm">
        {isEditing ? (
          <>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full border rounded p-1"
            />
            <button onClick={handleEditSubmit} className="text-green-600 mr-2">
              Save
            </button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <span>{comment.content}</span>
        )}
      </div>

      {/* Actions */}
      {!comment.deleted && (
        <div className="flex gap-3 text-xs text-gray-500 mt-1">
          <button onClick={() => setIsReplying(!isReplying)}>Reply</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(comment.id)}>Delete</button>
        </div>
      )}

      {/* Reply box */}
      {isReplying && (
        <div className="mt-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full border rounded p-1 text-sm"
            placeholder="Write a reply..."
          />
          <button
            onClick={handleReplySubmit}
            className="text-blue-600 text-sm mt-1"
          >
            Submit
          </button>
        </div>
      )}

      {/* Replies */}
      {comment.replies?.length > 0 && (
        <div className="mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;