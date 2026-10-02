import { scenes } from '../data/scenes';
export function CareerTimeline({ current, completed = false }: { current: number; completed?: boolean }) {
  return <nav className="career-timeline" aria-label="Tiến trình sự nghiệp"><div className="timeline-caption"><span>HÀNH TRÌNH SỰ NGHIỆP</span><span>{completed ? 'HOÀN THÀNH' : `${current + 1} / ${scenes.length}`}</span></div><ol>{scenes.map((scene, i) => <li key={scene.id} className={completed || i < current ? 'complete' : i === current ? 'current' : ''} aria-current={!completed && i === current ? 'step' : undefined}><span title={scene.title}>{String(scene.id).padStart(2, '0')}</span></li>)}</ol><div className="timeline-phases"><span>GIẢNG ĐƯỜNG</span><span>THÍCH NGHI</span><span>PHÁT TRIỂN</span><span>QUẢN LÝ</span></div></nav>;
}
