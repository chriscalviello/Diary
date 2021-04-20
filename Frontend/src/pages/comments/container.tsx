import React, { useEffect, useState } from "react";
import { useAuthentication } from "../../providers/authentication";
import Home, { CommentProps } from ".";
import API from "../../api";

const CommentsContainer: React.FC = ({}) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthentication();
  const [comments, setComments] = useState<CommentProps[]>([]);

  const fetchComments = async () => {
    setLoading(true);
    setError("");

    API.get("/comments/get", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentUser?.token,
      },
    })
      .then((res) => {
        const responseData = res.data;
        setComments(
          responseData.comments.map((c: any) => {
            const comment: CommentProps = {
              id: c.id,
              body: c.body,
              title: c.title,
              date: new Date(c.created_at).toLocaleString(),
              author: {
                id: c.user.id,
                name: c.user.name,
                surname: c.user.surname,
              },
            };
            return comment;
          })
        );
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const deleteComment = async (id: string) => {
    setLoading(true);
    setError("");

    API.post(
      "/comments/delete",
      { id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + currentUser?.token,
        },
      }
    )
      .then(() => {
        fetchComments();
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
