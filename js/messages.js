/**
 * messages.js — MamasOS Romantic Copy & Configuration
 * 
 * You can easily customize the messages, prompts, and timings here
 * without modifying any UI or state machine logic.
 */

export const CONFIG = {
  // Target anniversary date: 9 June 2023
  TARGET_DATE: {
    DAY: 9,
    MONTH: 6,
    YEAR: 2023
  },

  // Timings (in milliseconds)
  TIMINGS: {
    SHUTDOWN_DELAY: 600,       // Delay before screen turns black
    BLACK_SCREEN_HOLD: 1200,   // Duration of the "lah, kok mati?" black screen
    BOOT_SCAN_DURATION: 3000,  // Duration of SCANNING_ERROR..
    FIXING_STEP_INTERVAL: 1000,// 1 second interval per fixing dot
    LOVE_SENT_DELAY: 700,      // Delay before ALL_THE_LOVE_IS_DIRECTLY_SENT_TO_YOU
    TYPING_SPEED: 32           // Speed per character in ms (25-45ms)
  },

  // Popup Copy
  PROMPTS: {
    ANNIVERSARY_QUESTION: "eh coba masukin tanggal jadian kita deh sayang",
    INVALID_DATE: "hmm... kayaknya bukan itu deh sayang",
    PLACEHOLDER_INPUT: "contoh: 09/06/2023",
    SUBMIT_BUTTON: "OK",
    TRY_AGAIN: "Coba Lagi"
  },

  // Boot Sequence Copy
  BOOT: {
    TITLE: "MAMASOS v1.0.0 (ROMANTIC EDITION)",
    SCANNING: "SCANNING_ERROR..",
    SCAN_VALIDATED: "ERROR_VALIDATED",
    ERRORS: [
      { id: "ERR-001", code: "LOVE_OVERLOADED", desc: "I love u 3 Million" },
      { id: "ERR-002", code: "HUG_NEEDED", desc: "Kita belum peyuk." },
      { id: "ERR-003", code: "MISSING_YOU", desc: "Kangen manja-manja sama kamu." },
      { id: "ERR-004", code: "ATTENTION_REQUIRED", desc: "Aku didiemin :(." },
      { id: "ERR-005", code: "AFFECTION_OVERFLOW", desc: "Sayang aku buat kamu pokonya." }
    ],
    FIXING_LABEL: "FIXING_ERROR",
    FIXED_CONFIRMATION: "ERROR_HAS_BEEN_FIXED",
    LOVE_SENT_LINE1: "ALL_THE_LOVE_IS_DIRECTLY",
    LOVE_SENT_LINE2: "SENT_TO_YOU",
    CONTINUE_PROMPT: "> PRESS_ANYWHERE_TO_CONTINUE [TAP]"
  }
};

/**
 * Message Content for the 4 MamasOS Dashboard Modules
 * Replace these placeholder texts with your own personal apology & love letters!
 */
export const MESSAGES = {
  APOLOGIZE_01: {
    id: "APOLOGIZE_01",
    index: "01",
    title: "APOLOGIZE_01",
    subtitle: "APOLOGY_PROTOCOL",
    badge: "CRITICAL",
    content: `Sayang, pertama-tama aku mau minta maaf sama kamu...

Aku mengakui kesalahan aku semalem aku ketiduran yang padahal aku masih perlu upload video nya tapi malah ketiduran dan ga nemenin kamu aku minta maaff..

Minta maaff yaa aku kalahnya sama ngantuk mulu.. tapi kalo bukan ngantuk ma aku bakal lawan buat kamu ❤️`
  },

  APOLOGIZE_02: {
    id: "APOLOGIZE_02",
    index: "02",
    title: "APOLOGIZE_02",
    subtitle: "SECOND_APOLOGY_PROTOCOL",
    badge: "PATCH_V2",
    content: `Minta maaff yaa jadinya dari semalem kamu bete dan marah sama aku..

minta maaf aku memperburuk keadaann, bukan berarti gabisa melakukan apa yang kamu minta cuma emang lagi ngantuk banget..

Padahal semalem juga udah sembari main tapi emang ga kuat.. Maafin mamas ya sayang... 🥺`
  },

  LOVE_U: {
    id: "LOVE_U",
    index: "03",
    title: "LOVE_U",
    subtitle: "AFFECTION_PROTOCOL",
    badge: "HEARTBEAT",
    content: `Aku sayang kamuuu

Minta maaf yaa kalo aku sering bikin kamu cape atau bete sama aku.. aku bakal tetep berusaha buat nge treat kamu dengan baikk

I love you sayangg akuuu✨💖`
  },

  MAKE_UP: {
    id: "MAKE_UP",
    index: "04",
    title: "MAKE_UP",
    subtitle: "RECONCILIATION_PROTOCOL",
    badge: "RESOLVED",
    content: `Yuk kita baikan ya sayangg? Jangan ngambek lagi yaa... 

Senyum lagi ya? kan cantik banget kalo lagi senyumm.

Dari pacal kamu,
Your one and only Mamas-mu yang paling sayang kamu. 🌹✨`
  }
};
