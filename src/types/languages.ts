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

export interface LanguageSummaryDto {
  id: string; 
  name: string; 
}
export interface CreateLanguageDto {
    name: string;
    type?: LanguageType;
    countryOfOrigin?: string;
}

export interface UpdateLanguageDto {
    name?: string;
    type?: LanguageType;
    countryOfOrigin?: string;
}
