import React, { useEffect, useState } from "react";
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
  });

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
    />
  );
};

export default AddUserContainer;
