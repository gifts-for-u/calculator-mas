/**
 * calculator.js — Modern Mobile Calculator Logic
 * Accurately tracks completed calculations via '=' and handles
 * direct on-calculator anniversary date input.
 */

import { sound } from "./sound.js";
import { validateAnniversaryDate } from "./date-validator.js";

export class Calculator {
  constructor({ onThirdCalculation, onAnniversarySuccess, onAnniversaryFailed }) {
    this.onThirdCalculation = onThirdCalculation;
    this.onAnniversarySuccess = onAnniversarySuccess;
    this.onAnniversaryFailed = onAnniversaryFailed;

    this.currentValue = "0";
    this.previousValue = null;
    this.operation = null;
    this.resetNext = false;
    this.completedCalculations = 0;
    this.expressionString = "";

    // Anniversary state
    this.isWaitingAnniversaryDate = false;
    this.hasPressedLeadingZero = false;

    // DOM references
    this.displayEl = document.getElementById("calc-current");
    this.exprEl = document.getElementById("calc-expression");
  }

  init() {
    this.bindButtons();
    this.updateDisplay();
  }

  startAnniversaryMode() {
    this.isWaitingAnniversaryDate = true;
    this.currentValue = "0";
    this.previousValue = null;
    this.operation = null;
    this.resetNext = true;
    this.hasPressedLeadingZero = false;
    this.expressionString = "Tanggal jadian kita? ♥";
    if (this.exprEl) {
      this.exprEl.classList.add("anniversary-active");
    }
    this.updateDisplay();
  }

  resetAnniversaryInput() {
    this.currentValue = "0";
    this.resetNext = true;
    this.hasPressedLeadingZero = false;
    this.expressionString = "Tanggal jadian kita? ♥";
    this.updateDisplay();
  }

