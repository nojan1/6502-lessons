import { ApplicationStore, ILessonState } from "./lessonContext";

const storageKey = "lessonprogress";

export interface SavedLessonProgress {
  currentLessonNumber: number;
  lessons: Record<number, ILessonState>;
}

export const saveState = (state: ApplicationStore) => {
  if (typeof window === "undefined") return;
  const data = JSON.stringify({
    currentLessonNumber: state.currentLessonNumber,
    lessons: state.lessons,
  } as SavedLessonProgress);

  localStorage.setItem(storageKey, data);
};

export const loadState = (): SavedLessonProgress => {
  if (typeof window === "undefined")
    return { currentLessonNumber: 0, lessons: {} };

  const data: SavedLessonProgress = JSON.parse(
    localStorage.getItem(storageKey) ?? "{}"
  );

  return data;
};
