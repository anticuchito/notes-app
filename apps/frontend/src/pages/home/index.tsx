import NotesSidebar from './components/notes/SideBar';
import NotesContent from './components/notes/NoteContent';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  createNote,
  fetchNotes,
  updateNote,
} from '@/features/notes/notesSlice';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { NoteModal } from './components/notes/NoteModal';

const Home = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const notes = useAppSelector((state: RootState) => state.notes.notes);
  const selectedNote = useAppSelector(
    (state: RootState) => state.notes.selectedNote
  );
  // const isLoading = useAppSelector((state: RootState) => state.notes.isLoading);
  // const error = useAppSelector((state: RootState) => state.notes.error);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleClose = () => {
    console.log('Close');
    setIsOpen(false);
  };

  const handleSave = (note: {
    id?: number;
    title: string;
    content: string;
  }) => {
    console.log(note);
    if (selectedNote) {
      note.id = selectedNote.id;

      dispatch(updateNote(note));
    } else {
      dispatch(createNote(note));
    }
  };

  const handleOpen = () => {
    console.log('Open');
    setIsOpen(true);
  };

  return (
    <SidebarProvider>
      <div className='flex min-h-screen bg-background'>
        <NotesSidebar />
        <SidebarInset className='flex-1'>
          <NotesContent notes={notes} openModal={handleOpen} />
          <NoteModal
            isOpen={isOpen}
            onClose={handleClose}
            onSave={handleSave}
            note={selectedNote}
          />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Home;
