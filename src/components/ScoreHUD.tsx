import { statMeta, SCORE_MAX } from '../config/stats';
import { animate, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Scores, Stat } from '../types/game';
function AnimatedNumber({ value, reducedMotion }: { value: number; reducedMotion: boolean }) {
  const [display, setDisplay] = useState(value); const reduced = useReducedMotion() || reducedMotion;
  useEffect(() => { const controls = animate(display, value, { duration: reduced ? 0 : 0.5, onUpdate: n => setDisplay(Math.round(n)) }); return () => controls.stop(); /* Start each animation at the visible value. */ // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduced]);
  return <>{display}</>;
}
export function ScoreHUD({ scores, changes, reducedMotion = false }: { scores: Scores; changes?: Partial<Record<Stat, number>>; reducedMotion?: boolean }) {
  return <div className="score-hud" aria-label="Chỉ số hành trình">{statMeta.map(({ key, label, Icon }) => <div key={key} className={`stat ${key}`}>
    <div className="stat-header"><Icon size={15}/><span>{label}</span><strong><AnimatedNumber value={scores[key]} reducedMotion={reducedMotion}/></strong></div><div className="stat-track"><motion.span animate={{ width: `${Math.min(100, scores[key] / SCORE_MAX * 100)}%` }}/></div>
    {changes?.[key] !== undefined && <motion.span key={`${scores[key]}-${changes[key]}`} className="stat-delta" initial={{ opacity: 0, y: 8 }} animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -14] }} transition={{ duration: 1.8 }}>{changes[key]! >= 0 ? '+' : ''}{changes[key]}</motion.span>}
  </div>)}</div>;
}
