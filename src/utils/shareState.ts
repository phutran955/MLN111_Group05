import type { ChoiceRecord, GameState } from '../types/game';

export function getShareUrl(state: GameState): string {
  const baseUrl = window.location.href.split('?')[0].split('#')[0];
  const choicesParam = state.choices.map(c => `${c.sceneId}${c.choiceId}`).join('-');
  return `${baseUrl}?t=${state.theory}&p=${state.practice}&r=${state.resolution}&choices=${choicesParam}`;
}

export function parseSharedState(): GameState | null {
  if (typeof window === 'undefined' || !window.location.search) return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('t');
    const p = params.get('p');
    if (t === null || p === null) return null;

    const r = params.get('r');
    const choicesStr = params.get('choices') || '';
    const choices: ChoiceRecord[] = choicesStr
      .split('-')
      .map(part => {
        const match = part.match(/^(\d+)([A-Z])$/);
        if (!match) return null;
        return { sceneId: Number(match[1]), choiceId: match[2] as 'A' | 'B' };
      })
      .filter((x): x is ChoiceRecord => Boolean(x));

    return {
      version: 1,
      theory: Number(t) || 0,
      practice: Number(p) || 0,
      resolution: Number(r) || 0,
      currentScene: 9,
      gameStarted: true,
      gameCompleted: true,
      choices,
    };
  } catch {
    return null;
  }
}
