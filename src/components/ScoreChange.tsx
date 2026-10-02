import { motion } from 'framer-motion';
import { statMeta } from '../config/stats';
import type { Scores } from '../types/game';
export function ScoreChange({ effects }: { effects: Partial<Scores> }) {
  return <div className="score-change" role="status">{statMeta.filter(s => effects[s.key] !== undefined).map(({ key, label, Icon }) => <motion.span key={key} className={key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><Icon size={15}/>{label}<b>{effects[key]! > 0 ? '+' : ''}{effects[key]}</b></motion.span>)}</div>;
}
