import type { AppProps } from "next/app";
import theme from "../theme";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { LessonContextProvider } from "../context/lessonContext";

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
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
