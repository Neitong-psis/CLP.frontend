"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface ModalState {
  readonly title: string;
  readonly description?: string;
  readonly content: ReactNode;
}

interface ModalContextValue {
  readonly isOpen: boolean;
  readonly modal: ModalState | null;
  openModal: (state: ModalState) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { readonly children: ReactNode }) {
  const [modal, setModal] = useState<ModalState | null>(null);

  const openModal = useCallback((next: ModalState) => {
    setModal(next);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  const value = useMemo<ModalContextValue>(
    () => ({
      isOpen: modal !== null,
      modal,
      openModal,
      closeModal,
    }),
    [closeModal, modal, openModal],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export function useModalContext(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModalContext must be used within ModalProvider");
  }
  return ctx;
}
