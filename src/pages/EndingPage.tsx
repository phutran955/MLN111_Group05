import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, Check, Copy, GitMerge, RotateCcw, Share2 } from 'lucide-react';
import { calculateEnding } from '../utils/calculateEnding';
import { endings } from '../data/endings';
import { scenes } from '../data/scenes';
import { statMeta, SCORE_MAX } from '../config/stats';
import { assets } from '../config/assets';
import { SafeImage } from '../components/SceneArt';
import { getShareUrl } from '../utils/shareState';
import type { GameState, EndingId } from '../types/game';

const endingArtMap: Record<EndingId, string> = {
  resolution: assets.backgrounds.ending_resolution,
  theory: assets.backgrounds.ending_theory,
  practice: assets.backgrounds.ending_practice,
  unresolved: assets.backgrounds.ending_unresolved,
};

export default function EndingPage({ state, onReplay, reducedMotion }: { state: GameState; onReplay: () => void; reducedMotion: boolean }) {
  const ending = endings[calculateEnding(state)];
  const [shareStatus, setShareStatus] = useState('');
  const [showJourney, setShowJourney] = useState(false);
  const [copied, setCopied] = useState(false);
  const journeyRef = useRef<HTMLElement>(null);
  const balance = 50 + (state.practice - state.theory) * 4;
  const delay = (n: number) => reducedMotion ? 0 : n;

  function toggleJourney() {
    const next = !showJourney;
    setShowJourney(next);
    if (next) {
      setTimeout(() => {
        journeyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  async function share() {
    const text = `Tôi vừa hoàn thành Giữa Hai Thế Giới.\n\n• Lý luận: ${state.theory}\n• Thực tiễn: ${state.practice}\n• Giải quyết mâu thuẫn: ${state.resolution}\n\nKết quả: ${ending.title} — ${ending.subtitle}\n\nXem kết quả của tôi tại:\n${shareUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `Giữa Hai Thế Giới · ${ending.title}`, text, url: shareUrl });
        setShareStatus('Đã mở chia sẻ thành công!');
        return;
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return;
      }
    }
    await handleCopyUrl();
  }

  const shareUrl = getShareUrl(state);

  const inputRef = useRef<HTMLInputElement>(null);

  async function handleCopyUrl() {
    let success = false;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        success = true;
      }
    } catch {
      // fallback if clipboard API fails
    }

    if (!success && inputRef.current) {
      try {
        inputRef.current.focus();
        inputRef.current.select();
        inputRef.current.setSelectionRange(0, 99999);
        success = document.execCommand('copy');
      } catch {
        success = false;
      }
    }

    if (!success) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        success = false;
      }
    }

    setCopied(true);
    setShareStatus('Đã sao chép liên kết vào bộ nhớ tạm!');
    setTimeout(() => setCopied(false), 2200);
  }

  return <main className={`ending-page ending-${ending.id}`}>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ending-heading"><span className="eyebrow"><span className="live-dot"/>CAREER ANALYSIS / HÀNH TRÌNH HOÀN TẤT</span><p>Bảy năm. Mười bước ngoặt.<br/>Đây là dấu ấn bạn để lại.</p></motion.div>
    <div className="ending-layout"><div className="ending-analysis tech-panel"><div className="ending-art-frame"><SafeImage src={endingArtMap[ending.id]} alt={ending.title} className="ending-art-img" /><div className="ending-badge"><span className="live-dot" /><span>KẾT QUẢ ĐẠT ĐƯỢC</span></div></div><span className="eyebrow">YOUR CAREER SIGNATURE</span><div className="ending-symbol"><BookOpen/><span className="symbol-connection"/><GitMerge/><span className="symbol-connection"/><BriefcaseBusiness/></div>{statMeta.map(({ key, label, Icon }, i) => <div key={key} className={`result-stat ${key}`}><span><Icon size={17}/>{label}<b>{state[key]}</b></span><div className="result-track"><motion.i initial={{ width: 0 }} animate={{ width: `${Math.min(100, state[key] / SCORE_MAX * 100)}%` }} transition={{ duration: delay(1.1), delay: delay(i * 0.15) }}/></div></div>)}<div className="balance-label"><span>LÝ LUẬN</span><span>THỰC TIỄN</span></div><div className="balance-track"><motion.span initial={{ left: '50%' }} animate={{ left: `${balance}%` }} transition={{ delay: delay(0.6), duration: delay(1) }}/></div><small>Đồ thị thể hiện xu hướng lựa chọn, không đo lường năng lực nghề nghiệp.</small></div>
    <motion.section className="ending-copy" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: delay(1.2), duration: delay(0.6) }}><span className="eyebrow">KẾT THÚC / {String(['resolution', 'theory', 'practice', 'unresolved'].indexOf(ending.id) + 1).padStart(2, '0')}</span><h1>{ending.title}</h1><h2>{ending.subtitle}</h2><p>{ending.description}</p><blockquote>{ending.reflection}</blockquote><div className="ending-actions"><button className="primary-button" onClick={toggleJourney} aria-expanded={showJourney}>HÀNH TRÌNH CỦA BẠN<ArrowRight size={17}/></button><button className="secondary-button" onClick={share}><Share2 size={16}/>CHIA SẺ TRẢI NGHIỆM</button></div><button className="text-button replay-button" onClick={onReplay}><RotateCcw size={15}/>PLAY AGAIN</button>{shareStatus && <div className="share-celebration"><img src={assets.decorations.share_celebration} alt="Chúc mừng" className="celebration-img" /><div className="celebration-info"><strong>LIÊN KẾT KẾT QUẢ ĐÃ SẴN SÀNG!</strong><p className="share-status" role="status">{shareStatus}</p><div className="share-url-box"><input ref={inputRef} type="text" readOnly value={shareUrl} className="share-url-input" onClick={e => { (e.target as HTMLInputElement).select(); handleCopyUrl(); }} /><button type="button" className="copy-link-btn" onClick={handleCopyUrl}>{copied ? <Check size={14}/> : <Copy size={14}/>}{copied ? 'ĐÃ CHÉP' : 'SAO CHÉP'}</button></div></div></div>}</motion.section></div>
    {showJourney && <motion.section ref={journeyRef} className="journey-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><span className="eyebrow">HÀNH TRÌNH CỦA BẠN / TỪNG BƯỚC ĐÃ QUA</span><h2>Một hành trình. Những lựa chọn của bạn.</h2><ol>{state.choices.map(record => { const scene = scenes.find(s => s.id === record.sceneId)!; const choice = scene.choices.find(c => c.id === record.choiceId)!; return <li key={scene.id}><span className="journey-number">{String(scene.id).padStart(2, '0')}</span><div><small>{scene.chapter} · {scene.dateLabel}</small><h3>{scene.title}</h3><p><span>{choice.id}</span>{choice.title}</p></div><ArrowUpRight size={17}/></li>; })}</ol></motion.section>}
  </main>;
}
