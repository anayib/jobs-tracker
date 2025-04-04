'use client'

import { createContext, useContext, useState } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import enMessages from '../../messages/en.json'
import esMessages from '../../messages/es.json'
import frMessages from '../../messages/fr.json'

type Language = 'en' | 'es' | 'fr'

const messages = {
  en: enMessages,
  es: esMessages,
  fr: frMessages,
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <NextIntlClientProvider locale={language} messages={messages[language]}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 