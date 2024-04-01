
import React from 'react';
import styled from 'styled-components';
import { CiGrid41 } from "react-icons/ci";

const Sidebar = () => {
  const handleDragStart = (e, text) => {
    e.dataTransfer.setData("text/plain", text);
  };

  return (
    <SidebarWrapper>
      <h2>Blocks</h2>
       <DraggableItem draggable onDragStart={(e) => handleDragStart(e, "label")}>
       <CiGrid41 /> Label
        </DraggableItem>
        <DraggableItem draggable onDragStart={(e) => handleDragStart(e, "input")}>
        <CiGrid41 /> Input
        </DraggableItem>
        <DraggableItem draggable onDragStart={(e) => handleDragStart(e, "button")}>
        <CiGrid41 /> Button
        </DraggableItem>
    </SidebarWrapper>
  );
}

export default Sidebar;


const SidebarWrapper = styled.div`
  padding: 20px;
  color: white;
`;

const DraggableItem = styled.div`
  cursor: grab;
  margin-top: 20px;
  border: 1px solid white;
  background-color: white;
  color: gray;
  border-radius: 2px;
  padding: 5px 25px 5px 1px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: 5px;
`;



