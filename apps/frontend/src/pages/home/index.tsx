import NotesSidebar from './components/notes/SideBar';
import NotesContent from './components/notes/NoteContent';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchNotes } from '@/features/notes/notesSlice';
import { RootState } from '@/store/store';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state: RootState) => state.notes.notes);
  // const isLoading = useAppSelector((state: RootState) => state.notes.isLoading);
  // const error = useAppSelector((state: RootState) => state.notes.error);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);
  return (
    <SidebarProvider>
      <div className='flex min-h-screen bg-background'>
        <NotesSidebar />
        <SidebarInset className='flex-1'>
          <NotesContent notes={notes} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Home;
