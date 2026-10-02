import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { Scene } from '../types/game';
export function SceneTransition({ scene }: { scene: Scene }) {
  return <motion.div className="scene-transition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><span className="eyebrow">{scene.chapter}</span><span className="transition-line"/><h2>{scene.dateLabel}</h2><p><MapPin size={15}/>{scene.location}</p></motion.div>;
}
