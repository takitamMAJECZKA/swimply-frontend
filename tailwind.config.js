/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
      extend: {
        keyframes: {
            "accordion-down": {
              from: { height: "0" },
              to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
              from: { height: "var(--radix-accordion-content-height)" },
              to: { height: "0" },
            },
          },
            animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
        },
        keyframes: {
          "caret-blink": {
            "0%,70%,100%": { opacity: "1" },
            "20%,50%": { opacity: "0" },
          },
        },
        animation: {
          "caret-blink": "caret-blink 1.25s ease-out infinite",
        },
      },
    },
  }
  