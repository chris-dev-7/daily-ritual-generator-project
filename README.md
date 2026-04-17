# Daily Ritual Generator

> **From sunrise to sunset** — a gentle way to shape your day, one intentional choice at a time.

---

## My Inspiration

The world around us pulls us in a hundred directions: emails, deadlines, family, and the constant thought of “what’s next.” When we’re overstimulated or running on autopilot, our nervous system can slip into dysregulation. That scattered, wired, or dis associated feeling where it’s hard to be present in the body or focus on what actually matters- YOU.

**Presence** isn’t a luxury; it’s how we reconnect with our Higher Self. Small, repeatable rituals — Sunrise grounding, a moment of Creativity, Movement, Mindfulness, and an Evening Wind-Down — help signal safety and presence to the brain and body. They don’t fix everything overnight, but they do  offer support with predictable anchors that make “showing up for yourself” feel doable instead of overwhelming.

### The problem 

- Decision fatigue: “What should I do for myself today?” becomes another task.
- All-or-nothing thinking: if you can’t do a perfect routine, you do nothing.
- Disconnection: scrolling or rushing replaces small acts of care that regulate mood and energy.

### What this app does about it

The **Daily Ritual Generator** is a health and wellness focused, low-friction tool that:

1. **Pulls five curated activities** across your whole day — *Morning Ritual*, *Creativity*, *Movement*, *Mindfulness*, and *Evening Wind Down* — so your routine touches body, mind, and Self.
2. **Lets you lock what you love** and reshuffle the rest, so you stay in control without staring at a blank planner.
3. **Remembers your ritual** (via local storage) so coming back doesn’t mean starting from zero.
4. **Saves and shares** your “perfect day” as a PNG and a link, so accountability and celebration stay light and social.

It’s not therapy — it’s a **ritual companion**: a nudge toward structure, presence, and self-care in a format that feels human and a little magical.

---

## Technical overview

Stack: **React 19**, **Vite 7**, **Tailwind CSS v4**, **GSAP** (ScrollTrigger, SplitText), **html2canvas** for image export.

### Custom components & how they fit together

| Piece | Role |
|--------|------|
| **`App.jsx`** | Root orchestration: loads five activity pools, generates random picks per category, respects **locked** cards on regenerate, persists state with `usePersistedState`, reads `?ritual=` share URLs on load, and wraps the capture root for PNG export. |
| **`Header.jsx`** | Hero title, scroll-driven intro copy (“From sunrise to sunset…”), decorative **star layer** (fixed for visuals; adjusted in clone for clean screenshots), and **GSAP** line-by-line animations via `matchMedia` for mobile vs desktop. |
| **`ActivityCard.jsx`** | Presents category icon, activity name, details, duration, and **lock/unlock** affordance; category-to-icon mapping keeps the UI consistent across data files. |
| **`Button.jsx`** | Context-aware CTA: *Generate My Day* → *New Activity(ies)* when four are locked → *Save & Share My Perfect Day* when all five are locked. |

### Hooks & utilities

- **`usePersistedState`** — Syncs ritual state to **local storage** so refreshes keep your cards until you change them.
- **`shareUtils.jsx`** — Builds share URLs with `import.meta.env.BASE_URL` (GitHub Pages–safe), runs **html2canvas** on the ritual root with an **`onclone`** tweak so fixed star layers rasterize correctly, and uses the **Web Share API** where available (with clipboard fallback).

### Data layer

Activities live in **modular JS arrays** (`morningRoutineActivities`, `creativityActivities`, `movementActivities`, `mindfulnessActivities`, `eveningWindDownActivities`) — easy to extend or swap copy without touching UI logic.

### Responsive layout

- **Desktop:** single row of five cards; separate animated title block.
- **Mobile:** two rows (3 + 2 cards) for readable tap targets and scrolling.

---
