import React, { useState } from "react";
import styled from "styled-components";

import Form from "../../../components/form";

interface Props {
  error: string;
  loading: boolean;
  onActionRequest: React.Dispatch<{
    name: string;
    surname: string;
    username: string;
    password: string;
  }>;
  title: string;
}

const Signup: React.FC<Props> = ({
  error,
  loading,
  onActionRequest,
  title,
}) => {
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [surnameError, setSurnameError] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSaveRequest = () => {
    setNameError("");
    setSurnameError("");
    setUsernameError("");
    setPasswordError("");

    if (!name) {
      setNameError("Name is required");
    }
    if (!surname) {
      setSurnameError("Surname is required");
    }
    if (!username) {
      setUsernameError("Username is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }

    if (name && surname && username && password) {
      onActionRequest({ name, surname, username, password });
    }
  };

  const handleNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameError("");
    setName(e.target.value);
  };

  const handleSurnameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurnameError("");
    setSurname(e.target.value);
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
            label: "Save",
            primary: true,
            onClick: handleSaveRequest,
          },
        ]}
        inputs={[
          {
            error: nameError,
            label: "Name",
            onChange: handleNameChanged,
            type: "TEXT",
            value: name,
          },
          {
            error: surnameError,
            label: "Surname",
            onChange: handleSurnameChanged,
            type: "TEXT",
            value: surname,
          },
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

export default Signup;
