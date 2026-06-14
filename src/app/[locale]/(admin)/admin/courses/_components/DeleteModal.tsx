import { Button } from '@/components/ui/button/Button';
import { Modal } from './Modal';

interface DeleteModalProps {
  title: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteModal({ title, onConfirm, onClose }: DeleteModalProps) {
  return (
    <Modal
      title="Delete course?"
      onClose={onClose}
      maxWidth="max-w-sm"
      footer={
        <>
          <Button
            variant="ghost"
            className="border-border text-foreground hover:bg-muted rounded-xl border px-5"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="ghost"
            className="rounded-xl bg-rose-500 px-5 text-white hover:bg-rose-600"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </>
      }
    >
      <p className="text-muted-foreground text-sm leading-relaxed">
        <span className="text-foreground font-semibold">
          &ldquo;{title}&rdquo;
        </span>{' '}
        will be permanently removed. This action cannot be undone.
      </p>
    </Modal>
  );
}
