import React, { useState } from "react";
import styled from "styled-components";

import Form from "../../../components/form";

interface Props {
  error: string;
  loading: boolean;
  onActionRequest: React.Dispatch<{
    name: string;
    surname: string;
    email: string;
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
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSaveRequest = () => {
    setNameError("");
    setSurnameError("");
    setEmailError("");
    setPasswordError("");

    if (!name) {
      setNameError("Name is required");
    }
    if (!surname) {
      setSurnameError("Surname is required");
    }
    if (!email) {
      setEmailError("Email is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }

    if (name && surname && email && password) {
      onActionRequest({ name, surname, email, password });
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

export default Signup;
