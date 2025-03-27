import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import NoteCard from './NoteCard';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Note } from '@/store/types';
import { deleteNote, setSelectedNote } from '@/features/notes/notesSlice';
import { useAppDispatch } from '@/store/hooks';

// Datos de ejemplo para las notas

interface props {
  notes: Note[];
  openModal: () => void;
  // isLoading: boolean;
  // error: string | null;
}

const NotesContent = ({ notes, openModal }: props) => {
  const dispatch = useAppDispatch();
  const handleSelected = (id: number) => {
    console.log(id);
    dispatch(setSelectedNote({ id }));
    openModal();
  };

  const handleDelete = (id: number) => {
    console.log(id);
    dispatch(deleteNote(id));
  };

  return (
    <div className='flex h-full w-full flex-col gap-4'>
      <header className='sticky top-0 z-10 flex items-center justify-between border-b bg-background p-4'>
        <div className='flex items-center gap-2'>
          <SidebarTrigger />
          <h1 className='text-xl font-bold'>Todas las notas</h1>
        </div>
        <div className='flex items-center gap-2'>
          <Button onClick={openModal}>
            <PlusCircle className='mr-2 h-4 w-4' />
            Nueva Nota
          </Button>
        </div>
      </header>
      <div className='flex-1 overflow-auto p-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {notes.map((note) => (
            <NoteCard
              id={note.id}
              key={note.id}
              title={note.title}
              content={note.content}
              date={note.date}
              handleSelected={handleSelected}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesContent;