  bindButtons() {
    const keypad = document.getElementById("calc-keypad");
    if (!keypad) return;

    keypad.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      const action = btn.dataset.action;
      const value = btn.dataset.value;

      // Provide audio feedback
      if (action === "number") {
        sound.playCalcClick();
        this.inputDigit(value);
      } else if (action === "operator") {
        sound.playOpClick();
        this.setOperation(value);
      } else if (action === "equals") {
        sound.playEqualsClick();
        this.calculate();
      } else if (action === "clear") {
        sound.playOpClick();
        this.clear();
      } else if (action === "sign") {
        sound.playOpClick();
        this.toggleSign();
      } else if (action === "percent") {
        sound.playOpClick();
        this.percentage();
      } else if (action === "decimal") {
        sound.playCalcClick();
        this.inputDecimal();
      }

      this.updateDisplay();
    });
  }

  inputDigit(digit) {
    if (this.isWaitingAnniversaryDate) {
      if (this.resetNext) {
        if (digit === "0") {
          this.currentValue = "0";
          this.hasPressedLeadingZero = true;
        } else {
          this.currentValue = this.hasPressedLeadingZero ? "0" + digit : digit;
          this.hasPressedLeadingZero = false;
        }
        this.resetNext = false;
        return;
      }

      if (this.currentValue === "0") {
        if (digit === "0") {
          this.hasPressedLeadingZero = true;
          this.currentValue = "0";
        } else {
          this.currentValue = this.hasPressedLeadingZero ? "0" + digit : digit;
          this.hasPressedLeadingZero = false;
        }
      } else if (this.currentValue.length < 14) {
        this.currentValue += digit;
      }
      return;
    }

    // Normal calculation mode
    if (this.resetNext) {
      this.currentValue = digit;
      this.resetNext = false;
    } else {
      if (this.currentValue === "0") {
        this.currentValue = digit;
      } else if (this.currentValue.length < 12) {
        this.currentValue += digit;
      }
    }
  }

  inputDecimal() {
    if (this.isWaitingAnniversaryDate) {
      if (this.resetNext) {
        this.currentValue = "0.";
        this.resetNext = false;
        return;
      }
      if (this.currentValue.length < 14) {
        this.currentValue += ".";
      }
      return;
    }

    // Normal calculation mode
    if (this.resetNext) {
      this.currentValue = "0.";
      this.resetNext = false;
      return;
    }
    if (!this.currentValue.includes(".")) {
      this.currentValue += ".";
    }
  }

  toggleSign() {
    if (this.isWaitingAnniversaryDate) return;
    if (this.currentValue === "0" || this.currentValue === "Error") return;
    if (this.currentValue.startsWith("-")) {
      this.currentValue = this.currentValue.substring(1);
    } else {
      this.currentValue = "-" + this.currentValue;
    }
  }

  percentage() {
    if (this.isWaitingAnniversaryDate) return;
    const num = parseFloat(this.currentValue);
    if (!isNaN(num)) {
      this.currentValue = String(num / 100);
      this.resetNext = true;
    }
  }

  setOperation(op) {
    if (this.isWaitingAnniversaryDate) {
      // Allow using '-' or '/' as separator in date
      if (op === "subtract" && this.currentValue.length < 14) {
        if (this.resetNext) {
          this.currentValue = "-";
          this.resetNext = false;
        } else {
          this.currentValue += "-";
        }
        return;
      }
      if (op === "divide" && this.currentValue.length < 14) {
        if (this.resetNext) {
          this.currentValue = "/";
          this.resetNext = false;
        } else {
          this.currentValue += "/";
        }
        return;
      }
      return;
    }

    // Normal calculation mode
    if (this.operation && !this.resetNext) {
      this.calculate(false); // chaining without counting as final =
    }
    this.previousValue = this.currentValue;
    this.operation = op;
    this.resetNext = true;
    this.expressionString = `${this.formatDisplayNumber(this.previousValue)} ${this.getOpSymbol(op)}`;
  }

  getOpSymbol(op) {
    switch (op) {
      case "add": return "+";
      case "subtract": return "−";
      case "multiply": return "×";
      case "divide": return "÷";
      default: return "";
    }
  }

  calculate(isExplicitEquals = true) {
    // If waiting for anniversary date, validate input on '='
    if (this.isWaitingAnniversaryDate) {
      const isValid = validateAnniversaryDate(this.currentValue);
      if (isValid) {
        if (typeof this.onAnniversarySuccess === "function") {
          this.onAnniversarySuccess();
        }
      } else {
        if (typeof this.onAnniversaryFailed === "function") {
          this.onAnniversaryFailed(this.currentValue);
        }
      }
      return;
    }

    // Normal calculation mode
    if (!this.operation || this.previousValue === null) {
      return;
    }

    const prev = parseFloat(this.previousValue);
    const current = parseFloat(this.currentValue);
    let result = 0;

    switch (this.operation) {
      case "add":
        result = prev + current;
        break;
      case "subtract":
        result = prev - current;
        break;
      case "multiply":
        result = prev * current;
        break;
      case "divide":
        if (current === 0) {
          this.currentValue = "Error";
          this.expressionString = "Cannot divide by 0";
          this.operation = null;
          this.previousValue = null;
          this.resetNext = true;
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }

    // Round clean floats
    result = Math.round(result * 1e8) / 1e8;

    this.expressionString = `${this.formatDisplayNumber(String(prev))} ${this.getOpSymbol(this.operation)} ${this.formatDisplayNumber(String(current))} =`;
    this.currentValue = String(result);
    this.operation = null;
    this.previousValue = null;
    this.resetNext = true;

    // Track completed calculation if triggered explicitly by '='
    if (isExplicitEquals) {
      this.completedCalculations++;
      console.log(`[Calculator] Calculation completed: #${this.completedCalculations}`);

      if (this.completedCalculations === 3) {
        if (typeof this.onThirdCalculation === "function") {
          this.onThirdCalculation();
        }
      }
    }
  }

  clear() {
    this.currentValue = "0";
    this.previousValue = null;
    this.operation = null;
    this.resetNext = false;
    this.hasPressedLeadingZero = false;

    if (!this.isWaitingAnniversaryDate) {
      this.expressionString = "";
    } else {
      this.expressionString = "Tanggal jadian kita? ♥";
    }
  }

  formatDisplayNumber(valStr) {
    if (valStr === "Error" || !valStr) return valStr;
    if (this.isWaitingAnniversaryDate) {
      // In date mode, display verbatim without thousands commas
      return valStr;
    }
    const parts = valStr.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1];

    const formattedInt = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimalPart !== undefined ? `${formattedInt}.${decimalPart}` : formattedInt;
  }

  updateDisplay() {
    if (this.displayEl) {
      this.displayEl.textContent = this.formatDisplayNumber(this.currentValue);
    }
    if (this.exprEl) {
      this.exprEl.textContent = this.expressionString || "";
    }
  }
}
