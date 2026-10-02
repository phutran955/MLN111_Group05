import { useState } from 'react';
import { advanceScene, applyChoice, clearSave, initialState, loadGame, saveGame } from '../store/gameStore';
import type { Choice, GameState } from '../types/game';
export function useGameState() {
  const [state, setState] = useState<GameState>(() => loadGame() ?? initialState());
  const [saveFailed, setSaveFailed] = useState(false);
  function commit(next: GameState) { setSaveFailed(!saveGame(next)); setState(next); }
  return { state, saveFailed, start: () => { clearSave(); commit({ ...initialState(), gameStarted: true }); }, choose: (choice: Choice) => commit(applyChoice(state, choice)), advance: () => commit(advanceScene(state)) };
}
