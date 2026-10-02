import { useCallback, useEffect, useRef } from 'react';
import { assets } from '../config/assets';
import type { Settings } from '../types/game';
export function useAudio(settings: Settings) {
  const music = useRef<HTMLAudioElement | null>(null);
  const unlocked = useRef(false);
  const missing = useRef(new Set<string>());
  const sounds = useRef(new Map<string, HTMLAudioElement>());
  const toneContext = useRef<AudioContext | null>(null);
  const play = useCallback((name: keyof typeof assets.audio) => {
    if (name === 'hover' && !unlocked.current) return;
    unlocked.current = true;
    if (settings.music && !missing.current.has(assets.music)) {
      music.current ??= new Audio(assets.music);
      music.current.loop = true; music.current.volume = 0.18;
      music.current.onerror = () => { missing.current.add(assets.music); };
      void music.current.play().catch(() => {});
    }
    if (!settings.sfx) return;
    // Quiet synthesized UI cues keep the placeholder game audible without audio files.
    const fallback = () => { try {
      toneContext.current ??= new AudioContext();
      const ctx = toneContext.current;
      void ctx.resume();
      const oscillator = ctx.createOscillator(); const gain = ctx.createGain();
      oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(name === 'hover' ? 540 : name === 'ending' ? 660 : 440, ctx.currentTime);
      gain.gain.setValueAtTime(0.018, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
      oscillator.connect(gain); gain.connect(ctx.destination); oscillator.start(); oscillator.stop(ctx.currentTime + 0.1);
    } catch { /* Audio is optional. */ } };
    const path = assets.audio[name];
    if (missing.current.has(path)) { fallback(); return; }
    let audio = sounds.current.get(path);
    if (!audio) { audio = new Audio(path); audio.volume = 0.3; audio.onerror = () => { missing.current.add(path); }; sounds.current.set(path, audio); }
    audio.currentTime = 0; void audio.play().catch(() => { if (missing.current.has(path)) fallback(); });
  }, [settings.music, settings.sfx]);
  useEffect(() => {
    if (!settings.music) music.current?.pause();
    else if (unlocked.current && !missing.current.has(assets.music)) {
      music.current ??= new Audio(assets.music);
      music.current.loop = true; music.current.volume = 0.18;
      music.current.onerror = () => { missing.current.add(assets.music); };
      void music.current.play().catch(() => {});
    }
  }, [settings.music]);
  useEffect(() => () => { music.current?.pause(); for (const audio of sounds.current.values()) audio.pause(); void toneContext.current?.close(); }, []);
  return play;
}
