import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, GitMerge, RotateCcw, Share2 } from 'lucide-react';
import { calculateEnding } from '../utils/calculateEnding';
import { endings } from '../data/endings';
import { scenes } from '../data/scenes';
import { statMeta, SCORE_MAX } from '../config/stats';
import type { GameState } from '../types/game';
export default function EndingPage({ state, onReplay, reducedMotion }: { state: GameState; onReplay: () => void; reducedMotion: boolean }) {
  const ending = endings[calculateEnding(state)]; const [shareStatus, setShareStatus] = useState(''); const [showJourney, setShowJourney] = useState(false);
  const balance = 50 + (state.practice - state.theory) * 4;
  const delay = (n: number) => reducedMotion ? 0 : n;
  async function share() {
    const text = `Tôi vừa hoàn thành Giữa Hai Thế Giới.\n\nLý luận: ${state.theory}\nThực tiễn: ${state.practice}\nGiải quyết mâu thuẫn: ${state.resolution}\n\nEnding: ${ending.title}`;
    try { if (navigator.share) { await navigator.share({ title: 'Giữa Hai Thế Giới', text }); setShareStatus('Đã chia sẻ kết quả.'); } else { await navigator.clipboard.writeText(text); setShareStatus('Đã sao chép kết quả.'); } } catch (e) { if (e instanceof DOMException && e.name === 'AbortError') return; setShareStatus(text); }
  }
  return <main className={`ending-page ending-${ending.id}`}>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ending-heading"><span className="eyebrow"><span className="live-dot"/>CAREER ANALYSIS / HÀNH TRÌNH HOÀN TẤT</span><p>Bảy năm. Mười bước ngoặt.<br/>Đây là dấu ấn bạn để lại.</p></motion.div>
    <div className="ending-layout"><div className="ending-analysis tech-panel"><span className="eyebrow">YOUR CAREER SIGNATURE</span><div className="ending-symbol"><BookOpen/><span className="symbol-connection"/><GitMerge/><span className="symbol-connection"/><BriefcaseBusiness/></div>{statMeta.map(({ key, label, Icon }, i) => <div key={key} className={`result-stat ${key}`}><span><Icon size={17}/>{label}<b>{state[key]}</b></span><div className="result-track"><motion.i initial={{ width: 0 }} animate={{ width: `${Math.min(100, state[key] / SCORE_MAX * 100)}%` }} transition={{ duration: delay(1.1), delay: delay(i * 0.15) }}/></div></div>)}<div className="balance-label"><span>LÝ LUẬN</span><span>THỰC TIỄN</span></div><div className="balance-track"><motion.span initial={{ left: '50%' }} animate={{ left: `${balance}%` }} transition={{ delay: delay(0.6), duration: delay(1) }}/></div><small>Đồ thị thể hiện xu hướng lựa chọn, không đo lường năng lực nghề nghiệp.</small></div>
    <motion.section className="ending-copy" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: delay(1.2), duration: delay(0.6) }}><span className="eyebrow">KẾT THÚC / {String(['resolution', 'theory', 'practice', 'unresolved'].indexOf(ending.id) + 1).padStart(2, '0')}</span><h1>{ending.title}</h1><h2>{ending.subtitle}</h2><p>{ending.description}</p><blockquote>{ending.reflection}</blockquote><div className="ending-actions"><button className="primary-button" onClick={() => setShowJourney(v => !v)} aria-expanded={showJourney}>YOUR JOURNEY<ArrowRight size={17}/></button><button className="secondary-button" onClick={share}><Share2 size={16}/>SHARE RESULT</button></div><button className="text-button replay-button" onClick={onReplay}><RotateCcw size={15}/>PLAY AGAIN</button><p className="share-status" role="status">{shareStatus}</p></motion.section></div>
    {showJourney && <motion.section className="journey-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><span className="eyebrow">YOUR JOURNEY / TỪNG BƯỚC ĐÃ QUA</span><h2>Một hành trình. Những lựa chọn của bạn.</h2><ol>{state.choices.map(record => { const scene = scenes.find(s => s.id === record.sceneId)!; const choice = scene.choices.find(c => c.id === record.choiceId)!; return <li key={scene.id}><span className="journey-number">{String(scene.id).padStart(2, '0')}</span><div><small>{scene.chapter} · {scene.dateLabel}</small><h3>{scene.title}</h3><p><span>{choice.id}</span>{choice.title}</p></div><ArrowUpRight size={17}/></li>; })}</ol></motion.section>}
  </main>;
}
