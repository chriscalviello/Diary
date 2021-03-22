import React, { MouseEventHandler } from "react";
import styled from "styled-components";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

interface Props {
  title: string;
}

const Topbar: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <Container {...rest}>
      <AppBar position="static">
        <Toolbar>
          <h3>{title}</h3>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

const Container = styled.div`
  flex: 0;
  display: flex;
`;

export default Topbar;
