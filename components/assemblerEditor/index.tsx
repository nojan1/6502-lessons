import React, { useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
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
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.languages.register({ id: "6502" });

      // Register a tokens provider for the language
      monaco.languages.setMonarchTokensProvider("6502", {
        tokenizer: {
          root: [
            [/^\s*([a-zA-Z]{3})\s/, "mnemonic"],
            [/^.*:/, "label"],
            [/;.*$/, "comment"],
          ],
        },
      });

      monaco.editor.defineTheme("myTheme", {
        base: "vs",
        inherit: true,
        rules: [
          { token: "mnemonic", fontStyle: "bold", foreground: "515152" },
          { token: "label", foreground: "aaaaaa" },
          { token: "comment", foreground: "7fb376" },
        ],
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
    }
  }, [monaco]);

  return (
    <EditorContainer>
      <Editor
        defaultLanguage="6502"
        value={getCode()}
        onChange={(value) => setCode(value ?? "")}
        options={{
          fontFamily: "VT323",
          fontSize: 20,
          quickSuggestions: false,
          minimap: {
            enabled: false,
          },
        }}
        onMount={(_, monaco) => {
          monaco.editor.setTheme("myTheme");
        }}
      />
    </EditorContainer>
  );
};

export default AssemblerEditor;
