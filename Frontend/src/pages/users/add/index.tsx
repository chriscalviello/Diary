import React, { useState, useEffect, MouseEventHandler } from "react";
import styled from "styled-components";

import Form from "../../../components/form";

interface Props {
  user: User;
  error: string;
  onActionRequest: React.Dispatch<{
    email: string;
    password: string;
    name: string;
    surname: string;
  }>;
  onCancelRequest: React.DispatchWithoutAction;
  loading: boolean;
}

export interface User {
  email: string;
  password: string;
  name: string;
  surname: string;
}

const AddUser: React.FC<Props> = ({
  user,
  error,
  loading,
  onActionRequest,
  onCancelRequest,
}) => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [surnameError, setSurnameError] = useState<string>("");

  useEffect(() => {
    if (!user) {
      return;
    }
    setEmail(user.email);
    setPassword(user.password);
    setName(user.name);
    setSurname(user.surname);
  }, [user]);

  const handleSaveRequest = () => {
    setEmailError(!email ? "Email is required" : "");
    setPasswordError(!password ? "Password is required" : "");
    setNameError(!name ? "Name is required" : "");
    setSurnameError(!name ? "Surname is required" : "");

    if (email && password && name && surname) {
      onActionRequest({ email, password, name, surname });
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

  const handleNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameError("");
    setName(e.target.value);
  };

  const handleSurnameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurnameError("");
    setSurname(e.target.value);
  };

  return (
    <Container>
      <h1>New user</h1>
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
          ]}
        />
      )}
      {loading && <h4>loading</h4>}
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

export default AddUser;
