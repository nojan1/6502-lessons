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
  flex-direction: column;
  box-sizing: border-box;
`;

const PanelContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Footer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  padding: ${(props) => props.theme.spacings.xsmall};
  color: white;
`;

const HintBox = styled.div`
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.primary};
  border-radius: 5px;
  margin-top: ${(props) => props.theme.spacings.small};
  padding: ${(props) => props.theme.spacings.xsmall};

  h1,
  p {
    padding: 0;
    margin: 0;
  }

  h1 {
    font-size: 1.2em;
  }

  p {
    font-style: italic;
  }
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

          {lastRunResult?.hintText && (
            <HintBox>
              <h1>Hint:</h1>
              <p>{lastRunResult?.hintText}</p>
            </HintBox>
          )}
        </Modal>
      )}

      {currentState === ApplicationState.Success && (
        <Modal title="Well done!">
          <p>You have passed this lesson!</p>
          <p>Click to move on</p>
          <Button onClick={nextLesson}>Goto next lesson</Button>
        </Modal>
      )}

      {currentState === ApplicationState.AllLessonsCompleted && (
        <Modal title="Very well done">
          <p>You have passed all the lessons!</p>
        </Modal>
      )}

      <PanelContainer>
        <InstructionPanel lesson={getCurrentLesson()} />
        <CenterPanel lesson={getCurrentLesson()} onRunCode={onRunCode} />
      </PanelContainer>
      <Footer>
        The excellent documentation on{" "}
        <a href="https://www.masswerk.at/6502/6502_instruction_set.html">
          https://www.masswerk.at/6502/6502_instruction_set.html
        </a>{" "}
        is very usefull
      </Footer>
    </LessonPageContainer>
  );
};

export default LessonPage;
