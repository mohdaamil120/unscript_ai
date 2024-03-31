import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Page from './Page';
import { FaBars, FaTimes } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const SidebarContainer = styled.div`
  min-width: 12%;
  background-color: #333;
`;

const MainContainer = styled.div`
  flex: 1;
  background-color: #222;
  position: relative;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  z-index: 999;
`;

const HomePage = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    // Function to set initial sidebar state based on screen width
    const setInitialSidebarState = () => {
      setShowSidebar(window.innerWidth > 580); // Set showSidebar to true if screen width is greater than 580px
    };

    setInitialSidebarState();

    const handleResize = () => {
      setShowSidebar(window.innerWidth > 580);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Container>
      {showSidebar ? (
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
      ) : null}
      <MainContainer>
        <ToggleButton onClick={toggleSidebar}>
          {showSidebar ? <FaTimes /> : <FaBars />}
        </ToggleButton>
        <Page />
      </MainContainer>
    </Container>
  );
};

export default HomePage;
