import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Form from "../../../components/form";
import Roles from "../roles";
import Loading from "../../../components/loading";

interface Props {
  user: User;
  error: string;
  onActionRequest: React.Dispatch<User>;
  onCancelRequest: React.DispatchWithoutAction;
  loading: boolean;
  roles: string[];
}

export interface User {
  email: string;
  password: string;
  name: string;
  surname: string;
  role: string;
}

const AddUser: React.FC<Props> = ({
  user,
  error,
  loading,
  onActionRequest,
  onCancelRequest,
  roles,
}) => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [surnameError, setSurnameError] = useState<string>("");
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    if (!user) {
      return;
    }
    setEmail(user.email);
    setPassword(user.password);
    setName(user.name);
    setSurname(user.surname);
    setRole(user.role);
  }, [user]);

  const handleSaveRequest = () => {
    setEmailError(!email ? "Email is required" : "");
    setPasswordError(!password ? "Password is required" : "");
    setNameError(!name ? "Name is required" : "");
    setSurnameError(!name ? "Surname is required" : "");

    if (email && password && name && surname) {
      onActionRequest({ email, password, name, surname, role });
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

  const handleRoleChanged = (newRole: string) => {
    setRole(newRole);
  };

  return (
    <Container>
      <h1>New user</h1>
      {loading ? (
        <Loading />
      ) : error ? (
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
          extra={
            <Roles
              roles={roles}
              selectedRole={role}
              onRoleChange={handleRoleChanged}
            />
          }
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
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default AddUser;
