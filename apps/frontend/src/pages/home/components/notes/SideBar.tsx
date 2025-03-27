import { BookOpen, FolderOpen, LogOut } from 'lucide-react';

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
import { Button } from '@/components/ui/button';

const NotesSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className='border-b p-4'>
        <div className='flex items-center gap-2'>
          <BookOpen className='h-6 w-6' />
          <h1 className='text-xl font-bold'>Mis Notas</h1>
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
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default NotesSidebar;
