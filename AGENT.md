# AGENT.md — MamasOS Calculator Love Experience

## 1. Project Mission

You are working on **MamasOS Calculator Love Experience**, a static, mobile-first romantic web experience.

The experience starts as a modern calculator and secretly transitions into a terminal-style interface called MamasOS after the recipient enters the correct relationship anniversary date.

The project is intended to be deployed on **GitHub Pages** and opened primarily from a **mobile phone**.

The implementation must prioritize:

1. reliable mobile interaction
2. polished transitions
3. TUI authenticity
4. maintainable code
5. static hosting compatibility
6. easy replacement of romantic copy

Do not turn the project into a generic landing page.

---

# 2. Core Product Flow

Never break this sequence:

```text
CALCULATOR
    ↓
THIRD CALCULATION
    ↓
ANNIVERSARY DATE PROMPT
    ↓
DATE VALIDATION
    ↓
CALCULATOR SHUTDOWN
    ↓
BLACK / BLANK TRANSITION
    ↓
MAMASOS BOOT
    ↓
ERROR_VALIDATED
    ↓
ERROR DIAGNOSTICS
    ↓
FIXING_ERROR...
    ↓
ERROR_HAS_BEEN_FIXED
    ↓
ALL_THE_LOVE_IS_DIRECTLY_SENT_TO_YOU
    ↓
MAMASOS DASHBOARD
    ↓
MESSAGE SCREEN
```

The sequence is part of the product's emotional reveal. Do not shortcut it unless explicitly requested.

---

# 3. Design Principles

## 3.1 Mobile first

Design for mobile before desktop.

Primary widths:

```text
360px
375px
390px
412px
```

The site must be fully usable with touch.

Do not make desktop hover states or keyboard interactions mandatory.

---

## 3.2 Calculator and MamasOS must look different

### Calculator

Use a modern UI.

Preferred:

- Google Sans
- clean surfaces
- rounded controls
- modern spacing
- subtle cute decorations
- friendly appearance

Do not expose obvious MamasOS/TUI clues during the calculator phase.

### MamasOS

Use:

- JetBrains Mono
- terminal-style layout
- dark background
- monospace typography
- borders
- command/status formatting
- blinking cursor
- restrained animation
- TUI-style spacing

The font and visual system should noticeably change during the reveal.

---

# 4. TUI Implementation

A browser-oriented TUI CSS library may be used.

**Preferred candidate: WebTUI.**

WebTUI is a modular CSS library specifically intended to bring terminal UI styling to browser interfaces. citeturn0search2turn0search7

Before adding a dependency:

- verify it works in a static browser environment
- verify it does not require a server runtime
- verify it does not introduce unnecessary bundle size
- verify GitHub Pages compatibility
- use only the components actually needed

Do not use Node-native terminal UI frameworks as the browser UI engine.

Libraries such as `@oxog/tui` are designed for Node.js terminal applications, while OpenTUI targets native terminal environments. They are not the default choice for this browser project. citeturn0search1turn0search9

If WebTUI is not practical for a specific component, implement the component with normal HTML/CSS rather than forcing the library.

---

# 5. Architecture Rules

Prefer:

```text
HTML
CSS
Vanilla JavaScript
```

Use a framework only if there is a concrete reason.

Avoid unnecessary React/Vue/Svelte/etc. for this project.

The experience is fundamentally a static state-driven interface and does not need a large application framework.

Recommended structure:

```text
/
├── index.html
├── css/
│   ├── calculator.css
│   ├── mamasos.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── calculator.js
│   ├── date-validator.js
│   ├── boot-sequence.js
│   ├── dashboard.js
│   └── messages.js
├── assets/
│   ├── audio/
│   ├── images/
│   └── icons/
└── README.md
```

Adjust the structure if the actual implementation benefits from fewer files, but keep responsibilities separated.

---

# 6. State Management

Use explicit application state.

Preferred conceptual states:

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

Avoid scattered flags such as:

```js
isBooting
isError
isDashboard
isMessage
isCalculator
```

when a single explicit state can represent the current screen.

Prefer one source of truth.

---

# 7. Calculator Rules

The calculator must behave like a real basic calculator for normal use.

Minimum operations:

- addition
- subtraction
- multiplication
- division
- decimal numbers
- clear
- sign toggle if implemented
- percentage if implemented

The calculator must count completed calculations through the `=` action.

Only the third completed calculation should trigger the anniversary prompt.

Do not trigger the prompt after:

- button taps
- partial expressions
- invalid operations
- page load

---

# 8. Anniversary Date Validation

Target date:

```text
9 June 2023
```

