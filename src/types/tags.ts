export interface TagResponseDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  translations: {language: string, title: string}[];
}

export interface TagSummaryDto {
  id: string;
  title?: string;  // title can be undefined if not set in the target language
}
export enum LanguageEnum {
  en = 'en',
  fr = 'fr',
  es = 'es'
}

export interface CreateTagTranslationDto {
  language: LanguageEnum;
  title: string;
}

export interface CreateTagDto {
  translations: CreateTagTranslationDto[];
}
