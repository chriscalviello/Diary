import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const Home: React.FC = () => {
  const history = useHistory()

  return (
    <Container>
      <h1>Hello world!</h1>
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
  text-align: center;
`

export default Home
