import { ILessonContext } from "./lessonContext";

export type Action = { type: "nextLesson" };

export const mainReducer = (
  prevState: ILessonContext,
  action: Action
): ILessonContext => {
  switch (action.type) {
    default:
      return prevState;
  }
};
