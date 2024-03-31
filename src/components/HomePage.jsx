import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Page from './Page';
import { FaBars, FaTimes } from 'react-icons/fa';


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

 

  const exportPageConfiguration = () => {
    const pageConfiguration = localStorage.getItem("modalData"); 
    const json = JSON.stringify(pageConfiguration); // Convert data to JSON format
    const blob = new Blob([json], { type: 'application/json' }); // Create a Blob object
    const url = URL.createObjectURL(blob); // Create a URL for the Blob object
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page_configuration.json'; // Set filename for the exported JSON file
    a.click();
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
        <ExportButton onClick={exportPageConfiguration}>Export Configuration</ExportButton>
      </MainContainer>
    </Container>
  );
};

export default HomePage;



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


const ExportButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 20px;
  margin-left: 20px;
`