import React from "react";
import styled from "styled-components";
import Item, { CtaProps as ItemCtaProps } from "./item";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface Props {
  comments: CommentProps[];
  error: string;
  loading: boolean;
}

export interface CommentProps {
  title: string;
  body: string;
}

const Home: React.FC<Props> = ({ comments, error, loading }) => {
  return (
    <Container>
      <h1>Comments</h1>
      <h1>{error}</h1>
      {loading && <h4>loading</h4>}
      {!comments.length && <b>There are no comments to show</b>}
      {comments.map((c, i) => {
        const editCta: ItemCtaProps = {
          icon: <EditIcon />,
          onClick: () => alert("User wants to edit"),
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
