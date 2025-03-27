import { PlusCircle, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NoteCard from './NoteCard';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Note } from '@/store/types';

// Datos de ejemplo para las notas

interface props {
  notes: Note[];
  // isLoading: boolean;
  // error: string | null;
}

const NotesContent = ({ notes }: props) => {
  return (
    <div className='flex h-full w-full flex-col'>
      <header className='sticky top-0 z-10 flex items-center justify-between border-b bg-background p-4'>
        <div className='flex items-center gap-2'>
          <SidebarTrigger />
          <h1 className='text-xl font-bold'>Todas las notas</h1>
        </div>
        <div className='flex items-center gap-2'>
          <div className='relative w-64'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Buscar en notas...'
              className='w-full pl-8'
            />
          </div>
          <Button>
            <PlusCircle className='mr-2 h-4 w-4' />
            Nueva Nota
          </Button>
        </div>
      </header>
      <main className='flex-1 overflow-auto p-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              content={note.content}
              date={note.date}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default NotesContent;
