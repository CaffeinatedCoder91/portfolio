# AGENTS.md — Agent instructions

---

## VISUAL REFERENCE — READ THIS FIRST

The file `joanna-portfolio.html` in the project root
is the visual target for this entire project.

**Claude Code — before every session:**

1. Open joanna-portfolio.html in a browser
2. Browse every section
3. Find the relevant screenshot in design/ or
   design/components/ and study it carefully
4. Keep both open while you build
5. Before finishing: open localhost:3000 side by side
   with joanna-portfolio.html and compare visually
   Do not finish if they don't match

**Claude Code — how to extract exact values:**
If unsure about a spacing, colour or font size,
read joanna-portfolio.html directly — the CSS is
inline in a <style> tag near the top of the file.
All values are there. Use them exactly.
Never approximate or guess a value.

**Codex — before every review:**

1. Open joanna-portfolio.html in a browser
2. Open the relevant design/ screenshot
3. Compare the PR diff against both
4. If the implementation doesn't match the visual
   reference — flag it as [BLOCK]

---

Two agents work on this codebase:

- **Claude Code** — builds features
- **Codex** — reviews PRs

Read this file in full before touching any code.
Read SPEC.md before every session.
Open joanna-portfolio.html in a browser to see the
visual target before building any component.

---

## Non-negotiable rules (both agents)

1. **SPEC.md is the source of truth.** If a prompt
   conflicts with SPEC.md, flag it — do not deviate.

2. **No babel.config.js ever.** This file was the
   root cause of v1 failure. Never create it.
   SC + Next.js uses the SWC compiler option only:
   `compiler: { styledComponents: true }` in next.config.ts

3. **TypeScript strict.** Zero `any`. Zero `@ts-ignore`.
   If you can't type it, ask.

4. **All styles via Styled Components using theme values.**
   No inline `style={{}}` except:
   - error.tsx and not-found.tsx (load before SC)
   - global-error.tsx (same reason)
   - skip-to-content link in layout.tsx
     No hardcoded hex values — always `theme.colors.X`.
     No hardcoded px values — always `theme.space.X`.

5. **Transient props use $ prefix.**
   `$visible`, `$active`, `$color` — not `visible`,
   `active`, `color`. This prevents unknown DOM prop
   warnings in React.

6. **Server components by default.**
   Only add "use client" when you need:
   browser APIs, event handlers, useState, or
   useEffect. Document why with a comment.

7. **Accessibility is not optional.**
   Every component passes axe. Semantic HTML first.

8. **Run the full check before marking done:**
   `npm run lint && npm run type-check && npm run test`
   All three must pass before finishing any session.

9. **Visual match is required.**
   Before finishing any session, open the browser
   and compare against the relevant screenshot in
   design/ and the full reference joanna-portfolio.html.
   If it doesn't match, fix it before finishing.

10. **Storybook story required for every UI component.**
    Every component in components/ui/ and every major
    section component gets a story in stories/ before
    it goes into a page.

---

## Claude Code — builder

### Before you write a single line

1. Read SPEC.md completely
2. Open joanna-portfolio.html in a browser
3. Find the relevant screenshot in design/
4. Read content/data.ts to understand the content shape
5. Read styles/theme.ts to understand available values
6. Check components/ui/ — a shared primitive may exist

### Component pattern — always use rafce

Every component is written as a React Arrow Function
Component Export (rafce). No class components except
InkCanvasErrorBoundary (which must be a class).
No function keyword components.

```tsx
// Server component (default)
import React from 'react';

interface Props {
  num: string;
  label: string;
}

const StatCard = ({ num, label }: Props) => {
  return (
    <div>
      <b>{num}</b>
      <span>{label}</span>
    </div>
  );
};

export default StatCard;
```

```tsx
// Client component
'use client';

import React from 'react';

interface Props {
  $active: boolean;
  children: React.ReactNode;
}

const NavInner = ({ $active, children }: Props) => {
  return <nav>{children}</nav>;
};

export default NavInner;
```

