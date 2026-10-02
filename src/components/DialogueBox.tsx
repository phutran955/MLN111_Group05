import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import type { DialogueLine } from '../types/game';
export function DialogueBox({ lines, onComplete, reducedMotion, onNext }: { lines: DialogueLine[]; onComplete: () => void; reducedMotion: boolean; onNext: () => void }) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const line = lines[index];
  const done = reducedMotion || length >= line.text.length;
  useEffect(() => {
    if (reducedMotion || done) return;
    const timer = window.setInterval(() => setLength(n => Math.min(n + 2, line.text.length)), 24);
    return () => window.clearInterval(timer);
  }, [line.text, done, reducedMotion]);
  const next = useCallback(() => {
    if (!done) { setLength(line.text.length); return; }
    onNext();
    if (index < lines.length - 1) { setIndex(index + 1); setLength(0); } else onComplete();
  }, [done, line.text.length, index, lines.length, onComplete, onNext]);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      // Do not hijack keyboard actions in menus, settings or other interactive controls.
      const target = event.target as HTMLElement;
      if (target.closest('dialog, button, input, a')) return;
      if ((event.code === 'Space' || event.code === 'Enter') && !event.repeat) { event.preventDefault(); next(); }
    };
    window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler);
  }, [next]);
  return <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`dialogue-box tech-panel ${line.type === 'narration' ? 'narration' : ''}`} onClick={next} aria-label={`${line.speaker ?? 'Lời dẫn'}: ${line.text}. Nhấn để tiếp tục.`}>
    <span className="dialogue-meta"><span><MessageSquare size={14}/>{line.speaker ?? 'LỜI DẪN'}</span><span>{String(index + 1).padStart(2, '0')} / {String(lines.length).padStart(2, '0')}</span></span>
    <span className="dialogue-text" aria-hidden="true">{reducedMotion ? line.text : line.text.slice(0, length)}<span className={done ? 'cursor hidden' : 'cursor'}>▍</span></span>
    <span className="dialogue-hint">{done ? index === lines.length - 1 ? 'Đến lựa chọn của bạn' : 'Tiếp tục câu chuyện' : 'Chạm để hiện toàn bộ'}<span className="key-hint">ENTER</span><ArrowRight size={16}/></span>
  </motion.button>;
}
