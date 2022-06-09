import React, { ReactElement } from "react";
import styled from "styled-components";

const PanelComponent = styled.div`
  flex-basis: 30%;
  margin: ${(props) => props.theme.spacings.xsmall};
  padding: ${(props) => props.theme.spacings.xsmall};
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.secondary};
`;

export interface PanelProps {
  apa?: boolean;
}

const Panel: React.FunctionComponent<PanelProps & { children: any }> = ({
  children,
}) => {
  return <PanelComponent>{children}</PanelComponent>;
};

export default Panel;
