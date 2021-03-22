import React, { useEffect, useState } from "react";
import { useAuthentication } from "../../providers/authentication";
import Home, { CommentProps } from ".";

const CommentsContainer: React.FC = ({}) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthentication();
  const [comments, setComments] = useState<CommentProps[]>([]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/comments/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + currentUser?.token,
        },
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setComments(
        responseData.comments.map((c: any) => {
          const comment: CommentProps = {
            id: c.id,
            body: c.body,
            title: c.title,
            date: new Date(c.created_at).toLocaleString(),
          };
          return comment;
        })
      );
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return <Home comments={comments} error={error} loading={loading} />;
};

export default CommentsContainer;
