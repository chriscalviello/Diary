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
}

const Home: React.FC<Props> = ({ users, error, loading, onDeleteRequest }) => {
  const history = useHistory();
  const handleAddIconClick = () => {
    history.push("/addUser");
  };
  return (
    <Container>
      <h1>Users</h1>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleAddIconClick()}
      >
        New User
      </Button>
      <h1>{error}</h1>
      {loading && <h4>loading</h4>}
      {!users.length && <b>There are no users to show</b>}

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
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
                onClick: () => onDeleteRequest(u.id),
              };
              return (
                <User
                  key={i}
                  ctas={[editCta, deleteCta]}
                  email={u.email}
                  name={u.name}
                  surname={u.surname}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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