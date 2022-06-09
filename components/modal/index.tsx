import React from "react";
import styled from "styled-components";

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
  padding: ${(props) => props.theme.spacings.small};
`;

export interface ModalProps {
  title: string;
  onClose?: () => void;
}

const Modal: React.FunctionComponent<ModalProps & React.PropsWithChildren> = ({
  onClose,
  children,
}) => {
  return (
    <Backdrop>
      <ModalContainer>{children}</ModalContainer>
    </Backdrop>
  );
};

export default Modal;
