import React from "react";
import Editor from "@monaco-editor/react";
import styled from "styled-components";
import { useApplicationState } from "../../context/lessonContext";

const EditorContainer = styled.div`
  margin: ${(props) => props.theme.spacings.xsmall};
  flex-grow: 1;
`;

export interface AssemblerEditorProps {}

const AssemblerEditor: React.FunctionComponent<AssemblerEditorProps> = () => {
  const {
    setCode,
    state: { currentLessonNumber, lessons },
  } = useApplicationState();

  return (
    <EditorContainer>
      <Editor
        defaultLanguage="asm"
        value={lessons[currentLessonNumber]?.code ?? ""}
        onChange={(value) => setCode(value ?? "")}
      />
    </EditorContainer>
  );
};

export default AssemblerEditor;
