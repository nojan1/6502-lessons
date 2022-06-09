import React from "react";
import Editor from "@monaco-editor/react";

export interface AssemblerEditorProps {
  defaultCode: string;
}

const AssemblerEditor: React.FunctionComponent<AssemblerEditorProps> = ({
  defaultCode,
}) => {
  return <Editor defaultLanguage="asm" defaultValue={defaultCode} />;
};

export default AssemblerEditor;
