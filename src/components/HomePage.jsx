
import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Page from './Page';


const HomePage = () => {
  return (
    <Container>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainContainer>
        <Page />
      </MainContainer>
    </Container>
  );
}

export default HomePage;

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden; 
`;

const SidebarContainer = styled.div`
  width: 20%;
  background-color: #333; 
`;

const MainContainer = styled.div`
  flex: 1;
  background-color: #222; 
`;
