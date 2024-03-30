import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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


  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   const data = e.dataTransfer.getData("text/plain");
  //   const { offsetX, offsetY } = e.nativeEvent;
  //   setCoordinates({ x: offsetX, y: offsetY });
  //   const newItem = {id: Date.now(), type: data, x: offsetX, y: offsetY, fontSize: "initial", fontWeight: "normal",};
  //   setDroppedItems(prevItems => [...prevItems, newItem]);
  //   setModalIsOpen(true);
  // };


  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const { offsetX, offsetY } = e.nativeEvent;
    if (data !== "") {
      setCoordinates({ x: offsetX, y: offsetY });
      const newItem = { id: Date.now(), type: data, x: offsetX, y: offsetY, fontSize: "initial", fontWeight: "normal" };
      // Check if the dropped item already exists in droppedItems
      const existingItemIndex = droppedItems.findIndex(item => item.type === newItem.type);
      if (existingItemIndex !== -1) {
        // Updating the coordinates of the existing item
        const updatedItems = [...droppedItems];
        updatedItems[existingItemIndex] = newItem;
        setDroppedItems(updatedItems);
        localStorage.setItem("modalData", JSON.stringify(updatedItems));
      } else {
        // Add the new item to droppedItems
        setDroppedItems(prevItems => [...prevItems, newItem]);
        localStorage.setItem("modalData", JSON.stringify([...droppedItems, newItem]));
        setModalIsOpen(true); 
      }
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


  const handleDragOver = (e) => {
    e.preventDefault();
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
      </DroppableArea>
      {modalIsOpen && (
        <ModalBackdrop>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Modal</ModalTitle>
              <ModalCloseButton onClick={() => setModalIsOpen(false)}>
                &times;
              </ModalCloseButton>
            </ModalHeader>
            <ModalForm onSubmit={handleSubmit}>
              <ModalLabel>Label:</ModalLabel>
              <ModalInput
                type="text"
                name="label"
                defaultValue={droppedItems[droppedItems.length - 1]?.type === "label" ? "This is a label" : droppedItems[droppedItems.length - 1]?.type === "input" ? "This is an input" : "This is a button"}
              />
              <ModalLabel>X Coordinate:</ModalLabel>
              <ModalInput
                type="text"
                name="x"
                defaultValue={coordinates.x}
                // readOnly
              />
              <ModalLabel>Y Coordinate:</ModalLabel>
              <ModalInput
                type="text"
                name="y"
                defaultValue={coordinates.y}
                // readOnly
              />
              <ModalLabel>Font Size:</ModalLabel>
              <ModalInput
                type="text"
                name="fontSize"
                placeholder="Enter font size"
              />
              <ModalLabel>Font Weight:</ModalLabel>
              <ModalInput
                type="text"
                name="fontWeight"
                placeholder="Enter font weight"
              />
              <ModalSubmitButton type="submit">Save Changes</ModalSubmitButton>
            </ModalForm>
          </ModalContent>
        </ModalBackdrop>
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

const DroppableArea = styled.div`
  border: 2px dashed white;
  padding: 20px;
  /* height: calc(100vh - 80px); */
  height: calc(100vh - 16vh);
  position: relative;
`;

const DroppedItem = styled.div`
  position: absolute;
  background-color: #666;
  color: white;
  padding: 10px;
  border-radius: 4px;
  cursor: grab; /* Enable grabbing for drag and drop */
  border: ${({ isselected }) => isselected ? '2px solid red' : 'none'}; 
  transition: border-color 0.3s ease; 
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #333;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  color: white;
  margin: 0;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ModalLabel = styled.label`
  color: white;
  margin-bottom: 10px;
`;

const ModalInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #888;
  margin-bottom: 10px;
`;

const ModalSubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
`;
