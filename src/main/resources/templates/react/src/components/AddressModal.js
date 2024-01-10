import React from "react";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  height: auto;
  max-height: 80vh;
  overflow-y: auth;
`;

const AddressModal = ({ onClose, children }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        {children}
        <button onClick={onClose}>닫기</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddressModal;