Accept reasonable formats including:

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

Normalize input before comparison.

Do not compare only against:

```js
input === "09062023"
```

The validation must be tolerant of separators and leading-zero differences.

Do not send the date to a server.

Do not store the date in localStorage unless there is a future product requirement.

---

# 9. Required Popup Copy

Use this exact initial prompt:

```text
eh coba masukin tanggal jadian kita deh sayang
```

For invalid input, a suitable placeholder message is:

```text
hmm... kayaknya bukan itu deh sayang
```

Keep the implementation copy in a centralized configuration/message object so the user can change it easily later.

---

# 10. Boot Sequence Rules

MamasOS uses **JetBrains Mono**.

Initial diagnostic:

```text
SCANNING_ERROR..
```

Include a loading/spinner animation.

Approximate scan duration:

```text
3 seconds
```

Then:

```text
ERROR_VALIDATED
```

The exact transition timings may be tuned visually, but the sequence must remain understandable.

Avoid excessive glitch effects.

The goal is polished terminal behavior, not a stereotypical "hacker website".

---

# 11. Required Error List

Use full uppercase identifiers with underscores.

Required:

```text
LOVE_OVERLOADED
HUG_NEEDED
MISSING_YOU
ATTENTION_REQUIRED
AFFECTION_OVERFLOW
```

`AFFECTION_OVERFLOW` must remain exactly this name.

Do not rename it to:

```text
AFFECTION_BUFFER_FULL
```

Possible presentation:

```text
[ERR-001] LOVE_OVERLOADED
[ERR-002] HUG_NEEDED
[ERR-003] MISSING_YOU
[ERR-004] ATTENTION_REQUIRED
[ERR-005] AFFECTION_OVERFLOW
```

Technical-looking naming is intentional, but the words must remain understandable to a non-technical recipient.

---

# 12. Fixing Animation

After the error list, leave approximately two blank lines.

Display:

```text
FIXING_ERROR.
```

Update once every second:

```text
FIXING_ERROR.
FIXING_ERROR..
FIXING_ERROR...
```

Do not use a fast 100ms animation for these dots.

The one-second timing is part of the joke/reveal.

After completion:

```text
ERROR_HAS_BEEN_FIXED
```

Then:

```text
ALL_THE_LOVE_IS_DIRECTLY_SENT_TO_YOU
```

If the long line becomes unreadable on mobile, wrap visually without changing its meaning.

---

# 13. Dashboard Rules

Dashboard modules:

```text
APOLOGIZE_01
APOLOGIZE_02
LOVE_U
MAKE_UP
```

Do not change these names without explicit instruction.

`MAKE_UP` represents the reconciliation/bujuk section.

The dashboard should look like a TUI menu, not four generic Bootstrap cards.

Use:

- terminal borders
- indexed menu items
- status/subtitle lines
- monospaced typography
- focus/active states
- touch-friendly hit areas

---

# 14. Message Screen Rules

Every module must use the same reusable message-screen component.

Required layout:

```text
< BACK

MAMASOS // MODULE_NAME
──────────────────────

> message text...
```

The back control must be at the top-left.

It must work on mobile with a comfortable touch target.

Do not reload the page to navigate between dashboard and message screens.

---

# 15. Typing Animation

Messages appear character-by-character.

Recommended speed:

```text
25–45ms / character
```

Make the speed configurable.

Example:

```js
const TYPING_SPEED = 35;
```

Do not permanently lock the user out while typing.

Recommended behavior:

- begin typing automatically
- allow the user to continue waiting
- optionally allow a tap to instantly reveal the full message
- always provide the back control

The final implementation must not create an accessibility or usability trap.

---

# 16. Message Content

Initial content must be placeholder text.

Do not invent the final personal apology.

Use:

```text
Lorem ipsum dolor sit amet...
```

or equivalent neutral placeholder content.

Store content separately from rendering code.

Example:

```js
const messages = {
  APOLOGIZE_01: "...",
  APOLOGIZE_02: "...",
  LOVE_U: "...",
  MAKE_UP: "..."
};
```

The user should be able to replace the text without modifying component logic.

---

# 17. Responsive Rules

Do not allow:

- horizontal overflow
- tiny buttons
- text clipping
- fixed desktop-width panels on mobile
- hover-only controls

Use:

```css
max-width
width: 100%
clamp()
min()
max()
```

where appropriate.

Use responsive CSS rather than hardcoded viewport assumptions.

---

# 18. Animation Rules

Animations should support the story.

Good:

- fade
- terminal typing
- spinner
- blinking cursor
- subtle slide
- screen transition

