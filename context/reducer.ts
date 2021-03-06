import lessons from "../lessons";
import { ApplicationState, ApplicationStore } from "./lessonContext";

export type Action =
  | { type: "nextLesson" }
  | { type: "setCode"; code: string }
  | { type: "setApplicationState"; state: ApplicationState };

export const mainReducer = (
  prevState: ApplicationStore,
  action: Action
): ApplicationStore => {
  switch (action.type) {
    case "nextLesson":
      const newLessonNumber = (prevState.currentLessonNumber ?? 0) + 1;
      if (newLessonNumber > lessons.length - 1) {
        return {
          ...prevState,
          currentState: ApplicationState.AllLessonsCompleted,
        };
      } else {
        return {
          ...prevState,
          lessons: {
            ...prevState.lessons,
            [newLessonNumber]: {
              code: lessons[newLessonNumber]?.defaultCode ?? "",
              passed: false,
            },
          },
          currentLessonNumber: newLessonNumber,
          currentState: ApplicationState.Editing,
        };
      }
    case "setCode":
      if (prevState.currentLessonNumber < 0) return prevState;

      return {
        ...prevState,
        lessons: {
          ...prevState.lessons,
          [prevState.currentLessonNumber!]: {
            code: action.code,
            passed: false,
          },
        },
      };
    case "setApplicationState":
      return { ...prevState, currentState: action.state };
    default:
      return prevState;
  }
};
