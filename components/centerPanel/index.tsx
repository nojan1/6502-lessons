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
    margin: ${(props) => props.theme.spacings.xsmall};
    color: ${(props) => props.theme.colors.text};
  }
`;

const Toolbar = styled.div`
  text-align: right;
  margin-bottom: ${(props) => props.theme.spacings.xsmall};
  margin-right: ${(props) => props.theme.spacings.xsmall};
`;

export interface CenterPanelProps {
  lesson: ILesson;
  onRunCode: () => void;
}

const CenterPanel: React.FunctionComponent<CenterPanelProps> = ({
  lesson,
  onRunCode,
}) => {
  return (
    <CenterPanelContainer>
      <PreExistingCodeContainer>
        <pre>{lesson.fixedCode}</pre>
      </PreExistingCodeContainer>
      <Toolbar>
        <Button onClick={onRunCode}>Assemble & Run</Button>
      </Toolbar>
      <AssemblerEditor />
    </CenterPanelContainer>
  );
};

export default CenterPanel;