Avoid:

- constant shaking
- excessive glitching
- heavy particle effects
- long loading screens
- animation that blocks interaction

Always consider:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 19. Audio Rules

Audio is optional.

If implemented:

- do not autoplay audible audio before user interaction
- provide mute/unmute
- keep sound effects short
- do not make audio necessary for understanding

Core functionality must work with audio disabled.

---

# 20. GitHub Pages Rules

The final output must be deployable as a static website.

Do not require:

- backend server
- Node runtime in production
- database
- server-side routing
- environment secrets
- private API keys

Use relative asset paths.

Be careful with GitHub Pages repository subpaths.

Do not assume the site is hosted at `/`.

Test asset references against a repository deployment path.

---

# 21. Dependency Rules

Before adding a library:

1. Determine whether it is actually needed.
2. Prefer small browser-compatible dependencies.
3. Prefer static CSS/CDN-compatible dependencies for this project.
4. Check licensing.
5. Check whether the dependency works without a server runtime.
6. Avoid dependencies that dramatically increase bundle size.
7. Document why the dependency exists.

Do not add a dependency simply because it can create a visual effect.

---

# 22. External Fonts

Use:

- Google Sans or an appropriate Google Fonts alternative for the calculator.
- JetBrains Mono for MamasOS.

Provide sensible fallback fonts.

If external font loading fails, the site must remain usable.

---

# 23. Code Quality

Prefer:

- semantic HTML
- small reusable functions
- centralized configuration
- clear state transitions
- descriptive names
- minimal global state
- event delegation where useful
- CSS variables for theme values

Avoid:

- duplicated event handlers
- deeply nested callbacks
- magic timing numbers scattered throughout the code
- inline styles for everything
- unnecessary abstractions

Centralize animation durations where practical.

Example:

```js
const TIMINGS = {
  BOOT_SCAN: 3000,
  FIXING_STEP: 1000,
  SCREEN_TRANSITION: 700
};
```

---

# 24. Testing Requirements

Before considering the implementation complete, verify:

## Calculator

- normal calculations work
- calculation counter increments correctly
- third `=` triggers the date prompt
- invalid date does not advance
- valid date variants all advance

## Transition

- calculator disappears cleanly
- black/blank state appears
- boot sequence starts without reload

## Boot

- spinner works
- scan lasts approximately 3 seconds
- error list renders correctly
- all five required error names are present
- fixing dots advance every second
- final messages render correctly

## Dashboard

- all four modules exist
- all four modules open
- back button works
- typing animation works
- messages can be replaced from the message data source

## Mobile

Test at minimum:

```text
360x800
375x812
390x844
412x915
```

Check:

- no horizontal scroll
- no clipped text
- no unreachable controls
- no accidental double-tap issues
- comfortable touch targets

---

# 25. Verification Workflow

When making changes:

1. Identify the affected state.
2. Modify the smallest relevant module.
3. Test the state transition.
4. Test mobile layout.
5. Check console for errors.
6. Verify no broken asset paths.
7. Verify GitHub Pages compatibility.
8. Avoid unrelated refactors.

Do not rewrite the whole project to solve a localized issue.

---

# 26. Content Editing Rule

Personal copy will change frequently.

Therefore:

- keep message content separate
- keep UI components reusable
- do not hardcode the final apology into HTML templates
- do not mix personal copy with animation logic
- make all module text easy to locate

The user should be able to edit the four messages without understanding the application's internal state machine.

---

# 27. Definition of Done

The feature is complete only when:

- calculator feels like a real modern calculator
- third calculation triggers the intended reveal
- anniversary input accepts reasonable date formats for 9 June 2023
- calculator shutdown feels intentional
- MamasOS boot feels like a TUI
- diagnostic errors use uppercase underscore naming
- `AFFECTION_OVERFLOW` is present
- fixing animation uses one-second dot progression
- final love message appears
- dashboard contains all four modules
- message pages share one reusable pattern
- typing animation works
- back navigation works
- mobile layout is polished
- GitHub Pages deployment works
- no backend is required
- no core functionality depends on external APIs

---

# 28. Important Product Constraint

Do not optimize the experience for technical impressiveness at the expense of emotional pacing.

The technical TUI aesthetic exists to make the romantic reveal more surprising.

The final result should feel like:

```text
"Ini awalnya cuma kalkulator..."
              ↓
"kok error?"
              ↓
"lah MamasOS?"
              ↓
"anjir..."
              ↓
"oh..."
              ↓
"dia bikin ini buat gue."
```

The surprise and pacing are more important than adding unnecessary technical features.
