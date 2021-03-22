import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Item, { CtaProps as ItemCtaProps } from "./item";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface Props {
  comments: CommentProps[];
  error: string;
  loading: boolean;
}

export interface CommentProps {
  id: string;
  title: string;
  body: string;
}

const Home: React.FC<Props> = ({ comments, error, loading }) => {
  const history = useHistory();
  const handleAddIconClick = () => {
    history.push("/addComment");
  };
  return (
    <Container>
      <h1>Comments</h1>
      <AddIcon onClick={() => handleAddIconClick()} />
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
          onClick: () => alert("User wants to delete"),
        };
        return (
          <Comment
            key={i}
            ctas={[editCta, deleteCta]}
            title={c.title}
            body={c.body}
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
  justify-content: center;
  align-content: space-between;
  text-align: center;
`;

const Comment = styled(Item)`
  margin: 1rem 0;
`;

export default Home;
