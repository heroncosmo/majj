import { createContext, useContext, useMemo, useState, ReactNode } from 'react'

type Lang = 'fr' | 'pt' | 'en'

type Dict = Record<string, Record<Lang, string>>

const dict: Dict = {
  greeting: {
    fr: 'Bonjour',
    pt: 'Olá',
    en: 'Hello',
  },
  quickActions: {
    fr: 'Actions Rapides',
    pt: 'Ações Rápidas',
    en: 'Quick Actions',
  },
  addProject: {
    fr: 'Ajouter un Projet',
    pt: 'Adicionar Projeto',
    en: 'Add Project',
  },
  updateProfile: {
    fr: 'Mettre à Jour le Profil',
    pt: 'Atualizar Perfil',
    en: 'Update Profile',
  },
}

function translate(key: keyof typeof dict, lang: Lang) {
  return dict[key][lang]
}

type I18nContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: keyof typeof dict) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr')
  const value = useMemo<I18nContextType>(() => ({
    lang,
    setLang,
    t: (key) => translate(key, lang)
  }), [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

