import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthentication } from "../../../providers/authentication";
import Add, { User } from ".";
import API from "../../../api";

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

  const fetchData = () => {
    setLoading(true);
    setError("");

    API.get("/users/getRoles", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentUser?.token,
      },
    })
      .then((res) => {
        const responseData = res.data;

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
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveUser = async (data: User) => {
    setLoading(true);
    setError("");

    API.post(
      "/users/save",
      {
        email: data.email,
        password: data.password,
        name: data.name,
        surname: data.surname,
        role: data.role,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + currentUser?.token,
        },
      }
    )
      .then((res) => {
        const responseData = res.data;

        if (!responseData.user) {
          throw new Error("Something went wrong");
        }

        history.push("/users");
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
