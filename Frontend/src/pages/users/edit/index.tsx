import React, { useState, useEffect, MouseEventHandler } from "react";
import styled from "styled-components";

import Form from "../../../components/form";

interface Props {
  user: User;
  error: string;
  onActionRequest: React.Dispatch<{
    id: string;
    email: string;
    name: string;
    surname: string;
  }>;
  onCancelRequest: React.DispatchWithoutAction;
  loading: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
}

const EditUser: React.FC<Props> = ({
  user,
  error,
  loading,
  onActionRequest,
  onCancelRequest,
}) => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [surnameError, setSurnameError] = useState<string>("");

  useEffect(() => {
    if (!user) {
      return;
    }
    setEmail(user.email);
    setName(user.name);
    setSurname(user.surname);
  }, [user]);

  const handleSaveRequest = () => {
    setEmailError(!email ? "Email is required" : "");
    setNameError(!name ? "Name is required" : "");
    setSurnameError(!name ? "Surname is required" : "");

    if (email && name && surname) {
      onActionRequest({ id: user.id, email, name, surname });
    }
  };

  const handleEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError("");
    setEmail(e.target.value);
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
      <h1>Edit user</h1>
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

export default EditUser;
