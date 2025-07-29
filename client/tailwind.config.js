/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: { 
      colors: {
        'mainele': "var(--mainele)", // NavBackground , 
        'one': "var(--one)",  // NavChildren
        'two': "var(--two)",
        'Ghover': "var(--Ghover)",
        'dropitems':"var(--dropitems)", //Dropdown menu items
        'dropicons':"var(--dropicons)",//Dropdown icons
      },
      fontFamily: {
        Main: [
          'var(--Main-font)',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        Second: [
          'var(--Second-font)',
          'source-code-pro',
          'Menlo',
          'Monaco',
          'Consolas',
          'Courier New',
          'monospace',
        ]
      },
    },
  },
  plugins: [],
}

