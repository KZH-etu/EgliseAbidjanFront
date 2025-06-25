
///////////////////////
// Shared Enums
///////////////////////

export enum MediaType {
  TEXT = 'TEXT',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
}

export enum DocumentCategory {
  BOOK   = 'BOOK',
  SERMON = 'SERMON',
  EVENT  = 'EVENT',
}

export enum LanguageEnum {
  en = 'en',
  fr = 'fr',
  es = 'es',
}

export enum LanguageType {
  LOCAL = 'LOCAL',
  INTERNATIONAL = 'INTERNATIONAL',
}

export enum EventType {
  CONVENTION = 'CONVENTION',
  PRAYER     = 'PRAYER',
  SEMINAR    = 'SEMINAR',
}

///////////////////////
// Subscriber
///////////////////////


export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: Date;
  isActive: boolean;
}

export interface NewSubscriber {
  email: string;
}

export interface SubscriberUpdate {
  isActive?: boolean;
}

///////////////////////
// Tag
///////////////////////


export interface Tag {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  translations: TagTranslation[];
}

export interface TagTranslation {
  language: LanguageEnum;
  title: string;
}

export interface TagSummary {
  id: string;
  title?: string;  // in selected language
}

export interface NewTag {
  translations: TagTranslation[];
}

///////////////////////
// Language
///////////////////////

export interface Language {
  id: string;               // e.g. 'en', 'fr', 'es'
  name: string;             // 'English', 'Français'
  type: LanguageType;
  countryOfOrigin?: string;
}

export interface LanguageOption {
  id: string;
  name: string;
}

export interface NewLanguage {
  id: string;               // e.g. 'en'
  name: string;
  type?: LanguageType;
  countryOfOrigin?: string;
}

export interface LanguageUpdate {
  name?: string;
  type?: LanguageType;
  countryOfOrigin?: string;
}

///////////////////////
// Document
///////////////////////

export interface Document {
  id: string;
  globalTitle: string;
  createdAt: Date;
  updatedAt: Date;
  categories: DocumentCategory[];
  tags: TagSummary[];
  availableLanguages: LanguageOption[];
  docVersionIds: string[];
}

export interface DocumentMeta {
  id: string;
  bookMeta?: BookMetadata;
  sermonMeta?: SermonMetadata;
  eventMeta?: EventMetadata;
}

export interface NewDocument {
  globalTitle: string;
  categories?: DocumentCategory[];
  tagIds?: string[];
  bookMeta?: NewBookMetadata;
  sermonMeta?: NewSermonMetadata;
  eventMeta?: NewEventMetadata;
  docVersionIds?: string[];
}

export interface DocumentUpdate {
  globalTitle?: string;
  categories?: DocumentCategory[];
  tagIds?: string[];
  bookMeta?: NewBookMetadata;
  sermonMeta?: NewSermonMetadata;
  eventMeta?: NewEventMetadata;
  docVersionIds?: string[];
}


///////////////////////
// Document Version
///////////////////////

export interface DocumentVersion {
  id: string;
  documentId: string;
  languageId: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewDocumentVersion {
  documentId: string;
  languageId: string;
  title: string;
  description?: string;
  mediaItems?: string[];
}

export interface DocumentVersionUpdate {
  documentId?: string;
  languageId?: string;
  title?: string;
  description?: string;
  mediaItems?: string[];
}

///////////////////////
// Document Media
///////////////////////

export interface DocumentMedia {
  id: string;
  documentVersionId: string;
  mediaType: MediaType;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewDocumentMedia {
  documentVersionId: string;
  mediaType: MediaType;
  url: string;
  title?: string;
}

export interface DocumentMediaUpdate {
  documentVersionId?: string;
  mediaType?: MediaType;
  url?: string;
  title?: string;
}

///////////////////////
// Metadata Details
///////////////////////

export interface BookMetadata {
  author: string;
  publisher?: string;
  publishedAt?: Date;
  isbn?: string;
  pageCount?: number;
}

export interface NewBookMetadata extends Partial<BookMetadata> {}

export interface SermonMetadata {
  preacher: string;
  preachedAt: Date;
  location?: string;
}

export interface NewSermonMetadata extends Partial<SermonMetadata> {}

export interface EventMetadata {
  type: EventType;
  startTime: Date;
  endTime?: Date;
  location?: string;
}

export interface NewEventMetadata extends Partial<EventMetadata> {}


///////////////////////
// Media Library Views
///////////////////////


export interface MediaLibraryItem {
  id: string;
  title: string;
  description?: string;
  categories: DocumentCategory[];
  mediaId: string;
  mediaType: MediaType;
  tags: TagSummary[];
  language: LanguageOption;
  keyPersons: string[];
}

export interface MediaLibraryCard {
  id: string;
  title: string;
  description?: string;
  speaker?: string;
  location?: string;
  date?: Date;
  mediaUrl: string;
}

export interface MediaLibraryItemView {
  id: string;
  title: string;
  description?: string;
  bookMeta?: BookMetadata;
  sermonMeta?: SermonMetadata;
  eventMeta?: EventMetadata;
  mediaUrl: string;
  tags: TagSummary[];
  availableLanguages: LanguageOption[];
  relatedItems: MediaLibraryCard[];
}

///////////////////////
// Document Cards
///////////////////////

/**
 * Core fields for any document card
 */
interface BaseDocumentCardProps {
  id: string;
  title: string;
  categories: DocumentCategory[];
}

/**
 * Book card data extends base with book-specific metadata
 */
export interface BookCardData extends BaseDocumentCardProps {
  bookMeta: BookMetadata;
}

/**
 * Sermon card data extends base with sermon-specific metadata
 */
export interface SermonCardData extends BaseDocumentCardProps {
  sermonMeta: SermonMetadata;
}

/**
 * Event card data extends base with event-specific metadata
 */
export interface EventCardData extends BaseDocumentCardProps {
  eventMeta: EventMetadata;
}

/**
 * Discriminated union for all document card types
 */
export type DocumentCardData =
  | (BookCardData & { categories: [DocumentCategory.BOOK] })
  | (SermonCardData & { categories: [DocumentCategory.SERMON] })
  | (EventCardData & { categories: [DocumentCategory.EVENT] });