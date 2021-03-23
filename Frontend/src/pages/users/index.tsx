import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Item, { CtaProps as ItemCtaProps } from "./item";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Loading from "../../components/loading";

interface Props {
  users: UserProps[];
  error: string;
  loading: boolean;
  onDeleteRequest: (id: string) => void;
}

export interface UserProps {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: string;
}

const Home: React.FC<Props> = ({ users, error, loading, onDeleteRequest }) => {
  const history = useHistory();
  const handleAddIconClick = () => {
    history.push("/addUser");
  };
  const handleDeleteIconClick = (userId: string) => {
    const r = confirm("Are tou sure?");
    if (r) {
      onDeleteRequest(userId);
    }
  };

  return (
    <Container>
      <h1>Users</h1>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <>
          {loading && <Loading />}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleAddIconClick()}
            style={{ marginBottom: "1rem" }}
          >
            New User
          </Button>
          {users.length ? (
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Surname</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((u, i) => {
                    const editCta: ItemCtaProps = {
                      icon: <EditIcon />,
                      onClick: () => history.push("/users/" + u.id),
                    };
                    const deleteCta: ItemCtaProps = {
                      icon: <DeleteIcon />,
                      onClick: () => handleDeleteIconClick(u.id),
                    };
                    return (
                      <User
                        key={i}
                        ctas={[editCta, deleteCta]}
                        email={u.email}
                        name={u.name}
                        surname={u.surname}
                        role={u.role}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <b>There are no users to show</b>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const User = styled(Item)`
  margin: 1rem 0;
`;

export default Home;
