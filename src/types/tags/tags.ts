export interface TagResponseDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  translations: {language: string, title: string}[];
}

export interface TagTranslation {
  id: string;
  tagId: string;        // FK → Tag.id
  language: 'en' | 'fr' | 'es';
  title: string;          // e.g. “Blessing” / “Bénédiction” / “Bendición”
}

export interface TagSummaryDto {
  id: string;
  title?: string;  // title can be undefined if not set in the target language
}