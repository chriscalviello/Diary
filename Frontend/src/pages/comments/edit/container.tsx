import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthentication } from "../../../providers/authentication";
import { useParams } from "react-router-dom";
import Edit, { Comment } from ".";

interface ParamTypes {
  id: string;
}

const EditCommentContainer: React.FC = ({}) => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthentication();
  const { id } = useParams<ParamTypes>();
  const [comment, setComment] = useState<Comment>({
    id: null,
    title: "",
    body: "",
  });

  const fetchComment = async () => {
    if (!id) {
      return;
    }
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/comments/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + currentUser?.token,
        },
        body: JSON.stringify({
          id,
        }),
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      if (!responseData.comments || !responseData.comments.length) {
        throw new Error("No comment found");
      }

      const data: Comment = {
        id: responseData.comments[0].id,
        body: responseData.comments[0].body,
        title: responseData.comments[0].title,
      };

      setComment(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComment();
  }, []);

  const saveComment = async (data: Comment) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/comments/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + currentUser?.token,
        },
        body: JSON.stringify({
          id: data.id,
          title: data.title,
          text: data.body,
        }),
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      if (!responseData.comment) {
        throw new Error("Something went wrong");
      }

      history.push("/comments");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const goToList = () => {
    history.push("/comments");
  };

  return (
    <Edit
      comment={comment}
      error={error}
      loading={loading}
      onActionRequest={saveComment}
      onCancelRequest={goToList}
    />
  );
};

export default EditCommentContainer;
