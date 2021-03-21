import React, { useState } from "react";
import styled from "styled-components";

import Form from "../../../components/form";

interface Props {
  error: string;
  loading: boolean;
  onActionRequest: React.Dispatch<{ username: string; password: string }>;
  title: string;
}

const Signup: React.FC<Props> = ({
  error,
  loading,
  onActionRequest,
  title,
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSaveRequest = () => onActionRequest({ username, password });

  const handleUsernameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Container>
      <h1>{title}</h1>
      <h2>{error}</h2>
      <Form
        ctas={[
          {
            label: "Save",
            primary: true,
            onClick: handleSaveRequest,
          },
        ]}
        inputs={[
          {
            label: "Username",
            onChange: handleUsernameChanged,
            type: "TEXT",
            value: username,
          },
          {
            label: "Password",
            onChange: handlePasswordChanged,
            type: "PASSWORD",
            value: password,
          },
        ]}
      />
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

export default Signup;
