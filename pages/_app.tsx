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
    font-family: monospace;
    font-size: 1.1em;
    background-color: ${(props: any) => props.theme.colors.background};;
  }

  blockquote {
    p {
      border-left: 2px solid;
      border-color: ${(props: any) => props.theme.colors.primary};
      padding-left: ${(props: any) => props.theme.spacings.xsmall};
    }
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
