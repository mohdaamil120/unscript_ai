import React from 'react';
import styled from 'styled-components';

const Modal = ({ droppedItems, coordinates, handleSubmit, setModalIsOpen, selectedItemId }) => {
  return (
    
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
  );
};

export default Modal;

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