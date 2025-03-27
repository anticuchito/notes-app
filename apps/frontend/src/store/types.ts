import { store } from './store';

// En store/types.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type Note = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export type NotesState = {
  notes: Note[];
  selectedNote: Note | null;
  isLoading: boolean;
  error: string | null;
};
