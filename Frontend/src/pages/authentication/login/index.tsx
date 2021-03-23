import React, { useState } from "react";
import styled from "styled-components";

import Form from "../../../components/form";
import Loading from "../../../components/loading";

interface Props {
  error: string;
  loading: boolean;
  onActionRequest: React.Dispatch<{ email: string; password: string }>;
  title: string;
}

const Login: React.FC<Props> = ({ error, loading, onActionRequest, title }) => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSaveRequest = () => {
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }

    if (email && password) {
      onActionRequest({ email, password });
    }
  };

  const handleEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError("");
    setEmail(e.target.value);
  };

  const handlePasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError("");
    setPassword(e.target.value);
  };

  return (
    <Container>
      <h1>{title}</h1>
      {loading && <h4>loading</h4>}
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
            error: emailError,
            label: "Email",
            onChange: handleEmailChanged,
            type: "TEXT",
            value: email,
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