The `rafce` snippet pattern is the standard for this
project. Never use `function ComponentName()` syntax.
Never use class components except where explicitly
specified (InkCanvasErrorBoundary only).

### How to build a component

```
1. Define the TypeScript interface for props
2. Write the component (server unless needs client)
3. Write Styled Components in the same file or a
   co-located ComponentName.styles.ts file
4. Write the Storybook story in stories/
5. Write the test in ComponentName.test.tsx
6. Open browser and compare against design screenshot
7. Export from component's index.ts
```

### Styled components placement — outside the arrow function

Styled components must always be defined OUTSIDE the
arrow function component. Defining them inside causes
the styled component to be recreated on every render,
which breaks animations, loses focus, and tanks
performance.

```tsx
// CORRECT — defined outside, created once
const Card = styled.div`
  background: ${({ theme }) => theme.colors.paper2};
  border-radius: ${({ theme }) => theme.radius.lg};
`;

const ProjectCard = ({ project }: Props) => {
  return <Card>...</Card>;
};

export default ProjectCard;
```

```tsx
// WRONG — defined inside, recreated every render
const ProjectCard = ({ project }: Props) => {
  const Card = styled.div`
    // ❌ never do this
    background: ${({ theme }) => theme.colors.paper2};
  `;
  return <Card>...</Card>;
};

export default ProjectCard;
```

This applies to every styled component in every file.
No exceptions. If you find yourself defining a styled
component inside a function, extract it above.

### Styled Components patterns

**Always use theme — never hardcode:**

```ts
// WRONG
const Card = styled.div`
  background: #faf7f0;
  border-radius: 22px;
`;

// CORRECT
const Card = styled.div`
  background: ${({ theme }) => theme.colors.paper2};
  border-radius: ${({ theme }) => theme.radius.lg};
`;
```

**Transient props for conditional styles:**

```ts
// WRONG — forwards to DOM
const Dot = styled.span<{ active: boolean }>`
  background: ${({ active, theme }) =>
    active ? theme.colors.ai : theme.colors.line};
`;

// CORRECT — $ prefix prevents DOM forwarding
const Dot = styled.span<{ $active: boolean }>`
  background: ${({ $active, theme }) =>
    $active ? theme.colors.ai : theme.colors.line};
`;
```

**CSS animations with keyframes:**

```ts
import { keyframes, css } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section<{ $visible: boolean }>`
  opacity: 0;
  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${fadeUp} 0.55s ease forwards;
    `}
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;
```

**prefers-reduced-motion — always respected:**
Every animated component must disable or simplify
its animation when reduced motion is preferred.
Use the useReducedMotion hook from hooks/.

### Ink canvas

The ink cursor effect is pure canvas — no SC needed:

- `ctx.clearRect(0, 0, W, H)` every frame (full clear)
- Particles: twilight violet + rare magenta sparkle
- Exit early if prefers-reduced-motion is set
- All event listeners passive and cleaned up on unmount
- Wrapped in InkCanvasErrorBoundary (class component)
- Renders null on error — hero still readable without it

### "use client" checklist

Before adding "use client":

- [ ] Does this actually need browser APIs or events?
- [ ] Can the interaction be handled with CSS alone?
- [ ] Can I lift state so only a small wrapper is client?

If yes to first and no to others: add "use client"
and add a comment explaining why.

### Commit message format

```
feat(nav): add pill nav with scroll-hide behaviour
fix(hero): restore ink canvas after error boundary
a11y(modal): add focus trap and Escape key handler
perf(skills): pause marquee animation off-screen
test(card): add axe assertion to ProjectCard test
story(button): add Button stories with all variants
style(timeline): match date pill to design screenshot
```

Types: feat fix a11y perf style test story docs chore

---

## Codex — reviewer

### Before reviewing

1. Read SPEC.md
2. Open joanna-portfolio.html to see the visual target
3. Find the relevant design screenshot in design/

### Review checklist

#### Never approve if any of these are present

