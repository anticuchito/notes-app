import * as React from 'react';
import { Check, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Note } from '@/store/types';
interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: { title: string; content: string }) => void;
  note: Note | null;
}

export function NoteModal({ isOpen, onClose, onSave, note }: NoteModalProps) {
  const [title, setTitle] = React.useState(note?.title || '');
  const [content, setContent] = React.useState(note?.content || '');

  // Reset form when modal opens with new data
  React.useEffect(() => {
    if (isOpen) {
      setTitle(note?.title || '');
      setContent(note?.content || '');
    }
  }, [isOpen, note]);

  const handleSave = () => {
    onSave({
      title,
      content,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>{note ? 'Editar nota' : 'Crear nueva nota'}</DialogTitle>
          <DialogDescription>
            {note
              ? 'Modifica los detalles de tu nota aquí.'
              : 'Completa los detalles para crear una nueva nota.'}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='title'>Título</Label>
            <Input
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Título de la nota'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='content'>Contenido</Label>
            <Textarea
              id='content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder='Escribe el contenido de tu nota aquí...'
              className='min-h-[150px]'
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            <X className='mr-2 h-4 w-4' />
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            <Check className='mr-2 h-4 w-4' />
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
