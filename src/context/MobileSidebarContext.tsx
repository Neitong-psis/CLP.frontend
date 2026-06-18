'use client';

import { createContext, useContext, useState } from 'react';

interface MobileSidebarCtx {
  open: boolean;
  provided: boolean;
  userInitials: string;
  toggle: () => void;
  close: () => void;
}

const MobileSidebarCtx = createContext<MobileSidebarCtx>({
  open: false,
  provided: false,
  userInitials: '?',
  toggle: () => {},
  close: () => {},
});

export const useMobileSidebar = () => useContext(MobileSidebarCtx);

export function MobileSidebarProvider({
  children,
  userInitials = '?',
}: {
  children: React.ReactNode;
  userInitials?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <MobileSidebarCtx.Provider
      value={{
        open,
        provided: true,
        userInitials,
        toggle: () => setOpen((p) => !p),
        close: () => setOpen(false),
      }}
    >
      {children}
    </MobileSidebarCtx.Provider>
  );
}
