import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 0.7rem 1.2rem;
`;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <StyledButton {...props}>
      <>{children}</>
    </StyledButton>
  );
};

export default Button;
