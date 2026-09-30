/**
 * boot-sequence.js — MamasOS TUI Boot & Error Diagnostic Engine
 * Strictly follows timing and presentation rules from AGENT.md & PRD.md.
 */

import { CONFIG } from "./messages.js";
import { sound } from "./sound.js";

export class BootSequence {
  constructor({ containerEl, onComplete }) {
    this.containerEl = containerEl;
    this.onComplete = onComplete;
    this.isInterrupted = false;
  }

  async start() {
    this.containerEl.innerHTML = "";
    sound.playBoot();

    // 1. Initial Scanning Header with animated spinner
    const scanContainer = document.createElement("div");
    scanContainer.className = "tui-scan-header";
    scanContainer.innerHTML = `
      <div class="tui-system-tag">${CONFIG.BOOT.TITLE}</div>
      <div class="tui-scan-status">
        <span class="tui-scan-text">${CONFIG.BOOT.SCANNING}</span>
        <span class="tui-spinner" id="boot-spinner">|</span>
      </div>
    `;
    this.containerEl.appendChild(scanContainer);

    // Spinner animation for ~3 seconds
    const spinnerFrames = ["|", "/", "-", "\\"];
    let frameIdx = 0;
    const spinnerEl = scanContainer.querySelector("#boot-spinner");

    const spinnerInterval = setInterval(() => {
      frameIdx = (frameIdx + 1) % spinnerFrames.length;
      if (spinnerEl) spinnerEl.textContent = spinnerFrames[frameIdx];
    }, 120);

    await this.wait(CONFIG.TIMINGS.BOOT_SCAN_DURATION);
    clearInterval(spinnerInterval);

    // 2. ERROR_VALIDATED
    sound.playDiagnosticBeep();
    const validatedEl = document.createElement("div");
    validatedEl.className = "tui-validated-badge";
    validatedEl.innerHTML = `<span>[STATUS]</span> <strong class="text-danger">${CONFIG.BOOT.SCAN_VALIDATED}</strong>`;
    this.containerEl.appendChild(validatedEl);

    await this.wait(500);

    // 3. Render Diagnostics Error List
    const errorListEl = document.createElement("div");
    errorListEl.className = "tui-error-list";
    this.containerEl.appendChild(errorListEl);

    for (const err of CONFIG.BOOT.ERRORS) {
      await this.wait(220);
      sound.playDiagnosticBeep();
      const itemEl = document.createElement("div");
      itemEl.className = "tui-error-item";
      itemEl.innerHTML = `
        <span class="tui-err-code">[${err.id}]</span>
        <span class="tui-err-name">${err.code}</span>
        <span class="tui-err-desc">// ${err.desc}</span>
      `;
      errorListEl.appendChild(itemEl);
      this.scrollToBottom();
    }

    // 4. Two blank lines
    const blankGap = document.createElement("div");
    blankGap.className = "tui-blank-gap";
    this.containerEl.appendChild(blankGap);

    await this.wait(600);

    // 5. FIXING_ERROR animation (updated once every second)
    const fixingEl = document.createElement("div");
    fixingEl.className = "tui-fixing-line";
    fixingEl.innerHTML = `<span class="tui-fixing-prefix">&gt;</span> <span class="tui-fixing-content">${CONFIG.BOOT.FIXING_LABEL}.</span>`;
    this.containerEl.appendChild(fixingEl);
    this.scrollToBottom();

    const fixingContent = fixingEl.querySelector(".tui-fixing-content");

    // Dot 1 (already showing 1 dot)
    sound.playFixStep();
    await this.wait(CONFIG.TIMINGS.FIXING_STEP_INTERVAL);

    // Dot 2 (2 dots after 1 second)
    sound.playFixStep();
    if (fixingContent) fixingContent.textContent = `${CONFIG.BOOT.FIXING_LABEL}..`;
    await this.wait(CONFIG.TIMINGS.FIXING_STEP_INTERVAL);

    // Dot 3 (3 dots after 1 second)
    sound.playFixStep();
    if (fixingContent) fixingContent.textContent = `${CONFIG.BOOT.FIXING_LABEL}...`;
    await this.wait(CONFIG.TIMINGS.FIXING_STEP_INTERVAL);

    // 6. ERROR_HAS_BEEN_FIXED
    sound.playSuccessChime();
    const fixedBadge = document.createElement("div");
    fixedBadge.className = "tui-fixed-badge";
    fixedBadge.innerHTML = `<span class="text-success">&gt;&gt; ${CONFIG.BOOT.FIXED_CONFIRMATION} &lt;&lt;</span>`;
    this.containerEl.appendChild(fixedBadge);
    this.scrollToBottom();

    await this.wait(CONFIG.TIMINGS.LOVE_SENT_DELAY);

    // 7. ALL_THE_LOVE_IS_DIRECTLY_SENT_TO_YOU (clean mobile wrap)
    const loveSentEl = document.createElement("div");
    loveSentEl.className = "tui-love-sent";
    loveSentEl.innerHTML = `
      <div class="tui-love-title">${CONFIG.BOOT.LOVE_SENT_LINE1}</div>
      <div class="tui-love-sub">${CONFIG.BOOT.LOVE_SENT_LINE2}</div>
    `;
    this.containerEl.appendChild(loveSentEl);
    this.scrollToBottom();

    await this.wait(600);

    // 8. PRESS_ANYWHERE_TO_CONTINUE
    const continueEl = document.createElement("div");
    continueEl.className = "tui-continue-prompt";
    continueEl.innerHTML = `<button class="tui-tap-anywhere" id="btn-continue-dashboard">${CONFIG.BOOT.CONTINUE_PROMPT}</button>`;
    this.containerEl.appendChild(continueEl);
    this.scrollToBottom();

    // Tap anywhere listener to advance to dashboard
    const handleContinue = (e) => {
      e?.preventDefault();
      document.removeEventListener("click", handleContinue);
      document.removeEventListener("touchend", handleContinue);
      sound.playOpClick();
      if (typeof this.onComplete === "function") {
        this.onComplete();
      }
    };

    // Attach to both the button and document
    setTimeout(() => {
      document.addEventListener("click", handleContinue, { once: true });
      document.addEventListener("touchend", handleContinue, { once: true });
    }, 200);
  }

  scrollToBottom() {
    if (this.containerEl) {
      this.containerEl.scrollTop = this.containerEl.scrollHeight;
    }
  }

  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
