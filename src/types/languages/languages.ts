export enum LanguageType {
  LOCAL = 'LOCAL',
  INTERNATIONAL = 'INTERNATIONAL',
}

export interface LanguageResponseDto {
  id: string;               // e.g. 'en', 'fr', 'es'
  name: string;             // 'English', 'Français', 'Español'
  type: LanguageType;
  countryOfOrigin?: string;
}