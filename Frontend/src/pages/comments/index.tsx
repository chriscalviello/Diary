import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Item, { CtaProps as ItemCtaProps } from "./item";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface Props {
  comments: CommentProps[];
  error: string;
  loading: boolean;
  onDeleteRequest: (id: string) => void;
}

export interface CommentProps {
  id: string;
  title: string;
  body: string;
  date: string;
  user: UserProps;
}

interface UserProps {
  name: string;
  surname: string;
}

const Home: React.FC<Props> = ({
  comments,
  error,
  loading,
  onDeleteRequest,
}) => {
  const history = useHistory();
  const handleAddIconClick = () => {
    history.push("/addComment");
  };
  return (
    <Container>
      <h1>Comments</h1>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleAddIconClick()}
      >
        New Comment
      </Button>
      <h1>{error}</h1>
      {loading && <h4>loading</h4>}
      {!comments.length && <b>There are no comments to show</b>}
      {comments.map((c, i) => {
        const editCta: ItemCtaProps = {
          icon: <EditIcon />,
          onClick: () => history.push("/comments/" + c.id),
        };
        const deleteCta: ItemCtaProps = {
          icon: <DeleteIcon />,
          onClick: () => onDeleteRequest(c.id),
        };
        return (
          <Comment
            key={i}
            ctas={[editCta, deleteCta]}
            title={c.title}
            body={c.body}
            date={c.date}
            user={c.user.surname + " " + c.user.name}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Comment = styled(Item)`
  margin: 1rem 0;
`;

export default Home;
