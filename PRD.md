# PRD — MamasOS Calculator Love Experience

## 1. Product Overview

**Product Name:** MamasOS Calculator Love Experience  
**Product Type:** Interactive romantic web experience  
**Primary Platform:** Mobile web  
**Deployment:** GitHub Pages  
**Primary Audience:** One intended recipient (the user's girlfriend)  
**Primary Goal:** Create a playful, surprising, interactive apology-and-reconciliation experience disguised initially as a modern calculator.

The experience begins as a normal calculator. After the third completed calculation, the calculator asks for the couple's relationship anniversary date. If the date is recognized as **9 June 2023**, the calculator appears to shut down and transitions into a fake operating-system boot sequence called **MamasOS**.

MamasOS uses a terminal/TUI visual language. After its diagnostic sequence, it opens a dashboard containing four interactive message modules:

1. `APOLOGIZE_01`
2. `APOLOGIZE_02`
3. `LOVE_U`
4. `MAKE_UP`

Each module opens a dedicated message screen with a typing animation and a top-left back control.

The actual romantic/apology copy will be inserted later. Placeholder content must therefore be used during initial implementation.

---

## 2. Product Goals

### Primary goals

- Make the recipient initially believe they are using a normal calculator.
- Create a surprise reveal after the anniversary date is entered correctly.
- Make the transition from calculator → MamasOS feel intentional and cinematic.
- Make MamasOS visually resemble a real terminal/TUI rather than a generic "hacker" webpage.
- Provide a simple apology/reconciliation dashboard after the boot sequence.
- Make every interaction comfortable on a phone.
- Keep the project deployable as a static GitHub Pages website.
- Keep the implementation maintainable enough for future copy, visual, and animation changes.

### Non-goals

- No authentication.
- No backend.
- No database.
- No server-side API.
- No real operating-system functionality.
- No real terminal command execution.
- No sensitive data collection.
- No requirement for a desktop/laptop experience.

---

## 3. Target Experience

The intended emotional progression is:

```text
NORMAL
  ↓
CURIOUS
  ↓
SURPRISED
  ↓
"WHAT IS HAPPENING?"
  ↓
AMUSED
  ↓
EMOTIONAL
  ↓
APOLOGY / RECONCILIATION
```

The experience should feel like a small interactive gift, not a conventional landing page.

---

# 4. End-to-End User Flow

```text
[Calculator]
     |
     | completed calculation #1
     |
     | completed calculation #2
     |
     | completed calculation #3
     v
[Anniversary Date Popup]
     |
     | valid date
     v
[Calculator Shutdown]
     |
     v
[Blank / Black Screen]
     |
     v
[MamasOS Boot]
     |
     | ~3 seconds
     v
[ERROR_VALIDATED]
     |
     v
[ERROR DIAGNOSTICS]
     |
     v
[FIXING_ERROR...]
     |
     v
[ERROR_FIXED]
     |
     v
[LOVE SENT MESSAGE]
     |
     | tap to continue
     v
[MamasOS Dashboard]
     |
     +--> [APOLOGIZE_01]
     |
     +--> [APOLOGIZE_02]
     |
     +--> [LOVE_U]
     |
     +--> [MAKE_UP]
```

---

# 5. Phase 1 — Calculator

## 5.1 Purpose

The calculator is the initial disguise. It should look sufficiently complete and polished that the recipient has no reason to assume it is a romantic experience.

## 5.2 Visual direction

Use a modern mobile calculator aesthetic:

- clean layout
- rounded controls
- generous touch targets
- subtle decorative details
- modern typography
- restrained color palette
- responsive layout
- no obvious MamasOS branding

Recommended calculator font:

- Google Sans or another modern sans-serif equivalent.

Recommended subtle decorations:

- small stars
- tiny hearts
- soft dots
- minimal doodle elements
- subtle background shapes

Decorations must not interfere with the calculator controls.

Avoid:

- excessive hearts
- large romantic messages
- obvious relationship references
- visual clutter

The recipient should initially perceive the page as a calculator.

---

# 6. Calculator Behavior

## 6.1 Calculation counter

Track completed calculations using the `=` action.

```text
Calculation #1
Calculation #2
Calculation #3
```

Only the third completed calculation triggers the anniversary-date popup.

The counter should exist in runtime state only. No persistence is required.

## 6.2 Third calculation trigger

After the third successful calculation, show a modal/popup:

> eh coba masukin tanggal jadian kita deh sayang

Input:

```text
[________________]
       [ OK ]
```

The calculator should remain visually present behind the popup.

---

# 7. Anniversary Date Validation

## 7.1 Target date

The relationship anniversary is:

**9 June 2023**

Canonical representation:

```text
09/06/2023
```

## 7.2 Accepted input variations

The implementation must accept multiple reasonable representations because the recipient may not remember the expected formatting.

Examples:

```text
09062023
9062023
0962023
962023

09/06/2023
9/6/2023

09-06-2023
9-6-2023

09.06.2023
9.6.2023
```

A reasonable compact representation may also be accepted if it can be unambiguously normalized to 9 June 2023.

## 7.3 Normalization

Input handling should:

1. trim whitespace
2. normalize common separators
3. remove unnecessary spaces
4. interpret numeric variants
5. normalize to a canonical date
6. compare against 9 June 2023

Do not require one exact string.

## 7.4 Invalid date

If invalid:

```text
hmm... kayaknya bukan itu deh sayang
```

The popup remains open and allows another attempt.

The implementation must not lock the recipient out.

---

# 8. Calculator Shutdown Transition

When the correct anniversary date is entered:

1. Close the date popup.
2. Briefly show successful validation.
3. Make the calculator appear to fail/shut down.
4. Fade/remove the calculator UI.
5. Show a black/blank screen.
6. Hold the blank state briefly.
7. Begin MamasOS boot.

The blank interval is intentional.

The recipient should have a short moment of:

> "lah, kok mati?"

before the MamasOS sequence begins.

---

# 9. MamasOS Boot Sequence

## 9.1 Visual language

MamasOS must feel like a browser recreation of a TUI.

Primary characteristics:

- black/dark terminal background
- monospace typography
- JetBrains Mono
- high-contrast terminal text
- thin borders
- terminal-style spacing
- blinking cursor
- minimal UI chrome
- text-based status messages
- subtle terminal animation

Recommended font:

**JetBrains Mono**

The MamasOS portion should not visually resemble the calculator.

## 9.2 Boot sequence

Initial state:

```text
MAMASOS

SCANNING_ERROR..
```

Include a rotating/loading indicator.

Example:

```text
SCANNING_ERROR..  |
SCANNING_ERROR..  /
SCANNING_ERROR..  -
SCANNING_ERROR..  \
```

The exact spinner implementation is flexible.

Duration:

**approximately 3 seconds**

After the scan:

```text
ERROR_VALIDATED
```

Use uppercase and underscore-based naming for system/error identifiers.

Do not keep the `MAMASOS` header permanently visible during the diagnostic list if the transition design calls for a clean diagnostic screen.

---

# 10. Error Diagnostics

After `ERROR_VALIDATED`, show the error list.

Use technical-looking names, but keep the words understandable.

Required errors:

```text
LOVE_OVERLOADED
HUG_NEEDED
MISSING_YOU
ATTENTION_REQUIRED
AFFECTION_OVERFLOW
```

The list should use:

- full uppercase
- underscores instead of spaces
- terminal-style prefixes if desired

Example:

```text
[ERR-001] LOVE_OVERLOADED
[ERR-002] HUG_NEEDED
[ERR-003] MISSING_YOU
[ERR-004] ATTENTION_REQUIRED
[ERR-005] AFFECTION_OVERFLOW
```

`AFFECTION_OVERFLOW` is intentional and must not be replaced with `AFFECTION_BUFFER_FULL`.

---

# 11. Fixing Error Animation

After the diagnostics list, leave approximately two blank terminal lines.

Then display:

```text
FIXING_ERROR.
```

Animate the dots at one-second intervals:

```text
FIXING_ERROR.
FIXING_ERROR..
FIXING_ERROR...
```

The animation should feel like a real terminal process.

Recommended timing:

```text
.   → after 1s
..  → after 1s
... → after 1s
```

The animation may loop once or stop at three dots.

---

# 12. Error Fixed Sequence

After fixing:

```text
ERROR_HAS_BEEN_FIXED
```

Then after a short delay:

```text
ALL_THE_LOVE_IS_DIRECTLY_SENT_TO_YOU
```

For readability, the rendered UI may wrap the message across lines while preserving the technical naming style.

Example:

```text
ERROR_HAS_BEEN_FIXED

ALL_THE_LOVE_IS_DIRECTLY
SENT_TO_YOU
```

Then display:

```text
> PRESS_ANYWHERE_TO_CONTINUE
```

or an equivalent mobile-friendly prompt.

The recipient taps the screen to enter the dashboard.

---

# 13. MamasOS Dashboard

## 13.1 Purpose

The dashboard becomes the main apology/reconciliation area.

It should feel like a small TUI application rather than a traditional card-based website.

## 13.2 Main modules

Required modules:

```text
APOLOGIZE_01
APOLOGIZE_02
LOVE_U
MAKE_UP
```

### Module intent

#### APOLOGIZE_01

First apology message.

Placeholder:

```text
Lorem ipsum dolor sit amet...
```

#### APOLOGIZE_02

Second apology message with different content/tone.

Placeholder:

```text
Lorem ipsum dolor sit amet...
```

#### LOVE_U

Affectionate message.

Placeholder:

```text
Lorem ipsum dolor sit amet...
```

#### MAKE_UP

Reconciliation / persuasion message intended to express a desire to make things right and move forward together.

Placeholder:

```text
Lorem ipsum dolor sit amet...
```

`MAKE_UP` is the recommended name for the fourth module because it communicates the purpose without becoming overly sentimental in the dashboard UI.

---

# 14. Dashboard UI

The dashboard should resemble a terminal application.

Example concept:

```text
┌──────────────────────────────────┐
│ MAMASOS // HOME                  │
├──────────────────────────────────┤
│                                  │
│ > SELECT_A_MESSAGE               │
│                                  │
│ ┌──────────────────────────────┐ │
│ │ [01] APOLOGIZE_01            │ │
│ │     apology message          │ │
│ └──────────────────────────────┘ │
│                                  │
│ ┌──────────────────────────────┐ │
│ │ [02] APOLOGIZE_02            │ │
│ │     another apology          │ │
│ └──────────────────────────────┘ │
│                                  │
│ ┌──────────────────────────────┐ │
│ │ [03] LOVE_U                  │ │
│ │     affection protocol       │ │
│ └──────────────────────────────┘ │
│                                  │
│ ┌──────────────────────────────┐ │
│ │ [04] MAKE_UP                 │ │
│ │     reconciliation protocol  │ │
│ └──────────────────────────────┘ │
│                                  │
└──────────────────────────────────┘
```

The exact ASCII box style is flexible.

Use CSS to create the visual effect rather than relying exclusively on literal ASCII characters when that improves responsiveness.

---

# 15. Message Screen

Every module opens the same message-screen pattern.

## 15.1 Navigation

Top-left:

```text
< BACK
```

or:

```text
[←] BACK
```

It must be large enough for comfortable mobile tapping.

## 15.2 Header

Example:

```text
MAMASOS // APOLOGIZE_01
────────────────────────
```

## 15.3 Typing animation

The message should appear as though it is being typed.

Example:

```text
> Lorem ipsum dolor sit amet,
> consectetur adipiscing elit...
```

Requirements:

- character-by-character reveal
- readable typing speed
- no excessive delay
- message must eventually become fully visible
- avoid making the user wait too long

Recommended initial typing speed:

```text
25–45 ms per character
```

The exact speed can be tuned later.

## 15.4 Back behavior

Tapping `BACK` returns to the dashboard.

The app should not reload the page.

---

# 16. TUI Visual System

The MamasOS interface should strongly resemble a terminal/TUI.

A browser-oriented CSS TUI library may be used.

**WebTUI** is a suitable candidate because it is specifically designed as a modular CSS library that brings terminal UI styling to the browser and provides components/utilities for terminal-like interfaces. citeturn0search2turn0search7

However, the implementation should not become dependent on a library feature that prevents GitHub Pages deployment.

The final site must remain a static frontend.

If a library is used, prefer:

1. static CSS
2. browser-compatible JavaScript
3. CDN-compatible assets
4. lightweight dependencies

Avoid server-side TUI frameworks.

Libraries designed for native terminal applications such as Node.js TUI frameworks or native terminal renderers are not appropriate for the browser-facing experience. citeturn0search1turn0search9

---

# 17. Typography

## Calculator

Preferred:

- Google Sans
- fallback: system sans-serif

## MamasOS

Preferred:

- JetBrains Mono
- fallback: monospace

The font transition itself is part of the visual reveal.

---

# 18. Responsive Requirements

Mobile is the primary target.

Required support:

- 360px width
- 375px width
- 390px width
- 412px width
- common Android viewport sizes
- iPhone-sized viewports

Desktop must remain usable but is secondary.

## Touch requirements

All interactive controls should have comfortable touch targets.

Avoid:

- tiny text links
- hover-only interactions
- controls that require precise mouse positioning
- desktop-only keyboard shortcuts

Keyboard support may be added as a progressive enhancement, but mobile interaction must remain complete without a keyboard.

---

# 19. Accessibility

Minimum requirements:

- sufficient text/background contrast
- semantic buttons for interactive elements
- visible focus states
- `aria-label` where visual labels are insufficient
- animations should respect `prefers-reduced-motion`
- typing animations must not prevent access to content
- touch targets should be sufficiently large

If reduced motion is enabled, transitions should become shorter and/or use simple fades.

---

# 20. Audio

Audio is optional and must never be required to understand the experience.

Potential sounds:

- calculator button tap
- calculator shutdown
- MamasOS boot
- diagnostic beep
- error fixed confirmation

A mute control should be available if audio is implemented.

Do not autoplay audio before a user interaction because mobile browsers commonly restrict autoplay with sound.

---

# 21. Technical Architecture

Recommended approach:

```text
Static HTML
    +
CSS
    +
Vanilla JavaScript
    +
Optional browser-compatible CSS/TUI library
    +
Static assets
```

No backend.

No database.

No API.

No build requirement unless a dependency genuinely benefits from a build step.

Preferred architecture:

```text
index.html

css/
  calculator.css
  mamasos.css
  animations.css
  responsive.css

js/
  app.js
  calculator.js
  date-validator.js
  boot-sequence.js
  dashboard.js
  messages.js

assets/
  audio/
  images/
  icons/
```

---

# 22. State Model

Suggested application states:

```text
CALCULATOR
DATE_PROMPT
DATE_INVALID
DATE_VALID
CALCULATOR_SHUTDOWN
MAMASOS_BOOT
ERROR_VALIDATED
ERROR_DIAGNOSTICS
FIXING_ERROR
ERROR_FIXED
LOVE_SENT
DASHBOARD
MESSAGE_VIEW
```

Use an explicit state machine or centralized application state rather than scattered boolean flags.

Example conceptual state:

```js
{
  screen: "CALCULATOR",
  calculationCount: 0,
  selectedMessage: null,
  dateValidated: false
}
```

---

# 23. Message Data Model

Messages should be stored separately from rendering logic.

Example:

```js
const messages = {
  APOLOGIZE_01: {
    title: "APOLOGIZE_01",
    subtitle: "APOLOGY_PROTOCOL",
    content: "Lorem ipsum..."
  },

  APOLOGIZE_02: {
    title: "APOLOGIZE_02",
    subtitle: "SECOND_APOLOGY_PROTOCOL",
    content: "Lorem ipsum..."
  },

  LOVE_U: {
    title: "LOVE_U",
    subtitle: "AFFECTION_PROTOCOL",
    content: "Lorem ipsum..."
  },

  MAKE_UP: {
    title: "MAKE_UP",
    subtitle: "RECONCILIATION_PROTOCOL",
    content: "Lorem ipsum..."
  }
};
```

This allows the actual romantic copy to be changed without modifying UI code.

---

# 24. Performance Requirements

The experience should load quickly on mobile.

Guidelines:

- minimize image assets
- optimize audio assets
- avoid unnecessary JavaScript frameworks
- lazy-load non-critical assets where appropriate
- avoid large animation libraries
- avoid continuous CPU-heavy animations
- keep DOM complexity reasonable

The calculator should appear quickly.

The MamasOS transition should not require a page reload.

---

# 25. GitHub Pages Requirements

The project must work as a static site.

Requirements:

- relative asset paths
- no server-side routing requirement
- no backend dependency
- no environment secrets
- no server-side rendering requirement
- no runtime API dependency for core functionality

If a package requires a build step, document the build command and ensure GitHub Pages can deploy the generated static output.

Prefer a no-build or minimal-build solution for simplicity.

---

# 26. Browser Compatibility

Target modern:

- Chrome Android
- Safari iOS
- Firefox Android
- Chromium desktop
- Safari desktop

Do not rely on experimental browser APIs for core functionality.

---

# 27. Security / Privacy

The website should not collect or transmit:

- names
- anniversary date
- messages
- device identifiers
- analytics data

The anniversary date is only used locally to trigger the experience.

No external service should receive the entered anniversary date.

---

# 28. Acceptance Criteria

## Calculator

- [ ] Calculator looks functional and modern.
- [ ] Calculator is usable on a 360px-wide viewport.
- [ ] Three completed calculations can be performed.
- [ ] Third calculation triggers anniversary popup.
- [ ] Popup uses the specified Indonesian prompt.
- [ ] Valid date variants for 9 June 2023 are accepted.
- [ ] Invalid dates do not trigger the boot sequence.
- [ ] Invalid input allows retry.

## Transition

- [ ] Correct date closes the popup.
- [ ] Calculator visually shuts down.
- [ ] Blank/black transition occurs.
- [ ] MamasOS boot begins without page reload.

## Boot

- [ ] JetBrains Mono is used.
- [ ] `SCANNING_ERROR..` is shown.
- [ ] Loading spinner animates.
- [ ] Scan lasts approximately 3 seconds.
- [ ] `ERROR_VALIDATED` appears.
- [ ] Diagnostic list appears.
- [ ] Error identifiers use uppercase and underscores.
- [ ] `AFFECTION_OVERFLOW` is used exactly.
- [ ] `FIXING_ERROR...` animates one dot per second.
- [ ] `ERROR_HAS_BEEN_FIXED` appears.
- [ ] `ALL_THE_LOVE_IS_DIRECTLY_SENT_TO_YOU` appears.
- [ ] User can continue into the dashboard.

## Dashboard

- [ ] Four modules exist.
- [ ] Module names are `APOLOGIZE_01`, `APOLOGIZE_02`, `LOVE_U`, `MAKE_UP`.
- [ ] Dashboard looks like a browser TUI.
- [ ] Every module is tappable.
- [ ] Every module opens a message screen.
- [ ] Message screen has a top-left back button.
- [ ] Message is rendered using typing animation.
- [ ] Back returns to dashboard without reload.

## Mobile

- [ ] No horizontal scrolling at normal mobile widths.
- [ ] Buttons are touch-friendly.
- [ ] Text remains readable.
- [ ] Animations do not break layout.
- [ ] Dashboard works entirely through touch.

## Deployment

- [ ] Works on GitHub Pages.
- [ ] No backend is required.
- [ ] No secret/environment variable is required.
- [ ] Assets load correctly from a GitHub Pages subpath.
