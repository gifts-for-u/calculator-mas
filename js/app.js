/**
 * app.js — Main Application Orchestrator & State Machine
 * MamasOS Calculator Love Experience
 */

import { CONFIG } from "./messages.js";
import { sound } from "./sound.js";
import { Calculator } from "./calculator.js";
import { BootSequence } from "./boot-sequence.js";
import { DashboardManager } from "./dashboard.js";

export const STATES = {
  CALCULATOR: "CALCULATOR",
  DATE_PROMPT: "DATE_PROMPT",
  DATE_INPUT_CALC: "DATE_INPUT_CALC",
  DATE_INVALID: "DATE_INVALID",
  DATE_VALID: "DATE_VALID",
  CALCULATOR_SHUTDOWN: "CALCULATOR_SHUTDOWN",
  BLANK_TRANSITION: "BLANK_TRANSITION",
  MAMASOS_BOOT: "MAMASOS_BOOT",
  DASHBOARD: "DASHBOARD",
  MESSAGE_VIEW: "MESSAGE_VIEW"
};

class App {
  constructor() {
    this.currentState = STATES.CALCULATOR;

    // Screens / Containers
    this.calcScreen = document.getElementById("screen-calculator");
    this.modalOverlay = document.getElementById("modal-anniversary");
    this.modalQuestionEl = document.getElementById("modal-question-text");
    this.dateSubmitBtn = document.getElementById("anniversary-submit");
    this.blankScreen = document.getElementById("screen-blank");
    this.bootScreen = document.getElementById("screen-boot");
    this.bootLogs = document.getElementById("boot-logs");
    this.dashboardScreen = document.getElementById("screen-dashboard");
    this.messageScreen = document.getElementById("screen-message");
    this.audioToggleBtn = document.getElementById("audio-toggle");

    // Sub-systems
    this.calculator = null;
    this.dashboardManager = null;
  }

  init() {
    console.log("[MamasOS] Initializing application...");
    this.setupAudioToggle();
    this.setupCalculator();
    this.setupAnniversaryModal();
    this.setupDashboard();
    this.setState(STATES.CALCULATOR);
  }

  setupAudioToggle() {
    if (!this.audioToggleBtn) return;
    this.audioToggleBtn.addEventListener("click", () => {
      const isMuted = sound.toggleMute();
      this.audioToggleBtn.textContent = isMuted ? "SOUND: OFF" : "SOUND: ON";
      this.audioToggleBtn.classList.toggle("muted", isMuted);
    });
  }

  setupCalculator() {
    this.calculator = new Calculator({
      onThirdCalculation: () => {
        this.triggerAnniversaryPrompt();
      },
      onAnniversarySuccess: () => {
        this.onDateValid();
      },
      onAnniversaryFailed: (enteredVal) => {
        this.onDateInvalid(enteredVal);
      }
    });
    this.calculator.init();
  }

  setupAnniversaryModal() {
    if (!this.dateSubmitBtn) return;

    this.dateSubmitBtn.addEventListener("click", () => {
      sound.playOpClick();
      this.modalOverlay.classList.add("hidden");

      if (this.currentState === STATES.DATE_INVALID) {
        // Reset calculator for retry
        this.calculator.resetAnniversaryInput();
      } else {
        // Switch calculator to direct anniversary input mode
        this.calculator.startAnniversaryMode();
      }
      this.setState(STATES.DATE_INPUT_CALC);
    });
  }

  setupDashboard() {
    this.dashboardManager = new DashboardManager({
      dashboardEl: this.dashboardScreen,
      messageEl: this.messageScreen,
      onBackToDashboard: () => {
        this.setState(STATES.DASHBOARD);
      }
    });
  }

  triggerAnniversaryPrompt() {
    this.setState(STATES.DATE_PROMPT);
    sound.playPromptChime();

    if (this.modalQuestionEl) {
      this.modalQuestionEl.textContent = CONFIG.PROMPTS.ANNIVERSARY_QUESTION;
    }
    if (this.dateSubmitBtn) {
      this.dateSubmitBtn.textContent = CONFIG.PROMPTS.SUBMIT_BUTTON;
    }

    this.modalOverlay.classList.remove("hidden");
  }

  onDateInvalid(enteredVal) {
    this.setState(STATES.DATE_INVALID);
    sound.playInvalidBeep();

    if (this.modalQuestionEl) {
      this.modalQuestionEl.textContent = CONFIG.PROMPTS.INVALID_DATE;
    }
    if (this.dateSubmitBtn) {
      this.dateSubmitBtn.textContent = CONFIG.PROMPTS.TRY_AGAIN;
    }

    this.modalOverlay.classList.remove("hidden");

    // Shake animation
    const modalBox = this.modalOverlay.querySelector(".modal-box");
    if (modalBox) {
      modalBox.classList.remove("shake-animation");
      void modalBox.offsetWidth; // trigger reflow
      modalBox.classList.add("shake-animation");
    }
  }

  onDateValid() {
    this.setState(STATES.DATE_VALID);
    sound.playEqualsClick();

    // Expression line shows validation success
    if (this.calculator && this.calculator.exprEl) {
      this.calculator.exprEl.textContent = "VALIDATING_SECRET_KEY: SUCCESS...";
    }

    setTimeout(() => {
      this.shutdownCalculator();
    }, 450);
  }

  shutdownCalculator() {
    this.setState(STATES.CALCULATOR_SHUTDOWN);
    sound.playShutdown();

    // CRT glitch and shutdown animation
    this.calcScreen.classList.add("calc-powering-off");

    setTimeout(() => {
      this.calcScreen.classList.add("hidden");
      this.calcScreen.classList.remove("calc-powering-off");

      // Enter pure blank transition ("lah kok mati?")
      this.enterBlankTransition();
    }, CONFIG.TIMINGS.SHUTDOWN_DELAY);
  }

  enterBlankTransition() {
    this.setState(STATES.BLANK_TRANSITION);
    this.blankScreen.classList.remove("hidden");

    setTimeout(() => {
      this.blankScreen.classList.add("hidden");
      this.bootMamasOS();
    }, CONFIG.TIMINGS.BLACK_SCREEN_HOLD);
  }

  bootMamasOS() {
    this.setState(STATES.MAMASOS_BOOT);
    this.bootScreen.classList.remove("hidden");

    const bootSequence = new BootSequence({
      containerEl: this.bootLogs,
      onComplete: () => {
        this.openDashboard();
      }
    });

    bootSequence.start();
  }

  openDashboard() {
    this.setState(STATES.DASHBOARD);
    this.bootScreen.classList.add("hidden");
    this.dashboardScreen.classList.remove("hidden");
    this.dashboardManager.renderDashboard();
  }

  setState(newState) {
    this.currentState = newState;
    document.body.dataset.appState = newState;
    console.log(`[MamasOS State] => ${newState}`);
  }
}

// Bootstrap on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init();
  window.__MAMAS_APP__ = app;
});
