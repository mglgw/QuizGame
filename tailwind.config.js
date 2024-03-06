/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens:{
        'laptop': '1025px'
      },
      fontFamily:{
        'michroma' :['Michroma']
      },
      colors:{
        'background-grey': '#24242452',
        'background-purple': '#e03168',
        'deep-purple': '#330531'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
          shake: {
          '0%': {
            transform: 'translateX(0rem)',
          },
          '25%': {
            transform: 'translateX(-1rem)',
          },
          '75%': {
            transform: 'translateX(1rem)',
          },
          '100%': {
            transform: 'translateX(0rem)',
          },
          background: {
            '0%, 100%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        shake: 'shake 1s infinite',
        border: 'background ease infinite',
      },
      width:{
        '720': '45rem',
      },
      backgroundImage :{
        'answer-pattern' : "url('src/assets/img/answercard.png')"
      }
    }
  },
  plugins: [
  ],
};

