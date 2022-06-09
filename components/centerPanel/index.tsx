import React from "react";
import styled from "styled-components";
import { ILesson } from "../../lessons";
import AssemblerEditor from "../assemblerEditor";
import Button from "../button";

const CenterPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const PreExistingCodeContainer = styled.div`
  pre {
    padding: ${(props) => props.theme.spacings.small};
    background-color: ${(props) => props.theme.colors.secondary};
    font-family: monospace;
    margin: ${(props) => props.theme.spacings.small};
  }
`;

const Toolbar = styled.div`
  text-align: right;
`;

export interface CenterPanelProps {
  lesson: ILesson;
}

const CenterPanel: React.FunctionComponent<CenterPanelProps> = ({ lesson }) => {
  return (
    <CenterPanelContainer>
      <PreExistingCodeContainer>
        <pre>{lesson.fixedCode}</pre>
      </PreExistingCodeContainer>
      <Toolbar>
        <Button>Assemble & Run</Button>
      </Toolbar>
      <AssemblerEditor defaultCode={lesson.defaultCode} />
    </CenterPanelContainer>
  );
};

export default CenterPanel;
