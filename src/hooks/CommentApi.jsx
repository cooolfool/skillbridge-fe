import api from "../api/api";

// Fetch comments
export const fetchComments = async (projectId) => {
if (!projectId || isNaN(projectId)) {
throw new Error("Invalid projectId");
}

const res = await api.get(`/api/comments/project/${projectId}`);
return res.data;
};

// Add comment
export const addComment = async (commentDto) => {
const res = await api.post(`/api/comments`, commentDto);
return res.data;
};

// Edit comment
export const editComment = async (commentDto) => {
const res = await api.put(`/api/comments`, commentDto);
return res.data;
};

// Delete comment
export const deleteComment = async (commentId) => {
if (!commentId) {
throw new Error("Invalid commentId");
}

const res = await api.delete(`/api/comments/${commentId}`);
return res.data;
};
