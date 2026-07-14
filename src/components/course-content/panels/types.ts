/** Review (admin/educator, read-only preview) vs learner (actually taking the
 *  course) — the two contexts these panels render in. Admin and educator
 *  behave identically, so they share the one `'review'` value. */
export type PanelRole = 'review' | 'learner';
