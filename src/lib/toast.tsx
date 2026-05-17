import type { ExternalToast } from "sonner";
import { toast } from "sonner";

export type ToastOverrides = ExternalToast;

export function notifySuccess(message: string, options?: ToastOverrides): void {
  toast.success(message, options);
}

export function notifyError(message: string, options?: ToastOverrides): void {
  toast.error(message, options);
}

export function notifyInfo(message: string, options?: ToastOverrides): void {
  toast.message(message, options);
}
