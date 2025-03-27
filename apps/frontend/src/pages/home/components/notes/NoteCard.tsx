import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NoteCardProps {
  id: number;
  title: string;
  content: string;
  date: string;
  handleSelected: (id: number) => void;
  handleDelete: (id: number) => void;
}

const NoteCard = ({
  id,
  title,
  content,
  date,
  handleSelected,
  handleDelete,
}: NoteCardProps) => {
  return (
    <Card className='flex h-full flex-col transition-shadow hover:shadow-md'>
      <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-2'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold leading-tight'>{title}</h3>
          <div className='flex items-center gap-2'>
            <span className='text-xs text-muted-foreground'>{date}</span>
          </div>
        </div>
        <div className='flex items-center gap-1'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <MoreHorizontal className='h-4 w-4' />
                <span className='sr-only'>Más opciones</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => handleSelected(id)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-destructive'
                onClick={() => handleDelete(id)}
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className='flex-1 py-2'>
        <p className='text-sm text-muted-foreground line-clamp-6'>{content}</p>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
