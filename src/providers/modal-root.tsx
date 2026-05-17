"use client";

import { DialogShell } from "@/components/ui/dialog-shell";
import { useModalContext } from "@/contexts/modal-context";

export function ModalRoot() {
  const { modal, closeModal } = useModalContext();

  if (!modal) {
    return null;
  }

  return (
    <DialogShell
      open
      title={modal.title}
      description={modal.description}
      onOpenChange={(next) => {
        if (!next) {
          closeModal();
        }
      }}
    >
      {modal.content}
    </DialogShell>
  );
}
