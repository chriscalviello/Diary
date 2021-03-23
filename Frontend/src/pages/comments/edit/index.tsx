import React, { useState, useEffect, MouseEventHandler } from "react";
import styled from "styled-components";

import Form from "../../../components/form";
import Loading from "../../../components/loading";

interface Props {
  comment: Comment;
  error: string;
  onActionRequest: React.Dispatch<{
    id: string | null;
    title: string;
    body: string;
  }>;
  onCancelRequest: React.DispatchWithoutAction;
  loading: boolean;
}

export interface Comment {
  id: string | null;
  title: string;
  body: string;
}

const AddComment: React.FC<Props> = ({
  comment,
  error,
  loading,
  onActionRequest,
  onCancelRequest,
}) => {
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [bodyError, setBodyError] = useState<string>("");

  useEffect(() => {
    setTitle(comment.title);
    setBody(comment.body);
  }, [comment]);

  const handleSaveRequest = () => {
    setTitleError(!title ? "Title is required" : "");
    setBodyError(!body ? "Body is required" : "");

    if (title && body) {
      onActionRequest({ id: comment.id, title, body });
    }
  };

  const handleTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError("");
    setTitle(e.target.value);
  };

  const handleBodyChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBodyError("");
    setBody(e.target.value);
  };

  return (
    <Container>
      <h1>{comment.id ? "Edit comment" : "New comment"}</h1>
      {loading && <Loading />}
      {error ? (
        <h1>{error}</h1>
      ) : (
        <Form
          ctas={[
            {
              label: "Save",
              primary: true,
              onClick: handleSaveRequest,
            },
            {
              label: "Cancel",
              onClick: onCancelRequest,
            },
          ]}
          inputs={[
            {
              error: titleError,
              label: "Title",
              onChange: handleTitleChanged,
              type: "TEXT",
              value: title,
            },
            {
              error: bodyError,
              label: "Body",
              onChange: handleBodyChanged,
              type: "TEXTAREA",
              rows: 5,
              value: body,
            },
          ]}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
  text-align: center;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface InputProps {
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value: string;
}

interface TextProps extends InputProps {
  type: "TEXT";
}

interface TextareaProps extends InputProps {
  rows: number;
  type: "TEXTAREA";
}

type InputType = TextProps | TextareaProps;

interface CtaProps {
  primary?: boolean;
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default AddComment;
