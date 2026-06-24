'use client';

import { createContext, useContext, useState } from 'react';

interface MobileSidebarContext {
  open: boolean;
  provided: boolean;
  userInitials: string;
  toggle: () => void;
  close: () => void;
}

const MobileSidebarContext = createContext<MobileSidebarContext>({
  open: false,
  provided: false,
  userInitials: '?',
  toggle: () => {},
  close: () => {},
});

export const useMobileSidebar = () => useContext(MobileSidebarContext);

export function MobileSidebarProvider({
  children,
  userInitials = '?',
}: {
  children: React.ReactNode;
  userInitials?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <MobileSidebarContext.Provider
      value={{
        open,
        provided: true,
        userInitials,
        toggle: () => setOpen((p) => !p),
        close: () => setOpen(false),
      }}
    >
      {children}
    </MobileSidebarContext.Provider>
  );
}
