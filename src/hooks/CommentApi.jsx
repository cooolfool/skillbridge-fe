import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchComments = async (projectId) => {
   const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token, user not logged in");
  }
  const res = await axios.get(`${baseUrl}/api/comments/project/${projectId}`, {
   headers: {
          authToken: localStorage.getItem("token"),
           Authorization: `Bearer ${localStorage.getItem("token")}`
        },
  });
  return res.data;
};

export const addComment = async (commentDto,user) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token, user not logged in");
  }
  const payload= { ...commentDto, user };
  console.log("In Comment API",commentDto,user);
  const res = await axios.post(`${baseUrl}/api/comments`, payload, {
     headers: {
          authToken: localStorage.getItem("token"),
           Authorization: `Bearer ${localStorage.getItem("token")}`
        },
  });
  return res.data;
};

export const editComment = async (commentDto) => {
    const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token, user not logged in");
  }
  const res = await axios.put(`${baseUrl}/api/comments`, commentDto, {
    headers: {
          authToken: localStorage.getItem("token"),
           Authorization: `Bearer ${localStorage.getItem("token")}`
        },
  });
  return res.data;
};

export const deleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token, user not logged in");
  }
  const res = await axios.delete(`${baseUrl}/api/comments/${commentId}`, {
   headers: {
          authToken: localStorage.getItem("token"),
           Authorization: `Bearer ${localStorage.getItem("token")}`
        },
  });
  return res.data;
};
