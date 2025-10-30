import { Song } from '../types/song';

export const songs: Song[] = [
  {
    id: 'song1',
    name: 'Beat Master',
    artist: 'Rhythm Hero',
    file: '/songs/song1.mp3',
    bpm: 120,
    duration: 100,
    difficulty: 'medium',
    notePattern: 'mixed',
    description: 'Una canción energética perfecta para empezar'
  },
  {
    id: 'demo-song-2',
    name: 'Electronic Dreams',
    artist: 'Synth Master',
    file: '/songs/song1.mp3', // Usando la misma canción por ahora
    bpm: 140,
    duration: 100,
    difficulty: 'hard',
    notePattern: 'complex',
    description: 'Ritmo electrónico desafiante'
  },
  {
    id: 'demo-song-3',
    name: 'Chill Vibes',
    artist: 'Relax Beats',
    file: '/songs/song1.mp3', // Usando la misma canción por ahora
    bpm: 90,
    duration: 100,
    difficulty: 'easy',
    notePattern: 'simple',
    description: 'Melodía relajante para principiantes'
  }
];

