import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;


const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User not authenticated");
  }

  return {
    authToken: token,
    Authorization: `Bearer ${token}`,
  };
};


const api = axios.create({
  baseURL: baseUrl,
});

// 🔹 Fetch comments
export const fetchComments = async (projectId) => {
  if (!projectId || isNaN(projectId)) {
    throw new Error("Invalid projectId");
  }

  const res = await api.get(`/api/comments/project/${projectId}`, {
    headers: getAuthHeaders(),
  });

  return res.data;
};

// 🔹 Add comment
export const addComment = async (commentDto) => {
  const res = await api.post(`/api/comments`, commentDto, {
    headers: getAuthHeaders(),
  });

  return res.data;
};

// 🔹 Edit comment
export const editComment = async (commentDto) => {
  const res = await api.put(`/api/comments`, commentDto, {
    headers: getAuthHeaders(),
  });

  return res.data;
};

// 🔹 Delete comment
export const deleteComment = async (commentId) => {
  if (!commentId) {
    throw new Error("Invalid commentId");
  }

  const res = await api.delete(`/api/comments/${commentId}`, {
    headers: getAuthHeaders(),
  });

  return res.data;
};