import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthentication } from "../../../providers/authentication";
import { useParams } from "react-router-dom";
import Edit, { User } from ".";

interface ParamTypes {
  id: string;
}

const EditUserContainer: React.FC = ({}) => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthentication();
  const { id } = useParams<ParamTypes>();
  const [user, setUser] = useState<User>({
    id: "",
    email: "",
    name: "",
    surname: "",
  });

  const fetchUser = async () => {
    if (!id) {
      return;
    }
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/users/get?id=" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + currentUser?.token,
          },
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      if (!responseData.users || !responseData.users.length) {
        throw new Error("No user found");
      }

      const data: User = {
        id: responseData.users[0].id,
        email: responseData.users[0].email,
        name: responseData.users[0].name,
        surname: responseData.users[0].surname,
      };

      setUser(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
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
          id: data.id,
          email: data.email,
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
    <Edit
      user={user}
      error={error}
      loading={loading}
      onActionRequest={saveUser}
      onCancelRequest={goToList}
    />
  );
};

export default EditUserContainer;
