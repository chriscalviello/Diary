import React, { useEffect, useState } from "react";
import { useAuthentication } from "../../providers/authentication";
import Home, { UserProps } from ".";

const UsersContainer: React.FC = ({}) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthentication();
  const [users, setUsers] = useState<UserProps[]>([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/users/get", {
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

      setUsers(
        responseData.users.map((u: any) => {
          const user: UserProps = {
            id: u.id,
            name: u.name,
            surname: u.surname,
            email: u.email,
          };
          return user;
        })
      );
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id: string) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/users/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + currentUser?.token,
        },
        body: JSON.stringify({
          id,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      fetchUsers();
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <Home
      users={users}
      error={error}
      loading={loading}
      onDeleteRequest={deleteUser}
    />
  );
};

export default UsersContainer;
