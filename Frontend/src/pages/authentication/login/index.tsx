import React, { useState } from "react";
import styled from "styled-components";

import Form from "../../../components/form";

interface Props {
  error: string;
  loading: boolean;
  onActionRequest: React.Dispatch<{ username: string; password: string }>;
  title: string;
}

const Login: React.FC<Props> = ({ error, loading, onActionRequest, title }) => {
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSaveRequest = () => {
    setUsernameError("");
    setPasswordError("");

    if (!username) {
      setUsernameError("Username is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }

    if (username && password) {
      onActionRequest({ username, password });
    }
  };

  const handleUsernameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameError("");
    setUsername(e.target.value);
  };

  const handlePasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError("");
    setPassword(e.target.value);
  };

  return (
    <Container>
      <h1>{title}</h1>
      <h2>{error}</h2>
      <Form
        ctas={[
          {
            label: "Send",
            primary: true,
            onClick: handleSaveRequest,
          },
        ]}
        inputs={[
          {
            error: usernameError,
            label: "Username",
            onChange: handleUsernameChanged,
            type: "TEXT",
            value: username,
          },
          {
            error: passwordError,
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

export default Login;
