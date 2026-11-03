import type { ImageAsset } from './types';

/*
 * Dance page media. Captions and alt text describe only what's visible in
 * Ella's own photos and videos: no dates, venues, or events are inferred.
 */

export type DanceVideo = {
  id: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Short label shown under the card. */
  caption: string;
  /** Accessible description of the footage. */
  label: string;
};

const video = (n: number, caption: string, label: string): DanceVideo => ({
  id: `dance-0${n}`,
  src: `/videos/dance/dance-0${n}.mp4`,
  poster: `/images/dance/dance-0${n}-poster.webp`,
  width: 1280,
  height: 720,
  caption,
  label,
});

// Order on the page: solo first, then with the mascot, then the group.
export const danceVideos: DanceVideo[] = [
  video(3, 'Solo', 'A Hurricanette in uniform dancing with orange pom-poms in front of orange and green curtains'),
  video(1, 'With Sebastian', 'Two Hurricanettes posing and dancing with Sebastian the Ibis, holding a basketball and a football'),
  video(2, 'Hitting the Heisman', 'Four Hurricanettes and Sebastian the Ibis striking the Heisman pose together in front of orange and green curtains'),
];

export type DancePhoto = { id: string; image: ImageAsset };

const photo = (n: number, width: number, height: number, alt: string): DancePhoto => ({
  id: `dance-0${n}`,
  image: {
    src: `/images/dance/dance-0${n}.webp`,
    large: `/images/dance/dance-0${n}-lg.webp`,
    alt,
    width,
    height,
  },
});

export const dancePhotos: DancePhoto[] = [
  photo(8, 675, 900, 'A Hurricanette in uniform and a Miami varsity jacket, holding a football in front of orange and green curtains'),
  photo(2, 900, 600, 'Two Hurricanettes in white and green uniforms with hands on hearts, holding orange pom-poms'),
  photo(4, 600, 900, 'A Hurricanette smiling with orange pom-poms in the stands, under a stadium screen'),
  photo(3, 900, 600, 'Hurricanettes raising orange pom-poms overhead'),
  photo(6, 900, 600, 'Hurricanettes cheering with pom-poms raised in the stadium stands'),
  photo(1, 505, 900, 'Two Hurricanettes posing with Sebastian the Ibis in front of orange and green curtains'),
  photo(5, 600, 900, 'Hurricanettes on the sideline with pom-poms'),
  photo(7, 900, 600, 'Two Hurricanettes in green and orange jackets posing in front of orange and green curtains'),
];
