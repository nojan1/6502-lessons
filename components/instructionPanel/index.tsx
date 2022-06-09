import Markdown from "markdown-to-jsx";
import React from "react";
import { ILesson } from "../../lessons";
import Panel from "../panel";

export interface InstructionPanelProps {
  lesson: ILesson;
}

const InstructionPanel: React.FunctionComponent<InstructionPanelProps> = ({
  lesson,
}) => {
  return (
    <Panel>
      <h1>{lesson.title}</h1>
      <Markdown>{lesson.description}</Markdown>
    </Panel>
  );
};

export default InstructionPanel;
