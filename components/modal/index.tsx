import React from "react";
import styled from "styled-components";
import Button from "../button";

const Backdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContainer = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  max-width: 600px;
  width: 90%;
  z-index: 11;
  color: ${(props) => props.theme.colors.text};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacings.small};

  h1 {
    padding: 0;
    margin: 0;
  }
`;

const ModalContent = styled.div`
  padding-left: ${(props) => props.theme.spacings.small};
  padding-right: ${(props) => props.theme.spacings.small};
  padding-bottom: ${(props) => props.theme.spacings.small};
`;

export interface ModalProps {
  title: string;
  onClose?: () => void;
}

const Modal: React.FunctionComponent<ModalProps & React.PropsWithChildren> = ({
  title,
  onClose,
  children,
}) => {
  return (
    <Backdrop>
      <ModalContainer>
        <ModalHeader>
          <h1>{title}</h1>
          {onClose && <Button onClick={onClose}>Close (x)</Button>}
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </Backdrop>
  );
};

export default Modal;
