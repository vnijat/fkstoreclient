
export const toastVariants = ['normal', 'success', 'warning', 'danger', 'info'] as const;
type ToastVariants = typeof toastVariants[number];

export type {ToastVariants};
