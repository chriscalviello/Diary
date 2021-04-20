import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthentication } from "../../../providers/authentication";
import { useParams } from "react-router-dom";
import Edit, { Comment } from ".";
import API from "../../../api";

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

    setLoading(true);
    setError("");

    API.get("/comments/getById?id=" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentUser?.token,
      },
    })
      .then((res) => {
        const responseData = res.data;

        if (!responseData.comment) {
          throw new Error("No comment found");
        }

        const data: Comment = {
          id: responseData.comment.id,
          body: responseData.comment.body,
          title: responseData.comment.title,
        };

        setComment(data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchComment();
  }, []);

  const saveComment = async (data: Comment) => {
    setLoading(true);
    setError("");

    API.post(
      "/comments/save",
      {
        id: data.id,
        title: data.title,
        text: data.body,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + currentUser?.token,
        },
      }
    )
      .then((res) => {
        const responseData = res.data;

        if (!responseData.comment) {
          throw new Error("Something went wrong");
        }

        history.push("/comments");
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
