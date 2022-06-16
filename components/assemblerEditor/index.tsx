import React from "react";
import Editor from "@monaco-editor/react";
import styled from "styled-components";
import { useApplicationState } from "../../context/lessonContext";
import theme from "../../theme";

const EditorContainer = styled.div`
  margin: ${(props) => props.theme.spacings.xsmall};
  flex-grow: 1;
`;

export interface AssemblerEditorProps {}

const AssemblerEditor: React.FunctionComponent<AssemblerEditorProps> = () => {
  const { setCode, getCode } = useApplicationState();

  return (
    <EditorContainer>
      <Editor
        defaultLanguage="asm"
        value={getCode()}
        onChange={(value) => setCode(value ?? "")}
        options={{
          fontFamily: "VT323",
          fontSize: 20,
          minimap: {
            enabled: false,
          },
        }}
        onMount={(_, monaco) => {
          monaco.editor.defineTheme("myTheme", {
            base: "vs",
            inherit: true,
            rules: [{ token: "", background: "EDF9FA" }],
            colors: {
              "editor.foreground": theme.colors.text,
              "editor.background": theme.colors.secondary,
              "editorCursor.foreground": theme.colors.text,
              "editor.lineHighlightBackground": theme.colors.secondary,
              "editorLineNumber.foreground": theme.colors.text,
              "editor.selectionBackground": "#88000030",
              "editor.inactiveSelectionBackground": "#88000015",
            },
          });

          monaco.editor.setTheme("myTheme");
        }}
      />
    </EditorContainer>
  );
};

export default AssemblerEditor;
