const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      
      colors: {
        jcruby: '#72253d',
        jcaqua: '#007079',
        jcslate: '#5b6770',
        jcamber: '#ff4814',
        jcgold: '#ffa400',
        jconyx: '#000000',
        primary: '#202225',
        secondary: '#5865f2',

      }
    },
  },
  plugins: [
    
  ],
}
