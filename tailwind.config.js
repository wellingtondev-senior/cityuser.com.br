/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,tsx,jsx}",
    "./components/**/*.{js,ts,tsx,jsx}",
],
  theme: {
    screens: {
      'md': {'max': '767px'},
      'laptop': '1024px',
    },
   
    backgroundSize: {
      'size-100': '100%',
      'size-110': '110%',
    },
    extend: {
      
      keyframes: {
        waterAnimation: {
          '0%': {
            transform: 'translate(-50%, -50%)'
          },
          '25%': {
            transform: 'translate(-50%, -40%)'
          },
          '50%': {
            transform: 'translate(-50%, -60%)'
          }.transform,
          '100%': {
            transform: 'translate(-50%, -50%)'
          },
        },
       eCloseBoxModalMobile: {
          '0%':{
            bottom:"0"
          },
          '100%': {
            bottom:"-30em"
             
            },
        }, 
      },
      colors: {
        'verde-primary':'#4cd137',
        'verde-segundary':'#44bd32',
        'amarelo-primary':'#ffa502',
        'amarelo-segundary':'#f1c40f',
        'laranja-primary':'#e67e22',
        'laranja-segundary':'#d35400',
        'vermelho-primary':'#e84118',
        'vermelho-segundary':'#c23616',
        'roxo-primary':'#5f27cd',
        'roxo-segundary':'#341f97',
        
      },
    },
  },
  plugins: [require("daisyui")],
}

