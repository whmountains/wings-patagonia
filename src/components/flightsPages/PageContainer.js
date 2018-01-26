import React from 'react'
import styled from 'react-emotion'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
`

const PageContainer = ({ children }) => {
  return <Container>{children}</Container>
}

export default PageContainer
