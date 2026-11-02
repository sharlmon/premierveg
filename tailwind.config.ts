import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  content: [],
  theme: {
    extend: {
      colors: {
        forest: '#0E2A1C', leaf: '#1F5B3A', lime: '#C6F04A',
        cream: '#F5F1E6', tomato: '#FF5A36', sun: '#FFB627', ink: '#0B1A12'
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter Tight', 'system-ui', 'sans-serif']
      }
    }
  }
}
