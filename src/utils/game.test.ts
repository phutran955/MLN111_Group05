import { describe, expect, it, vi } from 'vitest';
import { scenes } from '../data/scenes';
import { advanceScene, applyChoice, clearSave, initialState, loadGame, parseSave, saveGame, SAVE_KEY } from '../store/gameStore';
import { calculateEnding } from './calculateEnding';
import type { EndingId } from '../types/game';
// Independent scoring fixture transcribed from the brief; protects content from accidental edits.
const expected = [
  [[0, 1, 0], [1, 0, 0]], [[1, 0, -1], [0, 1, 1]], [[1, 0, -1], [0, 1, 2]],
  [[1, 0, -1], [0, 1, 1]], [[0, 1, 0], [1, 0, 1]], [[1, 0, -1], [0, 1, 1]],
  [[1, 0, -1], [0, 1, 1]], [[1, 0, -1], [0, 1, 1]], [[0, 0, -1], [1, 1, 1]], [[1, 0, -1], [0, 1, 1]],
];
describe('Game scoring and progression', () => {
  it('preserves the exact effects for every choice in the brief', () => {
    expect(scenes).toHaveLength(10);
    scenes.forEach((scene, i) => scene.choices.forEach((choice, j) => expect([choice.effects.theory ?? 0, choice.effects.practice ?? 0, choice.effects.resolution ?? 0]).toEqual(expected[i][j])));
  });
  it('plays all 1024 paths, clamps resolution at each step, round-trips saves and verifies reachable endings', () => {
    const reached = new Set<EndingId>();
    for (let path = 0; path < 1024; path++) {
      let state = { ...initialState(), gameStarted: true }; let L = 0, T = 0, G = 0;
      for (let i = 0; i < 10; i++) {
        const j = (path >> i) & 1; const [l, t, g] = expected[i][j]; L += l; T += t; G = Math.max(0, G + g);
        state = applyChoice(state, scenes[i].choices[j]);
        expect([state.theory, state.practice, state.resolution]).toEqual([L, T, G]);
        expect(parseSave(JSON.stringify(state))).toEqual(state);
        state = advanceScene(state); expect(parseSave(JSON.stringify(state))).toEqual(state);
      }
      expect(state.gameCompleted).toBe(true); expect(state.choices).toHaveLength(10);
      const ending = calculateEnding(state); expect(ending).toBe(G >= 5 ? 'resolution' : L > T ? 'theory' : T > L ? 'practice' : 'unresolved'); reached.add(ending);
    }
    // The brief yields an odd L+T total (9 or 11). L === T is unreachable without changing scoring.
    expect([...reached].sort()).toEqual(['practice', 'resolution', 'theory']);
  });
  it('implements all four ending conditions, including the equality branch and G=5 boundary', () => {
    expect(calculateEnding({ theory: 4, practice: 4, resolution: 4 })).toBe('unresolved');
    expect(calculateEnding({ theory: 4, practice: 4, resolution: 5 })).toBe('resolution');
    expect(calculateEnding({ theory: 7, practice: 2, resolution: 4 })).toBe('theory');
    expect(calculateEnding({ theory: 2, practice: 7, resolution: 4 })).toBe('practice');
  });
  it('rejects duplicate choices, skips and changes after completion', () => {
    let s = { ...initialState(), gameStarted: true };
    expect(advanceScene(s)).toBe(s);
    s = applyChoice(s, scenes[0].choices[0]); expect(applyChoice(s, scenes[0].choices[1])).toBe(s);
    expect(applyChoice({ ...s, gameCompleted: true }, scenes[0].choices[1]).choices).toHaveLength(1);
    expect(applyChoice(initialState(), scenes[0].choices[0]).choices).toHaveLength(0);
  });
});
describe('Save validation', () => {
  const valid = applyChoice({ ...initialState(), gameStarted: true }, scenes[0].choices[0]);
  it('recovers from malformed, old, inconsistent or tampered data', () => {
    for (const raw of [null, 'oops', 'null', '{}', '[]', JSON.stringify({ ...valid, version: 2 }), JSON.stringify({ ...valid, resolution: -1 }), JSON.stringify({ ...valid, theory: 100 }), JSON.stringify({ ...valid, currentScene: 9 }), JSON.stringify({ ...valid, gameCompleted: true }), JSON.stringify({ ...valid, choices: [null] }), JSON.stringify({ ...valid, choices: [{ sceneId: 2, choiceId: 'B' }] })]) expect(parseSave(raw)).toBeNull();
  });
  it('saves, loads, clears and resets malformed storage', () => {
    const data = new Map<string, string>(); vi.stubGlobal('localStorage', { setItem: (k: string, v: string) => data.set(k, v), getItem: (k: string) => data.get(k) ?? null, removeItem: (k: string) => data.delete(k) });
    expect(saveGame(valid)).toBe(true); expect(loadGame()).toEqual(valid); clearSave(); expect(loadGame()).toBeNull();
    data.set(SAVE_KEY, '{bad'); expect(loadGame()).toBeNull(); expect(data.has(SAVE_KEY)).toBe(false); vi.unstubAllGlobals();
  });
  it('keeps the game safe when storage is unavailable', () => {
    vi.stubGlobal('localStorage', { setItem: () => { throw new Error('Quota'); }, getItem: () => { throw new Error('Blocked'); }, removeItem: () => { throw new Error('Blocked'); } });
    expect(saveGame(valid)).toBe(false); expect(loadGame()).toBeNull(); expect(() => clearSave()).not.toThrow(); vi.unstubAllGlobals();
  });
});
