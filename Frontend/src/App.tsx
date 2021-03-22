import React from "react";
import styled from "styled-components";
import {
  AuthenticationProvider,
  useAuthentication,
} from "./providers/authentication";
import CommentsContainer from "./pages/comments/container";
import EditCommentContainer from "./pages/comments/edit/container";
import LoginContainer from "./pages/authentication/login/container";
import SignupContainer from "./pages/authentication/signup/container";
import ProtectedRoute from "./protectedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PeopleIcon from "@material-ui/icons/People";
import MessageIcon from "@material-ui/icons/Message";
import Menu, { ItemProps as MenuItemProps } from "./pages/menu";

const App: React.FC = () => {
  return (
    <Router>
      <AuthenticationProvider>
        <Contents />
      </AuthenticationProvider>
    </Router>
  );
};

const Contents: React.FC = () => {
  const { currentUser } = useAuthentication();
  const menuItems: MenuItemProps[] = currentUser
    ? [
        {
          icon: <PeopleIcon />,
          label: "Users",
          url: "/users",
        },
        {
          icon: <MessageIcon />,
          label: "Comments",
          url: "/comments",
        },
      ]
    : [
        {
          icon: <LockOpenIcon />,
          label: "Login",
          url: "/login",
        },
        {
          icon: <PersonAddIcon />,
          label: "Signup",
          url: "/signup",
        },
      ];
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <h3>My Diary</h3>
        </Toolbar>
      </AppBar>
      <Content>
        <Left>
          <Menu items={menuItems} />
        </Left>
        <Right>
          <Switch>
            <Route path="/signup">
              <SignupContainer />
            </Route>
            <Route path="/login">
              <LoginContainer />
            </Route>
            <ProtectedRoute
              path="/comments/:id"
              component={EditCommentContainer}
            />
            <ProtectedRoute
              path="/addComment"
              component={EditCommentContainer}
            />
            <ProtectedRoute path="/comments" component={CommentsContainer} />
          </Switch>
        </Right>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background-color: rgb(10, 110, 140);
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const Left = styled.div`
  display: flex;
  width: 25%;
  flex-direction: column;
  background-color: #3f51b5;
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  padding: 2.5rem;
`;

export default App;
