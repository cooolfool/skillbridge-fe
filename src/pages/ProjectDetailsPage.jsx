import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/HeaderApplication";
import Footer from "../components/FooterApplication";
import useFetchProfile from "../hooks/useFetchProfile";
import LikeButton from "../components/likeButton";
import Comment from "../components/Comment"; // <-- new component
import { fetchComments, addComment, editComment, deleteComment } from "../hooks/CommentApi"; 

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]); // <-- new
  const navigate = useNavigate();
  const { user } = useFetchProfile();
  const [newComment, setNewComment] = useState("");
  // Fetch project
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseUrl}/project/${id}`, {
          headers: {
            authToken: token,
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.data) {
          navigate("/home");
        } else {
          setProject(res.data);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        navigate("/home");
      }
    };

    fetchProject();
  }, [id, navigate]);

  // Fetch comments separately
  useEffect(() => {
    if (id) {
      fetchComments(id).then(setComments).catch((e) => console.error(e));
    }
  }, [id]);


  // Handlers
  const handleAdd = async (commentDto) => {
    
    console.log("In Project Details Page",commentDto,user);
    await addComment(commentDto,user);
    const updated = await fetchComments(id);
    setComments(updated);
  };

  const handleEdit = async (commentDto) => {
    await editComment(commentDto);
    const updated = await fetchComments(id);
    setComments(updated);
  };

  const handleDelete = async (commentId) => {
    await deleteComment(commentId);
    const updated = await fetchComments(id);
    setComments(updated);
  };

  if (!project) {
    return <div className="p-4 text-center">Loading project...</div>;
  }

  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-8 bg-white shadow-lg rounded-xl mt-8 mb-8 border border-indigo-100">
        {/* Title */}
        <h1 className="text-3xl font-bold text-black-700 mb-4">{project.title}</h1>

        {/* Description */}
        <p className="text-gray-800 text-base leading-relaxed mb-8 whitespace-pre-line">
          {project.description}
        </p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-800">
          <div>
            <p className="font-semibold text-gray-500">Posted On:</p>
            <p>{new Date(project.createdAt).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-500">Posted By:</p>
            <Link
              to={`/profile/${project.createdBy?.id}`}
              className="text-indigo-600 hover:underline"
            >
              {project.createdBy?.name}
            </Link>
          </div>

          <div>
            <p className="font-semibold text-gray-500">Repository:</p>
            <a
              href={project.repoUrl}
              className="text-blue-600 hover:underline break-all"
              target="_blank"
              rel="noreferrer"
            >
              {project.repoUrl}
            </a>
          </div>

          {/* Tech Stack */}
          <div className="sm:col-span-2 mt-2">
            <p className="font-semibold text-gray-500 mb-2">Tech Stack:</p>
            <div className="flex flex-wrap gap-2">
              {project.tags?.split(",").map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Likes */}
        <div className="mt-6">
          <p className="font-semibold text-gray-500">Likes:</p>
          <LikeButton
            entityId={project.id}
            entityType="project"
            initialCount={project.likesCount || 0}
          />
        </div>

    {/* Comments */}
<div className="mt-8">
  <h2 className="text-xl font-semibold text-gray-700 mb-4">Comments</h2>

  {/* New Comment Form */}
  <div className="mb-6">
    <textarea
      className="w-full border rounded-lg p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      placeholder="Write a comment..."
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
    />
    <button
      onClick={async () => {
        if (!newComment.trim()) return;
        await handleAdd({ content: newComment, projectId: id },user);
        setNewComment(""); // clear box
      }}
      className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
    >
      Add Comment
    </button>
  </div>

  {/* Existing Comments */}
  {comments.length > 0 ? (
    comments.map((c) => (
      <Comment
        key={c.id}
        comment={c}
        onReply={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ))
  ) : (
    <p className="text-gray-500">No comments yet.</p>
  )}
</div>


        {/* Edit Button (only for owner) */}
        {user?.id === project.createdBy?.id && (
          console.log("User is the owner, showing edit button"),
          <div className="flex justify-end mt-6">
            <Link
              to={`/edit-project/${project.id}`}
              className="btn btn-primary"
            >
              Edit Project
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default ProjectDetails;
