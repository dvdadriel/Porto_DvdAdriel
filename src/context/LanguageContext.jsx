import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../data/translations.js'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('porto_lang')
      return saved === 'en' || saved === 'id' ? saved : 'id'
    } catch {
      return 'id'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('porto_lang', lang)
      document.documentElement.lang = lang
    } catch {}
  }, [lang])

  const toggleLang = () => {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'))
  }

  const t = translations[lang] || translations.id

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
