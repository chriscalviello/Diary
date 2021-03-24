import React, { useEffect, useState } from "react";
import { useAuthentication } from "../../providers/authentication";
import Home, { CommentProps } from ".";
import { BASE_API_URL } from "../../constants";

const CommentsContainer: React.FC = ({}) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthentication();
  const [comments, setComments] = useState<CommentProps[]>([]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(BASE_API_URL + "/comments/get", {
        method: "GET",
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
            user: {
              id: c.user.id,
              name: c.user.name,
              surname: c.user.surname,
            },
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

  const deleteComment = async (id: string) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(BASE_API_URL + "/comments/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + currentUser?.token,
        },
        body: JSON.stringify({
          id,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message);
      }

      fetchComments();
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <Home
      comments={comments}
      error={error}
      loading={loading}
      onDeleteRequest={deleteComment}
    />
  );
};

export default CommentsContainer;
