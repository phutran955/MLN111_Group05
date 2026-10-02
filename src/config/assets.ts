const root = '/assets';
export const assets = {
  backgrounds: Object.fromEntries(['university', 'graduation', 'bedroom', 'job_search', 'office', 'meeting_room', 'training_room', 'ai_workspace', 'manager_office'].map(name => [name, `${root}/backgrounds/${name}.svg`])) as Record<string, string>,
  characters: Object.fromEntries(['player_student', 'player_employee', 'player_manager', 'manager', 'coworker_1', 'coworker_2', 'hr'].map(name => [name, `${root}/characters/${name}.svg`])) as Record<string, string>,
  audio: { hover: `${root}/audio/hover.wav`, click: `${root}/audio/click.wav`, confirm: `${root}/audio/confirm.wav`, score_up: `${root}/audio/score_up.wav`, score_down: `${root}/audio/score_down.wav`, transition: `${root}/audio/transition.wav`, ending: `${root}/audio/ending.wav` },
  music: `${root}/music/ambient.wav`,
};
