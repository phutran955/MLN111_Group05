import { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, GitMerge, Home, Settings2, Volume2, VolumeX } from 'lucide-react';
import { useGameState } from './hooks/useGameState';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useAudio } from './hooks/useAudio';
import { Modal } from './components/Modal';
import LandingPage from './pages/LandingPage';
import type { Settings } from './types/game';
import { scenes } from './data/scenes';
import { assets } from './config/assets';
import { parseSharedState } from './utils/shareState';
const IntroPage = lazy(() => import('./pages/IntroPage'));
const GamePage = lazy(() => import('./pages/GamePage'));
const EndingPage = lazy(() => import('./pages/EndingPage'));
type Page = 'landing' | 'intro' | 'game' | 'ending';
type Popup = 'settings' | 'help' | 'about' | 'reset' | null;
function isSettings(value: unknown): value is Settings { if (!value || typeof value !== 'object') return false; const v = value as Record<string, unknown>; return typeof v.music === 'boolean' && typeof v.sfx === 'boolean' && typeof v.reducedMotion === 'boolean'; }
function Loading() { return <div className="loading-screen" role="status"><GitMerge size={30}/><strong>GIỮA HAI THẾ GIỚI</strong><span>Initializing Career Simulation...</span><div className="loading-track"><motion.i initial={{ width: '10%' }} animate={{ width: '95%' }} transition={{ duration: 0.45 }}/></div></div>; }
export default function App() {
  const game = useGameState();
  const [sharedState, setSharedState] = useState(() => parseSharedState());
  const [page, setPage] = useState<Page>(() => (sharedState ? 'ending' : 'landing'));
  const [popup, setPopup] = useState<Popup>(null);
  const [loading, setLoading] = useState(true);
  const osReduced = useReducedMotion();
  const [settings, setSettings] = useLocalStorage<Settings>('between-two-worlds-settings', { music: false, sfx: true, reducedMotion: false }, isSettings);
  const reduced = !!osReduced || settings.reducedMotion; const audio = useAudio(settings);
  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), 420); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [page, game.state.currentScene]);
  function start() { audio('click'); if (game.state.gameStarted && game.state.choices.length) setPopup('reset'); else newGame(); }
  function newGame() { game.start(); setPage('intro'); setPopup(null); }
  function toggle(key: keyof Settings) { setSettings({ ...settings, [key]: !settings[key] }); }
  return <MotionConfig reducedMotion={reduced ? 'always' : 'never'} transition={{ duration: reduced ? 0 : 0.35 }}><div className={`app-shell ${reduced ? 'reduce-motion' : ''}`} style={{ '--balance': `${50 + (game.state.practice - game.state.theory) * 3}%`, '--harmony': Math.min(1, game.state.resolution / 10) } as React.CSSProperties}>
    <div className="ambient-field" aria-hidden="true"/>
    {loading ? <Loading/> : <><header className="app-header"><button className="brand" onClick={() => { audio('click'); setPage('landing'); }} aria-label="Giữa Hai Thế Giới — về trang chủ"><span className="brand-mark"><GitMerge size={21}/></span><span>GIỮA HAI THẾ GIỚI<small>THE CAREER EXPERIENCE</small></span></button><div className="header-right"><span className="header-edition">A STORY OF THEORY & PRACTICE</span>{page !== 'landing' && <button className="icon-button" onClick={() => setPage('landing')} aria-label="Về trang chủ, giữ tiến trình"><Home size={18}/></button>}<button className="icon-button" onClick={() => { audio('click'); toggle('sfx'); }} aria-label={settings.sfx ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}>{settings.sfx ? <Volume2 size={18}/> : <VolumeX size={18}/>}</button><button className="icon-button" onClick={() => setPopup('settings')} aria-label="Cài đặt"><Settings2 size={18}/></button></div></header>
    <Suspense fallback={<Loading/>}><AnimatePresence mode="wait"><motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.25 }}>
    {page === 'landing' && <LandingPage state={game.state} onStart={start} onContinue={() => { audio('click'); setPage(game.state.gameCompleted ? 'ending' : 'game'); }} onHelp={() => setPopup('help')} onAbout={() => setPopup('about')}/>}
    {page === 'intro' && <IntroPage reducedMotion={reduced} onBegin={() => { audio('transition'); setPage('game'); }} onNext={() => audio('click')}/>}
    {page === 'game' && <GamePage key={game.state.currentScene} state={game.state} onChoose={game.choose} onAdvance={() => { game.advance(); if (game.state.currentScene === scenes.length - 1) setPage('ending'); }} reducedMotion={reduced} audio={audio} saveFailed={game.saveFailed}/>}
    {page === 'ending' && <EndingPage state={sharedState ?? game.state} reducedMotion={reduced} onReplay={() => { setSharedState(null); if (window.location.search) window.history.replaceState({}, '', window.location.pathname); start(); }}/>}
    </motion.div></AnimatePresence></Suspense></>}
    {popup && <Modal title={popup === 'settings' ? 'Cài đặt trải nghiệm' : popup === 'help' ? 'Cách chơi' : popup === 'about' ? 'Về hành trình này' : 'Bắt đầu hành trình mới?'} onClose={() => setPopup(null)}>
      {popup === 'settings' && <><p className="modal-description">Thiết lập được lưu trên thiết bị của bạn.</p>{([{ key: 'music', title: 'Music', description: 'Nhạc nền · phát khi đã tương tác' }, { key: 'sfx', title: 'SFX', description: 'Âm thanh nhẹ khi tương tác' }, { key: 'reducedMotion', title: 'Reduced Motion', description: 'Giảm chuyển động và hiển thị thoại ngay' }] as const).map(item => <div className="setting-row" key={item.key}><label htmlFor={item.key}><strong>{item.title}</strong><small>{item.description}</small></label><input id={item.key} type="checkbox" checked={settings[item.key]} onChange={() => toggle(item.key)}/></div>)}{osReduced && <p className="modal-description">Tùy chọn giảm chuyển động của hệ điều hành đang được áp dụng.</p>}</>}
      {popup === 'help' && <div className="help-content"><p>Bạn sẽ đi qua 10 bước ngoặt, từ tốt nghiệp đến trở thành quản lý. Mỗi tình huống có hai cách phản ứng, với những ảnh hưởng khác nhau.</p><ol><li>Chạm vào khung thoại để hiện hết câu. Chạm lần nữa để đọc tiếp.</li><li>Dùng Enter hoặc Space để tiếp tục thoại; Tab để chuyển giữa các nút.</li><li>Sau khi đọc tình huống, chọn cách bạn muốn hành động.</li><li>Quan sát thay đổi chỉ số, đọc suy ngẫm rồi tiếp tục.</li></ol><p>Không có đáp án đúng/sai. Tiến trình tự lưu sau mỗi lựa chọn. Bạn có thể về trang chủ và tiếp tục bất cứ lúc nào.</p><button className="primary-button" onClick={() => setPopup(null)}>ĐÃ HIỂU<ArrowUpRight size={16}/></button></div>}
      {popup === 'about' && <div className="help-content about-content">
        <div className="about-banner-wrap"><img src={assets.decorations.about_header} alt="Giới thiệu" className="about-banner-img"/></div>
        <span className="eyebrow">MLN111 / NHÓM 05</span>
        <p>Giữa Hai Thế Giới khám phá mâu thuẫn giữa lý luận và thực tiễn trong giáo dục, đào tạo và việc làm.</p>
        <div className="about-course-card">
          <img src={assets.decorations.about_course} alt="Môn học MLN111" className="about-course-img"/>
          <div>
            <p>Lý luận giúp định hướng hoạt động. Thực tiễn cung cấp điều kiện, yêu cầu và kiểm nghiệm nhận thức. Hành trình đặt bạn vào những thời điểm cần xem xét mối liên hệ ấy.</p>
            <p>Đây là một mô phỏng giáo dục. Kết quả mô tả xu hướng lựa chọn trong game, không đánh giá con người hay dự đoán sự nghiệp của bạn.</p>
          </div>
        </div>
        <p className="modal-description">Chạy hoàn toàn trên trình duyệt. Tiến trình được lưu trên thiết bị này.</p>
      </div>}
      {popup === 'reset' && <><p className="modal-description">Tiến trình và các lựa chọn hiện tại sẽ được thay bằng một hành trình mới. Bạn muốn bắt đầu lại từ ngày tốt nghiệp?</p><div className="modal-actions"><button className="secondary-button" onClick={() => setPopup(null)}>GIỮ HÀNH TRÌNH</button><button className="primary-button" onClick={newGame}>HÀNH TRÌNH MỚI</button></div></>}
    </Modal>}
  </div></MotionConfig>;
}
