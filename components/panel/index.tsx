import React, { ReactElement } from "react";
import styled from "styled-components";

const PanelComponent = styled.div`
  min-width: 400px;
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
