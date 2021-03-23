import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthentication } from "../../../providers/authentication";
import Add, { User } from ".";

const AddUserContainer: React.FC = ({}) => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthentication();
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    name: "",
    surname: "",
    role: "",
  });
  const [roles, setRoles] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/users/getRoles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + currentUser?.token,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      const roles = Object.values(responseData.roles) as string[];
      if (!responseData.roles || !roles.length) {
        throw new Error("No user's roles found");
      }

      setRoles(roles);
      setUser((old) => {
        return {
          ...old,
          role: roles[0],
        };
      });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveUser = async (data: User) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/users/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + currentUser?.token,
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          name: data.name,
          surname: data.surname,
          role: data.role,
        }),
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      if (!responseData.user) {
        throw new Error("Something went wrong");
      }

      history.push("/users");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const goToList = () => {
    history.push("/users");
  };

  return (
    <Add
      user={user}
      error={error}
      loading={loading}
      onActionRequest={saveUser}
      onCancelRequest={goToList}
      roles={roles}
    />
  );
};

export default AddUserContainer;
