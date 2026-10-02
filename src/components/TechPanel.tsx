import type { HTMLAttributes } from 'react';
export function TechPanel({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`tech-panel ${className}`} {...props}>{children}</div>;
}
