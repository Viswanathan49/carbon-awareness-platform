import { create } from 'zustand'

// Initialize the body and html with dark theme by default
if (typeof document !== 'undefined') {
  document.body.classList.add('dark')
  document.documentElement.classList.add('dark')
}

export const useStore = create((set) => ({
  language: 'EN',
  carbonScore: 0,
  theme: 'dark',
  toggleLanguage: () => set((state) => ({ language: state.language === 'EN' ? 'HI' : 'EN' })),
  setCarbonScore: (score) => set({ carbonScore: score }),
  addCarbonScore: (amount) => set((state) => ({ carbonScore: state.carbonScore + amount })),
  toggleTheme: () => set((state) => {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark'
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      if (nextTheme === 'dark') {
        document.body.classList.add('dark')
        document.body.classList.remove('light')
        root.classList.add('dark')
        root.classList.remove('light')
      } else {
        document.body.classList.add('light')
        document.body.classList.remove('dark')
        root.classList.add('light')
        root.classList.remove('dark')
      }
    }
    return { theme: nextTheme }
  }),
}))
