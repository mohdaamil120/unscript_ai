import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DroppableArea from './DroppableArea';
import Modal from './Modal';

const Page = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [droppedItems, setDroppedItems] = useState([]);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("modalData"));
    if (storedData) {
      setDroppedItems(storedData);
    }
  }, []); 

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const { offsetX, offsetY } = e.nativeEvent;
    setCoordinates({ x: offsetX, y: offsetY });
    const newItem = { id: Date.now(), type: data, x: offsetX, y: offsetY, fontSize: "initial", fontWeight: "normal" };
    const existingItemIndex = droppedItems.findIndex(item => item.type === newItem.type);
    if (existingItemIndex !== -1) {
      const updatedItems = [...droppedItems];
      updatedItems[existingItemIndex] = newItem;
      setDroppedItems(updatedItems);
      localStorage.setItem("modalData", JSON.stringify(updatedItems));
    } else {
      setDroppedItems(prevItems => [...prevItems, newItem]);
      localStorage.setItem("modalData", JSON.stringify([...droppedItems, newItem]));
      setModalIsOpen(true);
    }
  };

  const handleItemClick = (id) => {
    setSelectedItemId(id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && selectedItemId !== null) {
      setModalIsOpen(true);
    } else if (e.key === 'Delete' && selectedItemId !== null) {
      const updatedItems = droppedItems.filter(item => item.id !== selectedItemId);
      setDroppedItems(updatedItems);
      localStorage.setItem("modalData", JSON.stringify(updatedItems)); 
      setSelectedItemId(null); 
    }
  };

  const handleItemDragStart = (e, type) => {
    e.dataTransfer.setData("text/plain",type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      label: formData.get("label"),
      x: formData.get("x"),
      y: formData.get("y"),
      fontSize: formData.get("fontSize"),
      fontWeight: formData.get("fontWeight"),
    };
    const updatedItems = droppedItems.map(item => {
      if (item.id === selectedItemId) {
        return { ...item, ...newItem };
      }
      return item;
    });
    setDroppedItems(updatedItems);
    localStorage.setItem("modalData", JSON.stringify(updatedItems)); 
    setModalIsOpen(false)
  };

  return (
    <PageWrapper onKeyDown={handleKeyDown} tabIndex={0}>
      <h2>Main Page</h2>
      <DroppableArea
        onDrop={(e) => handleDrop(e)}
        droppedItems={droppedItems}
        handleItemClick={handleItemClick}
        handleItemDragStart={handleItemDragStart}
        selectedItemId={selectedItemId}
      />
      {modalIsOpen && (
        <Modal
          droppedItems={droppedItems}
          coordinates={coordinates}
          handleSubmit={handleSubmit}
          setModalIsOpen={setModalIsOpen}
          selectedItemId={selectedItemId}
        />
      )}
    </PageWrapper>
  );
};

export default Page;

const PageWrapper = styled.div`
  padding: 20px;
  color: white;
  height: 100vh;
`;
