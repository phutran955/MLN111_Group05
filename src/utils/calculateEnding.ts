import type { EndingId, Scores } from '../types/game';
export function calculateEnding({ theory: L, practice: T, resolution: G }: Scores): EndingId {
  if (G >= 5) return 'resolution';
  if (L > T) return 'theory';
  if (T > L) return 'practice';
  return 'unresolved';
}
