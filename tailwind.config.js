/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  safelist: ['active'],
  theme: {
    extend: {
      colors: {
        dkViolet: 'hsl(268, 75%, 9%)',
        ltViolet: 'hsl(268, 47%, 21%)',
        ltViolet2: 'hsl(281, 89%, 26%)',
        vbViolet: 'hsl(285, 91%, 52%)',
        vbViolet2: 'hsl(290, 70%, 36%)',
        vbYellow: 'hsl(52, 100%, 62%)',
        plWhite: 'hsl(0, 0%, 100%)',
        vbCyan: 'hsl(176, 100%, 44%)',
        vbCyan2: 'hsl(177, 92%, 70%)',
        dkText: 'hsl(198, 20%, 13%)',
      },
      fontFamily: {
        spartan: ['"League Spartan"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

