import type { AppProps } from "next/app";
import theme from "../theme";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { LessonContextProvider } from "../context/lessonContext";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: 'VT323', monospace;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <LessonContextProvider>
        <Component {...pageProps} />
      </LessonContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
