import { BookOpen, FolderOpen, LogOut, Search, Settings } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const NotesSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className='border-b p-4'>
        <div className='flex items-center gap-2'>
          <BookOpen className='h-6 w-6' />
          <h1 className='text-xl font-bold'>Mis Notas</h1>
        </div>
        <div className='mt-4 flex items-center gap-2'>
          <Input placeholder='Buscar notas...' className='h-9' />
          <Button size='icon' variant='ghost' className='h-9 w-9'>
            <Search className='h-4 w-4' />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive>
              <a href='#'>
                <FolderOpen className='h-4 w-4' />
                <span>Todas las notas</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className='border-t p-4'>
        <div className='flex items-center justify-between'>
          <Button variant='outline' size='sm' className='w-full'>
            <LogOut className='mr-2 h-4 w-4' />
            <span>Cerrar sesión</span>
          </Button>
          <Button variant='ghost' size='icon' className='ml-2'>
            <Settings className='h-4 w-4' />
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default NotesSidebar;
