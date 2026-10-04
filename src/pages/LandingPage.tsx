import { ArrowRight, BookOpen, BriefcaseBusiness, Clock3, GitMerge, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { assets } from '../config/assets';
import { SceneArt } from '../components/SceneArt';
import type { GameState } from '../types/game';
export default function LandingPage({ state, onStart, onContinue, onHelp, onAbout }: { state: GameState; onStart: () => void; onContinue: () => void; onHelp: () => void; onAbout: () => void }) {
  return <main className="landing-page">
    <div className="landing-hero">
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="eyebrow"><span className="live-dot"/> AN INTERACTIVE CAREER JOURNEY</div>
        <h1>GIỮA HAI<br/><span>THẾ GIỚI</span><span className="title-period">.</span></h1>
        <div className="hero-subtitle"><span/>Từ giảng đường đến thực tiễn</div>
        <p className="hero-description">Mỗi lựa chọn định hình cách bạn đối mặt với khoảng cách giữa điều đã học và điều thực tế đòi hỏi.</p>
        <div className="hero-actions">{state.gameStarted ? <><button className="primary-button" onClick={onContinue}><Play size={17}/>{state.gameCompleted ? 'TIẾP TỤC HÀNH TRÌNH · XEM KẾT QUẢ' : 'TIẾP TỤC HÀNH TRÌNH'}<ArrowRight size={19}/></button><button className="secondary-button" onClick={onStart}>HÀNH TRÌNH MỚI</button></> : <button className="primary-button" onClick={onStart}>START JOURNEY<ArrowRight size={20}/></button>}</div>
        <div className="hero-links"><button onClick={onHelp}>HOW TO PLAY</button><span>/</span><button onClick={onAbout}>ABOUT</button></div>
        <div className="hero-details"><span><Clock3 size={14}/>10–15 phút</span><span><GitMerge size={14}/>10 bước ngoặt</span><span>04 kết thúc</span></div>
      </motion.div>
      <motion.div className="hero-visual" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}><SceneArt background={assets.backgrounds.landing} isLanding/><div className="visual-top"><span>CAREER SIMULATION / 01</span><span className="live-dot"/></div><div className="visual-bottom"><span>YOUR FUTURE IS UNWRITTEN</span><span>↗</span></div></motion.div>
    </div>
    <section className="worlds-strip" aria-label="Chủ đề của hành trình"><div><img src={assets.decorations.theory_strip} alt="" className="strip-thumb-img"/><span className="strip-number">01</span><BookOpen size={22}/><span><strong>Nền tảng lý luận</strong><small>Những điều bạn mang theo</small></span></div><div className="strip-bridge"><span/><GitMerge size={20}/><span/></div><div><span className="strip-number">02</span><BriefcaseBusiness size={22}/><span><strong>Thế giới thực tiễn</strong><small>Những điều bạn sẽ khám phá</small></span></div><p>Không có đáp án tuyệt đối.<br/><b>Chỉ có hành trình của bạn.</b></p></section>
    <footer className="landing-footer"><span>MLN111 · LÝ LUẬN & THỰC TIỄN</span><span>ĐƯỢC ĐỊNH HÌNH BỞI LỰA CHỌN CỦA BẠN</span></footer>
  </main>;
}
