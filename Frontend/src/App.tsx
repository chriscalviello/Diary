import React from 'react'
import styled from 'styled-components'
import Home from './pages/home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}

const Container = styled.div`
  background-color: rgb(10, 110, 140);
  padding: 2.5vh 15vw;
  display: flex;
  flex: 1;
`

export default App
