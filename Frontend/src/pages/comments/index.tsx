import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Item, { CtaProps as ItemCtaProps } from "./item";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Loading from "../../components/loading";
import { useAuthentication } from "../../providers/authentication";

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
  id: string;
  name: string;
  surname: string;
}

const Home: React.FC<Props> = ({
  comments,
  error,
  loading,
  onDeleteRequest,
}) => {
  const { currentUser } = useAuthentication();
  const history = useHistory();
  const handleAddIconClick = () => {
    history.push("/addComment");
  };
  const handleDeleteIconClick = (commentId: string) => {
    const r = confirm("Are you sure?");
    if (r) {
      onDeleteRequest(commentId);
    }
  };

  return (
    <Container>
      <h1>Comments</h1>

      {loading ? (
        <Loading />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleAddIconClick()}
          >
            New Comment
          </Button>
          {!comments.length && (
            <b style={{ marginTop: "1rem" }}>There are no comments to show</b>
          )}
          {comments.map((c, i) => {
            const ctas: ItemCtaProps[] =
              currentUser && c.user.id === currentUser.id
                ? [
                    {
                      icon: <EditIcon />,
                      onClick: () => history.push("/comments/" + c.id),
                    },
                    {
                      icon: <DeleteIcon />,
                      onClick: () => handleDeleteIconClick(c.id),
                    },
                  ]
                : [];
            return (
              <Comment
                key={i}
                ctas={ctas}
                title={c.title}
                body={c.body}
                date={c.date}
                user={c.user.surname + " " + c.user.name}
              />
            );
          })}
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

const Comment = styled(Item)`
  margin: 1rem 0;
`;

export default Home;
