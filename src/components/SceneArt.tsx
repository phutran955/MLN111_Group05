import { useEffect, useState } from 'react';
import { BookOpen, Cpu, Building2 } from 'lucide-react';

export function SafeImage({ src, className, alt = '' }: { src: string; className?: string; alt?: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return failed ? null : <img src={src} className={className} alt={alt} onError={() => setFailed(true)} decoding="async"/>;
}

export function SceneArt({ background, character, isLanding = false }: { background: string; character?: string; isLanding?: boolean }) {
  const isCustomIllustrated = background && !background.endsWith('.svg');

  return (
    <div className={`scene-art ${isLanding ? 'landing-art' : ''}`} aria-hidden="true">
      <div className="art-grid"/><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
      <div className="fallback-building"><Building2/><BookOpen/><Cpu/></div>
      <SafeImage src={background} className="background-art"/>
      {!isCustomIllustrated && <div className="art-ground"/>}
      {!isCustomIllustrated && character && (
        <div className="character-wrap">
          <div className="character-fallback"><span/><i/></div>
          <SafeImage src={character} className="character-art"/>
        </div>
      )}
      <span className="art-coordinate">21° 02′ N / 105° 51′ E</span>
      <span className="art-tag tag-left">KNOWLEDGE<br/><b>ĐIỀU ĐÃ HỌC</b></span>
      <span className="art-tag tag-right">EXPERIENCE<br/><b>ĐIỀU SẼ ĐẾN</b></span>
    </div>
  );
}
