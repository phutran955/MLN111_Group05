import { scenes } from '../data/scenes';
import type { Choice, GameState } from '../types/game';
export const SAVE_KEY = 'between-two-worlds-save';
export const initialState = (): GameState => ({ version: 1, theory: 0, practice: 0, resolution: 0, currentScene: 0, choices: [], gameStarted: false, gameCompleted: false });
export function applyChoice(state: GameState, choice: Choice): GameState {
  if (!state.gameStarted || state.gameCompleted || state.choices.some(c => c.sceneId === scenes[state.currentScene]?.id)) return state;
  return { ...state, theory: state.theory + (choice.effects.theory ?? 0), practice: state.practice + (choice.effects.practice ?? 0), resolution: Math.max(0, state.resolution + (choice.effects.resolution ?? 0)), choices: [...state.choices, { sceneId: scenes[state.currentScene].id, choiceId: choice.id }] };
}
export function advanceScene(state: GameState): GameState {
  if (state.choices.length !== state.currentScene + 1) return state;
  return state.currentScene === scenes.length - 1 ? { ...state, gameCompleted: true } : { ...state, currentScene: state.currentScene + 1 };
}
export function saveGame(state: GameState): boolean {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); return true; } catch { return false; }
}
export function clearSave(): void { try { localStorage.removeItem(SAVE_KEY); } catch { /* Storage may be blocked in private browser contexts. */ } }
export function parseSave(raw: string | null): GameState | null {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw);
    if (typeof data !== 'object' || !data) return null;
    const s = data as Record<string, unknown>;
    if (s.version !== 1 || s.gameStarted !== true || typeof s.gameCompleted !== 'boolean' || !Number.isInteger(s.currentScene) || !Array.isArray(s.choices) || s.choices.length > scenes.length) return null;
    const index = s.currentScene as number;
    if (index < 0 || index >= scenes.length || !(s.choices.length === index || s.choices.length === index + 1)) return null;
    if (s.gameCompleted && (index !== scenes.length - 1 || s.choices.length !== scenes.length)) return null;
    // Rebuild scores from the ordered choice history rather than trusting stored totals.
    let rebuilt: GameState = { ...initialState(), gameStarted: true };
    for (let i = 0; i < s.choices.length; i++) {
      const record: unknown = s.choices[i];
      if (!record || typeof record !== 'object') return null;
      const r = record as Record<string, unknown>;
      const choice = scenes[i].choices.find(c => c.id === r.choiceId);
      if (r.sceneId !== scenes[i].id || !choice) return null;
      rebuilt = applyChoice({ ...rebuilt, currentScene: i }, choice);
    }
    if (s.theory !== rebuilt.theory || s.practice !== rebuilt.practice || s.resolution !== rebuilt.resolution) return null;
    return { ...rebuilt, currentScene: index, gameCompleted: s.gameCompleted };
  } catch { return null; }
}
export function loadGame(): GameState | null {
  try { const raw = localStorage.getItem(SAVE_KEY); const state = parseSave(raw); if (raw && !state) clearSave(); return state; } catch { return null; }
}
