import { Language, LanguageOption, LanguageType } from "../types/api";

export const mockLanguageSummaries: LanguageOption[] = [
  { id: 'en', name: 'English' },
  { id: 'fr', name: 'Français' },
  { id: 'es', name: 'Español' },
];

export const mockLanguages: Language[] = [
  {
    id: 'en',
    name: 'English',
    type: LanguageType.INTERNATIONAL,
    countryOfOrigin: 'United Kingdom',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'fr',
    name: 'Français',
    type: LanguageType.INTERNATIONAL,
    countryOfOrigin: 'France',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'es',
    name: 'Español',
    type: LanguageType.INTERNATIONAL,
    countryOfOrigin: 'Spain',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'ba',
    name: 'Baoulé',
    type: LanguageType.LOCAL,
    countryOfOrigin: 'Côte d\'Ivoire',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'yo',
    name: 'Yoruba',
    type: LanguageType.LOCAL,
    countryOfOrigin: 'Nigeria',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];