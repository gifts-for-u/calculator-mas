# Implementation Plan — MamasOS Calculator Love Experience

Based on requirements specified in `AGENT.md` and `PRD.md`.

## 1. Architecture & File Structure

The project will be built using vanilla HTML5, CSS3, and JavaScript (ES6+), deployable directly on GitHub Pages with zero build dependencies and zero external runtime dependencies.

```text
/
├── index.html              # Main single-page entry containing state wrappers
├── PLAN.md                 # This implementation plan and progress checklist
├── AGENT.md                # System prompt and developer constraints
├── PRD.md                  # Product requirement document
├── README.md               # User guide & copy customization instructions
├── css/
│   ├── calculator.css      # Modern mobile calculator styling & subtle cute elements
│   ├── mamasos.css         # Terminal TUI styling, borders, ASCII chrome, cursor
│   ├── animations.css      # Smooth transitions, glitch/shutdown, typing effect, spinner
│   └── responsive.css      # Mobile-first constraints (360px–412px viewport tuning)
└── js/
    ├── app.js              # Central State Machine orchestrator
    ├── calculator.js       # Calculator math engine & 3-calculation counter
    ├── date-validator.js   # Flexible normalization for 9 June 2023 anniversary
    ├── boot-sequence.js    # TUI boot, diagnostic scan, error list, 1s fixing dots
    ├── dashboard.js        # MamasOS menu navigation & message view controller
    ├── messages.js         # Centralized romantic copy & config (easily editable)
    └── sound.js            # Optional Web Audio API micro-effects with mute toggle
```

---

## 2. Core State Machine

Single source of truth in `app.js`:
- `CALCULATOR`: Calculator active.
- `DATE_PROMPT`: Anniversary modal shown after 3rd calculation.
- `CALCULATOR_SHUTDOWN`: Calculator flickers, powers off.
- `BLANK_TRANSITION`: 1.2s pitch black screen ("kok mati?").
- `MAMASOS_BOOT`: Terminal init, 3s `SCANNING_ERROR..` spinner.
- `ERROR_VALIDATED`: Header displays error confirmation.
- `ERROR_DIAGNOSTICS`: Display of 5 uppercase underscore errors (`AFFECTION_OVERFLOW`, etc.).
- `FIXING_ERROR`: Dot progression at strict 1s intervals (`.`, `..`, `...`).
- `ERROR_FIXED`: Confirmation message displayed.
- `LOVE_SENT`: `ALL_THE_LOVE_IS_DIRECTLY_SENT_TO_YOU` + `PRESS_ANYWHERE_TO_CONTINUE`.
- `DASHBOARD`: TUI menu listing 4 modules (`APOLOGIZE_01`, `APOLOGIZE_02`, `LOVE_U`, `MAKE_UP`).
- `MESSAGE_VIEW`: Individual message screen with character-by-character typing & top-left `< BACK`.

---

## 3. Implementation Steps

### Phase 1: Data & Config Setup
- [x] Create `js/messages.js` with structured copy for the 4 modules, modal prompts, and timings.
- [x] Create `js/sound.js` with synthesized retro TUI audio (clicks, beeps, power down) using Web Audio API + mute toggle.

### Phase 2: Calculator Engine & UI
- [x] Create `css/calculator.css` featuring modern rounded keys, Google Sans typography, soft pastel accents, and subtle cute stars/dots.
- [x] Create `js/calculator.js` handling standard operations (`+`, `-`, `×`, `÷`, `%`, `±`, `.`) and exact counting of completed calculations via `=`.
- [x] Create `js/date-validator.js` with multi-format normalization for 9 June 2023 (`09062023`, `9/6/2023`, `09-06-2023`, `09.06.2023`, etc.).

### Phase 3: Transition & MamasOS TUI Boot Engine
- [x] Create `css/mamasos.css` with JetBrains Mono, TUI box borders, scanline effect, and high contrast terminal aesthetic.
- [x] Create `css/animations.css` with CRT shutdown, spinner frames, and blinking cursor.
- [x] Create `js/boot-sequence.js` executing:
  - 3s spinner for `SCANNING_ERROR..`
  - Display `ERROR_VALIDATED`
  - Display `[ERR-001]` to `[ERR-005]` including `AFFECTION_OVERFLOW`
  - 2 blank lines followed by 1s interval dot updates for `FIXING_ERROR...`
  - `ERROR_HAS_BEEN_FIXED`
  - `ALL_THE_LOVE_IS_DIRECTLY_SENT_TO_YOU`
  - Tap anywhere to proceed.

### Phase 4: MamasOS Dashboard & Message Screen
- [x] Create `js/dashboard.js` with responsive TUI menu for `APOLOGIZE_01`, `APOLOGIZE_02`, `LOVE_U`, `MAKE_UP`.
- [x] Implement reusable message view with 25-45ms typewriter effect, skip on tap, and top-left `< BACK` button.

### Phase 5: Assembly, Integration & Mobile Polish
- [x] Create `index.html` assembling all components with semantic structure and Google Fonts links.
- [x] Create `css/responsive.css` ensuring flawless rendering across 360px, 375px, 390px, 412px and desktop.
- [x] Create `js/app.js` wiring up the state transitions.

### Phase 6: Automated Testing & Verification
- [x] Verify calculator math logic and calculation count.
- [x] Verify date normalization with table-driven test suite.
- [x] Verify browser rendering and end-to-end flow with browser subagent / devtools.
- [x] Update `README.md` with instructions on how to customize copy and deploy to GitHub Pages.
