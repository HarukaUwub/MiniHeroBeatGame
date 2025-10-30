export interface Song {
  id: string;
  name: string;
  artist: string;
  file: string;
  bpm: number; // Beats per minute
  duration: number; // Duration in seconds
  difficulty: 'easy' | 'medium' | 'hard';
  notePattern: 'simple' | 'complex' | 'mixed';
  description: string;
}

export interface SongMetadata {
  songs: Song[];
}

