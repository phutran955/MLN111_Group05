import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { scenes } from '../data/scenes';
import { SceneArt } from '../components/SceneArt';
import { DialogueBox } from '../components/DialogueBox';
import { ChoiceCard } from '../components/ChoiceCard';
import { CareerTimeline } from '../components/CareerTimeline';
import { ScoreHUD } from '../components/ScoreHUD';
import { ScoreChange } from '../components/ScoreChange';
import { SceneTransition } from '../components/SceneTransition';
import type { Choice, GameState } from '../types/game';
import type { assets } from '../config/assets';
export default function GamePage({ state, onChoose, onAdvance, reducedMotion, audio, saveFailed }: { state: GameState; onChoose: (choice: Choice) => void; onAdvance: () => void; reducedMotion: boolean; audio: (name: keyof typeof assets.audio) => void; saveFailed: boolean }) {
  const scene = scenes[state.currentScene];
  const record = state.choices.find(c => c.sceneId === scene.id);
  const selected = scene.choices.find(c => c.id === record?.choiceId);
  const [transition, setTransition] = useState(!selected);
  const [dialogueDone, setDialogueDone] = useState(!!selected);
  const [reflection, setReflection] = useState(!!selected);
  const [recentChoice, setRecentChoice] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setTransition(false), reducedMotion ? 180 : 1300); return () => window.clearTimeout(timer); }, [reducedMotion]);
  useEffect(() => {
    if (!selected) return;
    const timer = window.setTimeout(() => setReflection(true), reducedMotion ? 0 : 1050);
    return () => window.clearTimeout(timer);
  }, [selected, reducedMotion]);
  useEffect(() => {
    const images = [scene, scenes[state.currentScene + 1]].filter(Boolean).flatMap(s => [s.background, s.character]).filter((url): url is string => !!url).map(url => { const img = new Image(); img.src = url; return img; });
    return () => { for (const image of images) image.onload = null; };
  }, [scene, state.currentScene]);
  function choose(choice: Choice) { if (selected) return; audio('confirm'); setRecentChoice(true); onChoose(choice); }
  return <main className="game-page">
    <div className="game-top"><div className="scene-chapter"><span className="eyebrow">{scene.chapter}</span><span>{scene.dateLabel}</span></div><ScoreHUD scores={state} changes={recentChoice ? selected?.effects : undefined} reducedMotion={reducedMotion}/></div>
    <div className="game-layout"><div className="scene-stage"><SceneArt background={scene.background} character={scene.character}/><div className="stage-location"><MapPin size={13}/>{scene.location}</div><div className="stage-index">SCENE <b>{String(scene.id).padStart(2, '0')}</b></div></div>
    <section className="scene-story" aria-labelledby="scene-title"><span className="eyebrow">A MOMENT THAT SHAPES YOU</span><h1 id="scene-title">{scene.title}</h1>
      {!transition && !dialogueDone && <DialogueBox lines={scene.dialogues} reducedMotion={reducedMotion} onNext={() => audio('click')} onComplete={() => setDialogueDone(true)}/>}
      {dialogueDone && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div className="decision-label"><span/>{selected ? 'LỰA CHỌN CỦA BẠN' : 'BẠN SẼ LÀM GÌ?'}<span/></div><div className="choices">{scene.choices.map(choice => <ChoiceCard key={choice.id} choice={choice} selected={choice.id === selected?.id} locked={!!selected} onChoose={() => choose(choice)} onHover={() => { if (!selected) audio('hover'); }}/>)}</div>
      {selected && <ScoreChange effects={selected.effects}/>}
      {reflection && <motion.div className="reflection" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}><span className="eyebrow"><Sparkles size={13}/>MỘT KHOẢNG LẶNG</span><p>{scene.reflection}</p>{selected?.effects.resolution === -1 && state.resolution === 0 && <small>Chỉ số giải quyết mâu thuẫn được giới hạn ở mức tối thiểu 0.</small>}<button className="primary-button" autoFocus onClick={() => { audio(scene.id === 10 ? 'ending' : 'transition'); onAdvance(); }}>{scene.id === 10 ? 'KHÁM PHÁ KẾT QUẢ' : 'TIẾP TỤC HÀNH TRÌNH'}<ArrowRight size={17}/></button></motion.div>}
      </motion.div>}
    </section></div>
    <CareerTimeline current={state.currentScene}/><p className="save-status" role="status">{saveFailed ? 'Không thể lưu trên trình duyệt này. Tiến trình vẫn được giữ trong phiên chơi hiện tại.' : 'Tiến trình được lưu tự động trên thiết bị này.'}</p>
    <AnimatePresence>{transition && <SceneTransition scene={scene}/>}</AnimatePresence>
  </main>;
}