- [ ] Component written as `function ComponentName()`
      instead of `const ComponentName = () =>` (rafce)
      Exception: InkCanvasErrorBoundary only
- [ ] Styled component defined INSIDE an arrow function
      (must always be defined outside, at module level)

- [ ] `babel.config.js` exists anywhere in the project
- [ ] `any` type used without justification
- [ ] Hardcoded colour hex in a styled component
- [ ] Hardcoded px value in a styled component
      (acceptable exceptions: error pages, skip-to-content)
- [ ] Transient prop missing $ prefix
- [ ] "use client" without a justifying comment
- [ ] Animation without prefers-reduced-motion fallback
- [ ] External link without rel="noopener noreferrer"
- [ ] Image without meaningful alt text
- [ ] test.skip or it.skip anywhere
- [ ] Missing axe assertion in a component test
- [ ] Missing Storybook story for a UI component

#### TypeScript

- [ ] No any types
- [ ] Props interfaces complete and well-named
- [ ] SC transient props use $ prefix
- [ ] Theme type used correctly (no casting)
- [ ] Return types explicit on exported functions

#### Styled Components

- [ ] All colours via `theme.colors.X`
- [ ] All spacing via `theme.space.X`
- [ ] All radius via `theme.radius.X`
- [ ] All shadows via `theme.shadows.X`
- [ ] Transient props ($prefix) used for conditional styles
- [ ] No CSS-in-JS logic that should be a component variant
- [ ] keyframes imported from styled-components not framer

#### React / Next.js

- [ ] "use client" boundary as small as possible
- [ ] No unnecessary useEffect
- [ ] Keys in lists are stable and meaningful
- [ ] next/image for all images with alt and sizing
- [ ] next/font for all fonts
- [ ] No hardcoded strings that belong in content/data.ts
- [ ] Server component where possible

#### Accessibility

- [ ] Semantic HTML — native element before ARIA
- [ ] Interactive elements have accessible names
- [ ] Focus management correct in modal
- [ ] prefers-reduced-motion respected
- [ ] Colour contrast passes 4.5:1
- [ ] aria-hidden on decorative elements

#### Visual match

- [ ] Compare rendered output against design screenshot
- [ ] Colours match the palette in SPEC.md
- [ ] Typography matches spec (font, weight, size)
- [ ] Spacing feels consistent with other sections
- [ ] Mobile layout correct below 820px and 375px

#### Testing

- [ ] Test file exists for every component
- [ ] axe assertion in every test file
- [ ] Tests test behaviour not implementation
- [ ] No test.skip anywhere
- [ ] Edge cases covered

#### Storybook

- [ ] Story exists for every UI component
- [ ] All variants shown in the story
- [ ] ThemeProvider and GlobalStyles in preview decorator
- [ ] Story renders without console errors

### Feedback format

- `[BLOCK]` — must fix before merge
  (TypeScript errors, a11y failures, missing tests,
  babel.config.js found, security issues)
- `[SHOULD]` — strong preference, fix in this PR
  (performance, naming, code quality)
- `[NIT]` — optional, minor
  (personal preference, tiny style points)

One clear comment per issue with a suggested fix.

### What you are NOT reviewing

- Visual design decisions — design is resolved
- Content copy — lives in content/data.ts, Joanna's to edit
- Stack choices — decided, don't suggest alternatives

---

## Branching and workflow

```
main (protected — Vercel deploys from here)
  └── feat/session-01-scaffold
  └── feat/session-02-storybook-setup
  └── feat/session-03-ui-components
  └── feat/session-04-nav
  └── feat/session-05-hero
  └── ...
```

- Branch from main, name it `feat/session-XX-name`
- Claude Code opens PR when session is complete and
  all three commands pass
- Codex reviews, Claude Code fixes all [BLOCK] items
- Merge only when Codex approves and CI is green
- Squash merge to keep main history clean
- Never commit SPEC.md, AGENTS.md, joanna-portfolio.html,
  or anything in design/ — all are gitignored
