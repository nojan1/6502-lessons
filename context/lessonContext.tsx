import React, { createContext, useContext, useReducer, useState } from "react";
import { mainReducer } from "./reducer";

export interface ILessonState {
  code: string;
  passed: boolean;
}

export interface ILessonContext {
  currentLesson: number;
  lessons: Record<number, ILessonState>;
}

const initialState = {
  currentLesson: -1,
  lessons: {},
};

const LessonContext = createContext({});

export const LessonContextProvider: React.FunctionComponent<
  React.PropsWithChildren
> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  const value = {
    state,
    dispatch,
    nextLesson: () => dispatch({ type: "nextLesson" }),
  };

  return (
    <LessonContext.Provider value={value}>{children}</LessonContext.Provider>
  );
};

export const useLessonContext = () => useContext(LessonContext);
