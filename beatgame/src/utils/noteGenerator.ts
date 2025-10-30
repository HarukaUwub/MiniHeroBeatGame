import { Song } from '../types/song';

export interface NotePattern {
  timing: number; // Time in milliseconds when note should appear
  lane: number; // Which lane (0-3 for A, S, D, F)
  type: 'normal' | 'hold' | 'rapid';
}

export class SongNoteGenerator {
  private song: Song;
  private noteInterval: number;
  private pattern: NotePattern[] = [];

  constructor(song: Song) {
    this.song = song;
    this.noteInterval = this.calculateNoteInterval();
    this.generatePattern();
  }

  private calculateNoteInterval(): number {
    // Base interval based on BPM
    const beatsPerSecond = this.song.bpm / 60;
    const baseInterval = 1000 / beatsPerSecond; // milliseconds per beat
    
    // Adjust based on difficulty and pattern
    let multiplier = 1;
    
    switch (this.song.difficulty) {
      case 'easy':
        multiplier = 2; // Half the notes
        break;
      case 'medium':
        multiplier = 1.5;
        break;
      case 'hard':
        multiplier = 1; // Full notes
        break;
    }

    switch (this.song.notePattern) {
      case 'simple':
        multiplier *= 1.5;
        break;
      case 'mixed':
        multiplier *= 1;
        break;
      case 'complex':
        multiplier *= 0.7;
        break;
    }

    return baseInterval * multiplier;
  }

  private generatePattern(): void {
    const duration = this.song.duration * 1000; // Convert to milliseconds
    const patterns: NotePattern[] = [];
    
    // Generate notes based on song characteristics
    for (let time = 0; time < duration; time += this.noteInterval) {
      const lane = this.getLaneForTime(time);
      const type = this.getNoteTypeForTime(time);
      
      patterns.push({
        timing: time,
        lane,
        type
      });
    }

    // Add some variation based on pattern type
    if (this.song.notePattern === 'complex') {
      this.addComplexPatterns(patterns);
    }

    this.pattern = patterns.sort((a, b) => a.timing - b.timing);
  }

  private getLaneForTime(time: number): number {
    // Create patterns based on song characteristics
    const beatPosition = (time / this.noteInterval) % 4;
    
    switch (this.song.notePattern) {
      case 'simple':
        // Simple alternating pattern
        return Math.floor(beatPosition) % 4;
      
      case 'mixed':
        // More varied pattern
        const seed = Math.floor(time / 1000);
        return (seed + Math.floor(beatPosition)) % 4;
      
      case 'complex':
        // Complex patterns with more randomness
        const complexSeed = Math.floor(time / 500);
        return (complexSeed * 3 + Math.floor(beatPosition * 2)) % 4;
      
      default:
        return Math.floor(Math.random() * 4);
    }
  }

  private getNoteTypeForTime(time: number): 'normal' | 'hold' | 'rapid' {
    // Most notes are normal, occasionally add special types
    const random = Math.random();
    
    if (this.song.difficulty === 'hard' && random < 0.1) {
      return 'rapid';
    }
    
    if (this.song.difficulty === 'medium' && random < 0.05) {
      return 'hold';
    }
    
    return 'normal';
  }

  private addComplexPatterns(patterns: NotePattern[]): void {
    // Add rapid-fire sequences for complex songs
    const rapidSequences = Math.floor(this.song.duration / 20); // One every 20 seconds
    
    for (let i = 0; i < rapidSequences; i++) {
      const startTime = (i * 20 + 10) * 1000; // Start 10 seconds into each segment
      
      // Add 3-5 rapid notes
      const rapidCount = 3 + Math.floor(Math.random() * 3);
      for (let j = 0; j < rapidCount; j++) {
        patterns.push({
          timing: startTime + (j * 200), // 200ms between rapid notes
          lane: Math.floor(Math.random() * 4),
          type: 'rapid'
        });
      }
    }
  }

  public getNoteInterval(): number {
    return this.noteInterval;
  }

  public getPattern(): NotePattern[] {
    return this.pattern;
  }

  public getNotesForTimeRange(startTime: number, endTime: number): NotePattern[] {
    return this.pattern.filter(note => 
      note.timing >= startTime && note.timing < endTime
    );
  }
}

