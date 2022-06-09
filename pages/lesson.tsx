import React from "react";
import styled from "styled-components";
import CenterPanel from "../components/centerPanel";
import InstructionPanel from "../components/instructionPanel";

import lesson1 from "../lessons/lesson1";

const LessonPageContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.background};
  width: 100vw;
  height: 100vh;
`;

const LessonPage: React.FunctionComponent = () => {
  return (
    <LessonPageContainer>
      <InstructionPanel lesson={lesson1} />
      <CenterPanel lesson={lesson1} />
    </LessonPageContainer>
  );
};

export default LessonPage;
