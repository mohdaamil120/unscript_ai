import React from 'react';
import styled from 'styled-components';
import DroppedItem from './DroppedItem';

const DroppableArea = ({ onDrop, droppedItems, handleItemClick, handleItemDragStart, selectedItemId}) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <DroppableAreaContainer
      onDrop={(e) => onDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
    >
      {droppedItems.map(item => (
        <DroppedItem 
          key={item.id} 
          style={{ left: item.x, top: item.y }} 
          draggable="true"
          onDragStart={(e) => handleItemDragStart(e, item.type)}
          onClick={() => handleItemClick(item.id)} 
          isselected={selectedItemId === item.id}   
        >
          {item.type === "label" ? "This is a label" : item.type === "input" ? "This is an input" : "This is a button"}
        </DroppedItem>
      ))}
    </DroppableAreaContainer>
  );
};

export default DroppableArea;

const DroppableAreaContainer = styled.div`
  border: 2px dashed white;
  padding: 20px;
  height: calc(100vh - 80px);
  position: relative;
`;
