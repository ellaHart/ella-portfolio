import type { ReactElement } from 'react';
import styles from './Desktop.module.css';

/*
 * 16×16 pixel-art icons drawn from character maps: one rect per pixel,
 * rendered with crispEdges so they stay sharp at any size.
 * Palette keys: k outline · y/Y/o manila folder · p/P controller · w/W paper ·
 * l lines · r/R ribbon · g green · b blue.
 */
const PALETTE: Record<string, string> = {
  k: '#4a3424',
  y: '#e9c88b', // manila
  Y: '#f6e2b8',
  o: '#c9a066',
  p: '#9466c2',
  P: '#c29be3',
  d: '#6d4596',
  w: '#fbf6ea',
  W: '#e6dac1',
  l: '#a8957a',
  r: '#e8742c',
  R: '#b9501a',
  g: '#2f7a46',
  b: '#5b8fd6',
};

const MAPS = {
  folder: [
    '................',
    '................',
    '.kkkkkk.........',
    'kYYYYYYk........',
    'kyyyyyyykkkkkkk.',
    'kyyyyyyyyyyyyyyk',
    'kYYYYYYYYYYYYYYk',
    'kyyyyyyyyyyyyyyk',
    'kyyyyyyyyyyyyyyk',
    'kyyyyyyyyyyyyyyk',
    'kyyyyyyyyyyyyyyk',
    'kyyyyyyyyyyyyyyk',
    'kyyyyyyyyyyyyyyk',
    'kooooooooooooook',
    '.kkkkkkkkkkkkkk.',
    '................',
  ],
  games: [
    '................',
    '................',
    '................',
    '...kkkk..kkkk...',
    '..kPPPPkkPPPPk..',
    '.kPPpppppppppPk.',
    'kPpppppppppprppk',
    'kppkpppppppkpgpk',
    'kpkkkpppppbpkprk',
    'kppkppppppprpgpk',
    'kpppppkkkpppkppk',
    'kppppk...kppppdk',
    'kdppk.....kpppdk',
    '.kdk.......kddk.',
    '..k.........kk..',
    '................',
  ],
  certificate: [
    '................',
    '.kkkkkkkkkkkkkk.',
    'kwwwwwwwwwwwwwwk',
    'kwWWWWWWWWWWWWwk',
    'kwWllllllllllWwk',
    'kwWWWWWWWWWWWWwk',
    'kwWllllllWWWWWwk',
    'kwWWWWWWWWWkkWwk',
    'kwWlllllWWkrrkwk',
    'kwWWWWWWWkrRRrkk',
    'kwwwwwwwwkrRRrk.',
    '.kkkkkkkkkkrrkk.',
    '..........krkrk.',
    '.........krk.krk',
    '.........kk...kk',
    '................',
  ],
  resume: [
    '..kkkkkkkkk.....',
    '..kwwwwwwwkk....',
    '..kwwwwwwwkWk...',
    '..kwbbwwwwkkkk..',
    '..kwbbwwwwwwwk..',
    '..kwwwwwwwwwwk..',
    '..kwllllllllwk..',
    '..kwwwwwwwwwwk..',
    '..kwlllllllwwk..',
    '..kwwwwwwwwwwk..',
    '..kwllllllllwk..',
    '..kwwwwwwwwwwk..',
    '..kwlllllwwwwk..',
    '..kwwwwwwwwwwk..',
    '..kkkkkkkkkkkk..',
    '................',
  ],
} as const;

export type PixelIconName = keyof typeof MAPS;

export function PixelIcon({ name, size = 40 }: { name: PixelIconName; size?: number }) {
  const rects: ReactElement[] = [];
  MAPS[name].forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const fill = PALETTE[ch];
      if (fill) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={fill} />);
    });
  });
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={styles.pixelIcon}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {rects}
    </svg>
  );
}
