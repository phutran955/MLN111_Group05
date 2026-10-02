import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Choice } from '../types/game';
export function ChoiceCard({ choice, selected, locked, onChoose, onHover }: { choice: Choice; selected: boolean; locked: boolean; onChoose: () => void; onHover: () => void }) {
  return <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`choice-card ${selected ? 'selected' : ''} ${locked && !selected ? 'unchosen' : ''}`} disabled={locked} onClick={onChoose} onMouseEnter={onHover} aria-pressed={selected}>
    <span className="choice-letter">{choice.id}</span><span className="choice-copy"><strong>{choice.title}</strong><span>{choice.description}</span></span><ArrowUpRight size={18}/>
  </motion.button>;
}
