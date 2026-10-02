# Verification

Verified on 2026-10-02.

- `npm install`: succeeds. Lockfile included.
- `npm run dev`: Vite starts successfully at http://localhost:5173.
- `npm run lint`: passes without errors or warnings.
- `npm run test`: 7 tests pass, including all 1,024 complete choice paths and save round-trips after every choice/advance.
- `npm run build`: TypeScript strict and Vite production build pass. Output: `dist/`.

Browser checks:

- Intro through all 10 scenes to ending; played scene 1 A, then scenes 2–10 B. Final scores: theory 2, practice 9, resolution 10; ending: GIẢI QUYẾT MÂU THUẪN.
- Choice cards absent before dialogue completion. Enter and Space advance exactly one line when typewriter is disabled.
- Refresh after scene 1 choice → CONTINUE restores locked choice and practice 1; no duplicate scoring.
- YOUR JOURNEY displays all 10 recorded choices.
- New Game confirmation opens; confirming resets all three scores to zero and returns to intro.
- Reduced Motion persists after reload.
- Desktop checked at 1440×1000 and 1920×1080. Mobile checked at 390×844. No horizontal document overflow observed; mobile choice cards stack vertically.
- Temporarily removed both graduation background and student character; scene still renders and CSS fallbacks remain. Both original assets restored after verification.
- Desktop landing screenshot: `docs/landing-desktop.jpg`.

Known constraint: the exact supplied scoring makes L+T odd (9 or 11) on every complete path. Four ending branches are implemented, but the L=T ending cannot be reached without changing a supplied rule. Separate tests verify its calculation branch. No scoring rules were changed.

Not measured: Lighthouse scores. Not performed: publishing to an external Vercel account. Vercel build/output configuration is included.

## Repository consolidation — 2026-10-02

The duplicate nested `MLN111_Group05/` clone was consolidated into the workspace root. All 67 shared tracked files matched by hash before consolidation. The clone's `.gitattributes`, `main` history and GitHub origin were preserved. The previous root Git metadata and duplicate files were moved to a temporary recovery backup outside the project. The workspace now has one Git repository and one copy of the game source. Commands should be run in the root containing `package.json`; Vercel Root Directory should remain the repository root.

After consolidation: `npm run lint`, all 7 tests (including the 1,024 paths), and `npm run build` passed in the workspace root.
