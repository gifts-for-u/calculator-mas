/**
 * dashboard.js — MamasOS TUI Dashboard & Reusable Message Screen
 */

import { CONFIG, MESSAGES } from "./messages.js";
import { sound } from "./sound.js";

export class DashboardManager {
  constructor({ dashboardEl, messageEl, onBackToDashboard }) {
    this.dashboardEl = dashboardEl;
    this.messageEl = messageEl;
    this.onBackToDashboard = onBackToDashboard;
    this.activeTypingTimeout = null;
    this.isTyping = false;
    this.fullCurrentContent = "";
    this.messageBodyEl = null;
  }

  renderDashboard() {
    this.dashboardEl.innerHTML = `
      <div class="tui-window">
        <header class="tui-window-header">
          <span class="tui-dot-group">
            <span class="tui-dot dot-red"></span>
            <span class="tui-dot dot-yellow"></span>
            <span class="tui-dot dot-green"></span>
          </span>
          <span class="tui-window-title">MAMASOS // HOME</span>
          <span class="tui-window-status">[ONLINE]</span>
        </header>

        <div class="tui-window-body">
          <div class="tui-banner">
            <pre class="tui-ascii-logo">
  __  __                         ___  ____  
 |  \\/  | __ _ _ __ ___   __ _  / _ \\/ ___| 
 | |\\/| |/ _\` | '_ \` _ \\ / _\` || | | \\___ \\ 
 | |  | | (_| | | | | | | (_| || |_| |___) |
 |_|  |_|\\__,_|_| |_| |_|\\__,_| \\___/|____/ 
            </pre>
            <div class="tui-prompt-line">
              <span class="prompt-sym">&gt;</span> SELECT_A_MESSAGE_PROTOCOL:
            </div>
          </div>

          <div class="tui-menu-grid">
            ${Object.values(MESSAGES).map((msg) => `
              <button class="tui-menu-card" data-id="${msg.id}">
                <div class="tui-card-top">
                  <span class="tui-card-index">[${msg.index}]</span>
                  <span class="tui-card-name">${msg.title}</span>
                  <span class="tui-card-badge">${msg.badge}</span>
                </div>
                <div class="tui-card-sub">// ${msg.subtitle}</div>
              </button>
            `).join("")}
          </div>

          <footer class="tui-dashboard-footer">
            <div class="tui-sys-info">&gt; ALL_DIAGNOSTICS_RESOLVED: 100%</div>
            <div class="tui-heart-sig">&lt;3 FOR MY ONE AND ONLY &lt;3</div>
          </footer>
        </div>
      </div>
    `;

    // Bind click events on menu cards
    const cards = this.dashboardEl.querySelectorAll(".tui-menu-card");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        sound.playOpClick();
        const id = card.dataset.id;
        this.openMessage(id);
      });
    });
  }

  openMessage(messageId) {
    const msg = MESSAGES[messageId];
    if (!msg) return;

    // Switch view
    this.dashboardEl.classList.add("hidden");
    this.messageEl.classList.remove("hidden");

    this.messageEl.innerHTML = `
      <div class="tui-window message-window">
        <header class="tui-window-header">
          <button class="tui-back-btn" id="btn-msg-back" aria-label="Back to Dashboard">
            <span class="back-arrow">&lt;</span> BACK
          </button>
          <span class="tui-window-title">MAMASOS // ${msg.title}</span>
          <span class="tui-window-status">[VIEW]</span>
        </header>

        <div class="tui-window-body">
          <div class="tui-msg-meta">
            <div class="tui-msg-subtitle">// ${msg.subtitle}</div>
            <div class="tui-separator">───────────────────────────────────────</div>
          </div>

          <div class="tui-msg-scroll-area" id="msg-scroll-area">
            <div class="tui-msg-content" id="msg-text-body"></div>
            <span class="tui-cursor" id="msg-cursor">_</span>
          </div>

          <footer class="tui-msg-footer">
            <span class="tui-tap-hint">&gt; TAP_CONTENT_TO_REVEAL_ALL &lt;</span>
          </footer>
        </div>
      </div>
    `;

    // Bind back button
    const backBtn = this.messageEl.querySelector("#btn-msg-back");
    backBtn.addEventListener("click", () => {
      sound.playOpClick();
      this.closeMessage();
    });

    // Start typewriter animation
    this.startTypewriter(msg.content);
  }

  startTypewriter(content) {
    this.fullCurrentContent = content;
    this.messageBodyEl = this.messageEl.querySelector("#msg-text-body");
    const scrollArea = this.messageEl.querySelector("#msg-scroll-area");
    const cursorEl = this.messageEl.querySelector("#msg-cursor");

    if (!this.messageBodyEl) return;

    this.messageBodyEl.textContent = "";
    this.isTyping = true;
    let charIndex = 0;

    // Tap to skip typing animation
    const tapHandler = () => {
      if (this.isTyping) {
        this.isTyping = false;
        clearTimeout(this.activeTypingTimeout);
        this.messageBodyEl.textContent = this.fullCurrentContent;
        if (cursorEl) cursorEl.classList.add("blinking");
        sound.playOpClick();
        if (scrollArea) scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    };

    if (scrollArea) {
      scrollArea.addEventListener("click", tapHandler);
    }

    const typeNext = () => {
      if (!this.isTyping) return;

      if (charIndex < content.length) {
        const nextChar = content[charIndex];
        this.messageBodyEl.textContent += nextChar;
        charIndex++;

        // Periodic light typewriter sound
        if (charIndex % 3 === 0 && nextChar !== " " && nextChar !== "\n") {
          sound.playTypeChirp();
        }

        // Auto scroll down smoothly
        if (scrollArea && (charIndex % 15 === 0 || nextChar === "\n")) {
          scrollArea.scrollTop = scrollArea.scrollHeight;
        }

        this.activeTypingTimeout = setTimeout(typeNext, CONFIG.TIMINGS.TYPING_SPEED);
      } else {
        this.isTyping = false;
        if (cursorEl) cursorEl.classList.add("blinking");
        if (scrollArea) scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    };

    typeNext();
  }

  closeMessage() {
    this.isTyping = false;
    clearTimeout(this.activeTypingTimeout);

    this.messageEl.classList.add("hidden");
    this.dashboardEl.classList.remove("hidden");

    if (typeof this.onBackToDashboard === "function") {
      this.onBackToDashboard();
    }
  }
}
