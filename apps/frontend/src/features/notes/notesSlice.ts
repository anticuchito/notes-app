import { Note, NotesState } from '@/store/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: NotesState = {
  notes: [],
  selectedNote: null,
  isLoading: false,
  error: null,
};

export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:8000/api/notes', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      return data;
    } catch (error) {
      console.log('error', error);

      return rejectWithValue('Error al obtener notas');
    }
  }
);

export const createNote = createAsyncThunk(
  'notes/createNote',
  async (note: { title: string; content: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(note),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Error en el registro');
    }
  }
);

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async (
    note: { id?: number; title: string; content: string },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:8000/api/notes/${note.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(note),
        }
      );

      const data = await response.json();
      clearSelectedNote();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Error en el registro');
    }
  }
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      console.log(id);
      const response = await fetch(`http://localhost:8000/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Error en el registro');
    }
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    fetchNotesSuccess: (
      state: { notes: Note[] },
      action: PayloadAction<Note[]>
    ) => {
      state.notes = action.payload;
    },
    createNoteSuccess: (
      state: { notes: Note[] },
      action: PayloadAction<Note>
    ) => {
      state.notes.push(action.payload);
    },
    updateNoteSuccess: (
      state: { notes: Note[] },
      action: PayloadAction<Note>
    ) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      state.notes[index] = action.payload;
    },
    deleteNoteSuccess: (
      state: { notes: Note[] },
      action: PayloadAction<Note>
    ) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      state.notes.splice(index, 1);
    },
    setSelectedNote: (state, action: PayloadAction<{ id: number }>) => {
      const selectedNote =
        state.notes.find((note) => note.id === action.payload.id) ?? null;

      state.selectedNote = selectedNote;
    },
    clearSelectedNote: (state) => {
      state.selectedNote = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      // Register
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.notes = [...state.notes, action.payload];
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateNote.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.notes = state.notes.map((note) => {
          if (note.id === action.payload.id) {
            return action.payload;
          }
          return note;
        });
        state.selectedNote = null;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.isLoading = false;
        state.selectedNote = null;
        state.error = action.payload as string;
      })
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.notes = state.notes.filter(
          (note) => note.id !== action.payload.id
        );
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Actions
export const {
  fetchNotesSuccess,
  createNoteSuccess,
  updateNoteSuccess,
  deleteNoteSuccess,
  setSelectedNote,
  clearSelectedNote,
} = notesSlice.actions;

// Selectors
export const selectNotes = (state: { notes: NotesState }) => state.notes.notes;
export const selectIsLoading = (state: { notes: NotesState }) =>
  state.notes.isLoading;
export const selectSelectedNote = (state: { notes: NotesState }) =>
  state.notes.selectedNote;
export const selectError = (state: { notes: NotesState }) => state.notes.error;

export default notesSlice.reducer;
