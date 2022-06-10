import Markdown from "markdown-to-jsx";
import React, { useMemo } from "react";
import styled from "styled-components";
import { ILesson } from "../../lessons";
import { RunResult } from "../../runner";
import Panel from "../panel";

const ObjectiveItem = styled.li<{ $completed: boolean }>`
  ${(props) =>
    props.$completed
      ? `
    color: green;
  `
      : ""}
`;

export interface InstructionPanelProps {
  lesson: ILesson;
  runResult?: RunResult;
}

const InstructionPanel: React.FunctionComponent<InstructionPanelProps> = ({
  lesson,
  runResult,
}) => {
  const visibleChecks = useMemo(
    () =>
      lesson.checks
        .map((c, i) => ({
          hidden: c.hidden,
          title: c.title,
          completed: runResult?.completedChecks?.[i] ?? false,
        }))
        .filter((x) => !x.hidden),
    [lesson, runResult]
  );

  return (
    <Panel>
      <h1>{lesson.title}</h1>
      <Markdown>{lesson.description}</Markdown>

      {!!visibleChecks.length && (
        <>
          <hr />
          <h3>Objectives</h3>
          <ul>
            {visibleChecks.map((c, i) => (
              <ObjectiveItem key={i} $completed={c.completed}>
                {c.title}
              </ObjectiveItem>
            ))}
          </ul>
        </>
      )}
    </Panel>
  );
};

export default InstructionPanel;
