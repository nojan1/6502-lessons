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
  background-color: ${(props) => props.theme.colors.secondary};
  margin: ${(props) => props.theme.spacings.xsmall};
  color: ${(props) => props.theme.colors.text};

  h3 {
    margin: 0 ${(props) => props.theme.spacings.xsmall};
    padding: 0;
    display: block;
    text-align: center;
    border-bottom: 1px solid;
    padding: ${(props) => props.theme.spacings.xsmall};
  }

  pre {
    margin: ${(props) => props.theme.spacings.xsmall};
    padding: ${(props) => props.theme.spacings.xsmall};
    font-family: "VT323", monospace;
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
      {lesson.fixedCode && (
        <PreExistingCodeContainer>
          <h3>Fixed code</h3>
          <pre>{lesson.fixedCode}</pre>
        </PreExistingCodeContainer>
      )}
      <Toolbar>
        <Button onClick={onRunCode}>Assemble & Run</Button>
      </Toolbar>
      <AssemblerEditor />
    </CenterPanelContainer>
  );
};

export default CenterPanel;
