
import React from 'react';
import styled from 'styled-components';


const Sidebar = () => {
  const handleDragStart = (e, text) => {
    e.dataTransfer.setData("text/plain", text);
  };

  return (
    <SidebarWrapper>
      <h2>Sidebar</h2>
      <ul>
        <DraggableItem draggable onDragStart={(e) => handleDragStart(e, "label")}>
          Label
        </DraggableItem>
        <DraggableItem draggable onDragStart={(e) => handleDragStart(e, "input")}>
          Input
        </DraggableItem>
        <DraggableItem draggable onDragStart={(e) => handleDragStart(e, "button")}>
          Button
        </DraggableItem>
      </ul>
    </SidebarWrapper>
  );
}

export default Sidebar;


const SidebarWrapper = styled.div`
  padding: 20px;
  color: white;
`;

const DraggableItem = styled.li`
  cursor: grab;
  margin-top: 20px;
  
`;



