import type { ReactElement, SVGProps } from 'react';

export type IconName = 'mail' | 'linkedin' | 'github' | 'itch' | 'arrow-right' | 'arrow-up-right' | 'arrow-down' | 'download' | 'menu' | 'close' | 'copy' | 'check';

// A deliberately small, hand-picked set drawn on a 24px grid with 1.5px strokes.
const paths: Record<IconName, ReactElement> = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5c0-2 1.2-3 2.6-3 1.5 0 2.4 1 2.4 3V17" />
    </>
  ),
  github: (
    <path d="M9 19c-4 1.3-4-2-5.5-2.5M14.5 21v-3.2c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.3 3.1 5.3 3.4 5.3 3.4a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.8c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  itch: (
    <>
      <path d="M4 8.5 5.5 4h13L20 8.5c0 1.4-1 2.3-2 2.3s-2-.9-2-2.3c0 1.4-1 2.3-2 2.3s-2-.9-2-2.3c0 1.4-1 2.3-2 2.3s-2-.9-2-2.3c0 1.4-1 2.3-2 2.3s-2-.9-2-2.3Z" />
      <path d="M5 10.5V19c2.3.7 4.6 1 7 1s4.7-.3 7-1v-8.5" />
      <path d="M10 14.5h4M12 12.5v4" />
    </>
  ),
  'arrow-right': <path d="M4 12h16m-6-6 6 6-6 6" />,
  'arrow-up-right': <path d="M7 17 17 7M8 7h9v9" />,
  'arrow-down': <path d="M12 4v16m-6-6 6 6 6-6" />,
  download: <path d="M12 4v11m-5-5 5 5 5-5M5 20h14" />,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11.5" height="11.5" rx="1.5" />
      <path d="M15.5 8.5V5.5A1.5 1.5 0 0 0 14 4H5.5A1.5 1.5 0 0 0 4 5.5V14a1.5 1.5 0 0 0 1.5 1.5h3" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
};

type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number; title?: string };

export function Icon({ name, size = 20, title, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      {...rest}
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  );
}
