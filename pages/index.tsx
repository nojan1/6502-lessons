import type { NextPage } from "next";
import styled from "styled-components";
import Button from "../components/button";

const WelcomeBox = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  padding: ${(props) => props.theme.spacings.large};
  max-width: 50%;
  margin: 10rem auto;
`;

const Home: NextPage = () => {
  return (
    <WelcomeBox>
      <h1>Welcome to 6502-lessons!</h1>
      <p>Get ready to dive into the fun world of 6502 assembler programming!</p>

      <Button onClick={() => (window.location.href = "/lesson")}>
        Click to start!
      </Button>
    </WelcomeBox>
  );
};

export default Home;
