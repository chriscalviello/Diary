import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthentication } from "../../../providers/authentication";
import { useParams } from "react-router-dom";
import Edit, { User } from ".";
import API from "../../../api";
import axios from "axios";

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
    role: "",
  });
  const [roles, setRoles] = useState<string[]>([]);

  const fetchData = async () => {
    if (!id) {
      return;
    }

    setLoading(true);
    setError("");

    axios
      .all([
        API.get("/users/get?id=" + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + currentUser?.token,
          },
        }),
        API.get("/users/getRoles", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + currentUser?.token,
          },
        }),
      ])
      .then(
        axios.spread((responseData, responseRoles) => {
          if (!responseData.data.users || !responseData.data.users.length) {
            throw new Error("No user found");
          }

          const roles = Object.values(responseRoles.data.roles) as string[];
          if (!responseRoles.data.roles || !roles.length) {
            throw new Error("No user's roles found");
          }

          const data: User = {
            id: responseData.data.users[0].id,
            email: responseData.data.users[0].email,
            name: responseData.data.users[0].name,
            surname: responseData.data.users[0].surname,
            role: responseData.data.users[0].role,
          };

          setUser(data);
          setRoles(roles);
        })
      )
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
        id: data.id,
        email: data.email,
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
    <Edit
      user={user}
      error={error}
      loading={loading}
      onActionRequest={saveUser}
      onCancelRequest={goToList}
      roles={roles}
    />
  );
};

export default EditUserContainer;
