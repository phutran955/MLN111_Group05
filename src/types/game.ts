export type Stat = 'theory' | 'practice' | 'resolution';
export type Scores = Record<Stat, number>;
export interface DialogueLine { speaker?: string; text: string; type?: 'dialogue' | 'narration' }
export interface Choice { id: 'A' | 'B'; title: string; description: string; effects: Partial<Scores> }
export interface Scene { id: number; chapter: string; dateLabel?: string; location: string; title: string; background: string; character?: string; dialogues: DialogueLine[]; choices: Choice[]; reflection: string }
export interface ChoiceRecord { sceneId: number; choiceId: Choice['id'] }
export interface GameState extends Scores { version: 1; currentScene: number; choices: ChoiceRecord[]; gameStarted: boolean; gameCompleted: boolean }
export interface Settings { music: boolean; sfx: boolean; reducedMotion: boolean }
export type EndingId = 'resolution' | 'theory' | 'practice' | 'unresolved';
export interface Ending { id: EndingId; title: string; subtitle: string; description: string; reflection: string }
