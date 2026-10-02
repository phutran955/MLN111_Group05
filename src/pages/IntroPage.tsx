import { ArrowRight, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { DialogueBox } from '../components/DialogueBox';
import { useState } from 'react';
const lines = [
  { type: 'narration' as const, text: 'Bạn đã dành nhiều năm để chuẩn bị cho thế giới nghề nghiệp.' },
  { type: 'narration' as const, text: 'Nhưng những gì diễn ra ngoài giảng đường không phải lúc nào cũng giống với những gì được viết trong giáo trình.' },
  { type: 'narration' as const, text: 'Trong hành trình phía trước, không phải lựa chọn nào cũng hoàn toàn đúng hoặc hoàn toàn sai.' },
  { type: 'narration' as const, text: 'Điều quan trọng là cách bạn nhận diện và xử lý mâu thuẫn. Câu chuyện bắt đầu vào ngày bạn tốt nghiệp.' },
];
export default function IntroPage({ onBegin, reducedMotion, onNext }: { onBegin: () => void; reducedMotion: boolean; onNext: () => void }) {
  const [done, setDone] = useState(false);
  return <main className="intro-page"><motion.div className="intro-emblem" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}><GraduationCap size={52}/></motion.div><span className="eyebrow">PROLOGUE / LỜI MỞ ĐẦU</span><h1>Thế giới ngoài<br/><span>trang sách.</span></h1><p className="intro-subtitle">Một tấm bằng. Mười bước ngoặt. Một hành trình của riêng bạn.</p>{!done ? <DialogueBox lines={lines} reducedMotion={reducedMotion} onComplete={() => setDone(true)} onNext={onNext}/> : <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="intro-begin"><p>Không cần biết trước mọi câu trả lời.<br/>Bạn chỉ cần bắt đầu.</p><button className="primary-button" autoFocus onClick={onBegin}>BEGIN<ArrowRight size={18}/></button></motion.div>}</main>;
}
