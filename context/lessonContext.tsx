import React, { createContext, useContext, useMemo, useReducer } from "react";
import lessons, { ILesson } from "../lessons";
import lesson1 from "../lessons/lesson1";
import { loadState, SavedLessonProgress } from "./persistance";
import { Action, mainReducer } from "./reducer";

export enum ApplicationState {
  Editing,
  Running,
  Errors,
  Success,
  AllLessonsCompleted,
}

export interface ILessonState {
  code: string;
  passed: boolean;
}

export interface ApplicationStore extends SavedLessonProgress {
  currentState: ApplicationState;
}

const LessonContext = createContext({});

export const LessonContextProvider: React.FunctionComponent<
  React.PropsWithChildren
> = ({ children }) => {
  const initialState = useMemo(() => {
    const savedState = loadState();

    if (Object.keys(savedState.lessons ?? {}).length === 0) {
      savedState.currentLessonNumber = 0;
      savedState.lessons = {
        0: {
          code: lesson1.defaultCode ?? "",
          passed: false,
        },
      };
    }

    return {
      currentState: ApplicationState.Editing,
      ...savedState,
    };
  }, []);

  const [state, dispatch] = useReducer(mainReducer, initialState);

  const value: ApplicationStateReturnType = {
    state,
    dispatch,
    nextLesson: () => dispatch({ type: "nextLesson" }),
    getCurrentLesson: () => lessons[state.currentLessonNumber],
    getCode: () => state.lessons[state.currentLessonNumber]?.code ?? "",
    setCode: (code: string) => dispatch({ type: "setCode", code }),
    setApplicationState: (state: ApplicationState) =>
      dispatch({ type: "setApplicationState", state }),
  };

  return (
    <LessonContext.Provider value={value}>{children}</LessonContext.Provider>
  );
};

interface ApplicationStateReturnType {
  state: ApplicationStore;
  dispatch: React.Dispatch<Action>;
  nextLesson: () => void;
  getCurrentLesson: () => ILesson;
  getCode: () => string;
  setCode: (code: string) => void;
  setApplicationState: (state: ApplicationState) => void;
}

export const useApplicationState = () =>
  useContext(LessonContext) as ApplicationStateReturnType;
