const LS_KEY = 'qb_notifications';

export interface StoredNotif {
  id: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export function readStoredNotifs(): StoredNotif[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]') as StoredNotif[];
  } catch {
    return [];
  }
}

export function pushNotif(notif: StoredNotif): void {
  if (typeof window === 'undefined') return;
  const list = readStoredNotifs();
  const next = [notif, ...list.filter((n) => n.id !== notif.id)];
  localStorage.setItem(LS_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('qb:notification', { detail: notif }));
}
