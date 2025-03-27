import { configureStore, Middleware } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import notesReducer from '../features/notes/notesSlice';
import authMiddleware from '@/features/auth/middleware/authMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
  },
  //@ts-expect-error ts-migrate(7016) FIXME: Parameter 'preloadedState' implicitly has an 'any' type.
  middleware: function (gdm): Middleware[] {
    return gdm().prepend(authMiddleware) as Middleware[];
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
