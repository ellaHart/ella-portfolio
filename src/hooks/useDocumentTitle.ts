import { useEffect } from 'react';

const BASE = 'Ella Hartsell | UI/UX Designer & Developer';

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | Ella Hartsell` : BASE;
  }, [title]);
}
