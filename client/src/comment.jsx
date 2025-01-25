import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/comments";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch all comments
  const fetchComments = async () => {
    try {
      const response = await axios.get(API_URL);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Add a new comment
  const addComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post(API_URL, { text: newComment });
        setComments([...comments, response.data]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      <h2>Comment Section</h2>
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={addComment}>Add Comment</button>
      </div>
      <ul>
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            setComments={setComments}
            comments={comments}
          />
        ))}
      </ul>
    </div>
  );
};

const CommentItem = ({ comment, setComments, comments }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");

  const addReply = async () => {
    if (replyText.trim()) {
      try {
        const response = await axios.post(`${API_URL}/${comment._id}/replies`, {
          text: replyText,
        });
        setComments(
          comments.map((c) => (c._id === comment._id ? response.data : c))
        );
        setReplyText("");
      } catch (error) {
        console.error("Error adding reply:", error);
      }
    }
  };

  const deleteReply = async (replyId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/${comment._id}/replies/${replyId}`
      );
      setComments(
        comments.map((c) => (c._id === comment._id ? response.data : c))
      );
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  const deleteComment = async () => {
    try {
      await axios.delete(`${API_URL}/${comment._id}`);
      setComments(comments.filter((c) => c._id !== comment._id));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <li>
      <p>{comment.text}</p>
      <button onClick={() => setShowReplies(!showReplies)}>
        {showReplies ? "Hide Replies" : "Show Replies"}
      </button>
      <button
        onClick={deleteComment}
        style={{ marginLeft: "10px", color: "red" }}
      >
        Delete Comment
      </button>
      <div>
        <input
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write a reply..."
        />
        <button onClick={addReply}>Reply</button>
      </div>
      {showReplies && (
        <ul>
          {comment.replies.map((reply) => (
            <li key={reply._id}>
              {reply.text}
              <button onClick={() => deleteReply(reply._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default CommentSection;
