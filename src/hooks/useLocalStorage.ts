import { useState } from 'react';
export function useLocalStorage<T>(key: string, fallback: T, validate: (value: unknown) => value is T) {
  const [value, setValue] = useState<T>(() => {
    try { const raw = localStorage.getItem(key); const parsed: unknown = raw ? JSON.parse(raw) : null; return validate(parsed) ? parsed : fallback; } catch { return fallback; }
  });
  function update(next: T) { setValue(next); try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* Settings remain usable in memory. */ } }
  return [value, update] as const;
}
