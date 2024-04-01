import React from 'react';
import styled from 'styled-components';

const DroppedItem = ({ style, draggable, onDragStart, onClick, isselected, children }) => {
  return (
    <Item
      style={style}
      draggable={draggable}
      onDragStart={onDragStart}
      onClick={onClick}
      isselected={isselected}
      
    >
      {children}
    </Item>
  );
};

export default DroppedItem;

const Item = styled.div`
  position: absolute;
  background-color: #666;
  color: white;
  padding: 10px;
  border-radius: 4px;
  cursor: grab;
  border: ${({ isselected }) => isselected ? '2px solid red' : 'none'};
  transition: border-color 0.3s ease; 
`;
