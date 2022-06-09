import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/button";
import CenterPanel from "../components/centerPanel";
import InstructionPanel from "../components/instructionPanel";
import Modal from "../components/modal";
import {
  ApplicationState,
  useApplicationState,
} from "../context/lessonContext";

import lesson1 from "../lessons/lesson1";
import { run, RunResult } from "../runner";

const LessonPageContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.background};
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
`;

const LessonPage: React.FunctionComponent = () => {
  const [lastRunResult, setLastRunResult] = useState<RunResult>();
  const {
    getCode,
    getCurrentLesson,
    setApplicationState,
    nextLesson,
    state: { currentState },
  } = useApplicationState();

  const onRunCode = async () => {
    setApplicationState(ApplicationState.Running);

    const runResult = await run(getCurrentLesson()!, getCode());
    setLastRunResult(runResult);

    setApplicationState(
      runResult.success ? ApplicationState.Success : ApplicationState.Errors
    );
  };

  return (
    <LessonPageContainer>
      {currentState === ApplicationState.Errors && (
        <Modal
          title="There was errors :("
          onClose={() => setApplicationState(ApplicationState.Editing)}
        >
          {lastRunResult?.message}
          <i>{lastRunResult?.hintText}</i>
        </Modal>
      )}

      {currentState === ApplicationState.Success && (
        <Modal title="Well done!">
          <p>You have passed this lesson!</p>
          <p>
            Click to move on
            <Button onClick={nextLesson}>Goto next lesson</Button>
          </p>
        </Modal>
      )}

      {currentState === ApplicationState.AllLessonsCompleted && (
        <Modal title="Very well done">
          <p>You have passed all the lessons!</p>
        </Modal>
      )}

      <InstructionPanel lesson={lesson1} />
      <CenterPanel lesson={lesson1} onRunCode={onRunCode} />
    </LessonPageContainer>
  );
};

export default LessonPage;
