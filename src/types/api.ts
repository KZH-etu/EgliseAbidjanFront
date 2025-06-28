///////////////////////
// Base Types & Enums
///////////////////////

export enum MediaType {
  TEXT = 'TEXT',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
}

export enum DocumentCategory {
  BOOK = 'BOOK',
  SERMON = 'SERMON',
  EVENT = 'EVENT',
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
  PRAYER = 'PRAYER',
  SEMINAR = 'SEMINAR',
}

///////////////////////
// Base Entity Interface
///////////////////////

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

///////////////////////
// Language Types
///////////////////////

export interface Language extends BaseEntity {
  name: string;
  type: LanguageType;
  countryOfOrigin?: string;
}

export interface LanguageOption {
  id: string;
  name: string;
}

export interface NewLanguage {
  id: string;
  name: string;
  type: LanguageType;
  countryOfOrigin?: string;
}

export interface LanguageUpdate {
  name?: string;
  type?: LanguageType;
  countryOfOrigin?: string;
}

///////////////////////
// Tag Types
///////////////////////

export interface TagTranslation {
  language: LanguageEnum;
  title: string;
}

export interface Tag extends BaseEntity {
  translations: TagTranslation[];
}

export interface TagSummary {
  id: string;
  title?: string; // in selected language
}

export interface NewTag {
  translations: TagTranslation[];
}

///////////////////////
// Metadata Types
///////////////////////

export interface BookMetadata {
  author: string;
  publisher?: string;
  publishedAt?: Date;
  isbn?: string;
  pageCount?: number;
}

export interface SermonMetadata {
  preacher: string;
  preachedAt: Date;
  location?: string;
}

export interface EventMetadata {
  type: EventType;
  startTime: Date;
  endTime?: Date;
  location?: string;
}

// Create types for new metadata (used in forms)
export type NewBookMetadata = Partial<BookMetadata>;
export type NewSermonMetadata = Partial<SermonMetadata>;
export type NewEventMetadata = Partial<EventMetadata>;

///////////////////////
// Document Types
///////////////////////

export interface DocumentMeta extends BaseEntity {
  bookMeta?: BookMetadata;
  sermonMeta?: SermonMetadata;
  eventMeta?: EventMetadata;
}

export interface Document extends BaseEntity {
  globalTitle: string;
  categories: DocumentCategory[];
  tags: TagSummary[];
  availableLanguages: LanguageOption[];
  docVersionIds: string[];
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
// Document Version Types
///////////////////////

export interface DocumentVersion extends BaseEntity {
  documentId: string;
  languageId: string;
  title: string;
  description?: string;
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
// Document Media Types
///////////////////////

export interface DocumentMedia extends BaseEntity {
  documentVersionId: string;
  mediaType: MediaType;
  url: string;
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
// Subscriber Types
///////////////////////

export interface Subscriber extends BaseEntity {
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
// Media Library Types
///////////////////////

// Base interface for all media cards - shared properties regardless of media type
export interface BaseMediaCard {
  id: string;
  title: string;
  description?: string;
  categories: DocumentCategory[];
  mediaType: MediaType;
  mediaUrl: string;
  tags: TagSummary[];
  language: LanguageOption;
  duration?: number; // in seconds, useful for audio/video
  fileSize?: number; // in bytes
  thumbnailUrl?: string; // for video/image previews
  createdAt: Date;
  updatedAt: Date;
}

// Text-specific media card (books, documents, transcripts)
export interface TextMediaCard extends BaseMediaCard {
  mediaType: MediaType.TEXT;
  // Text-specific metadata (minimal display)
  author?: string;
  pageCount?: number;
  publisher?: string;
  isbn?: string;
  // Small metadata section
  textMeta?: {
    wordCount?: number;
    readingTime?: number; // estimated reading time in minutes
    format?: 'PDF' | 'EPUB' | 'TXT' | 'DOC';
  };
}

// Audio-specific media card (sermons, music, podcasts)
export interface AudioMediaCard extends BaseMediaCard {
  mediaType: MediaType.AUDIO;
  // Audio-specific metadata (minimal display)
  speaker?: string;
  preacher?: string;
  location?: string;
  recordedAt?: Date;
  // Small metadata section
  audioMeta?: {
    bitrate?: number;
    format?: 'MP3' | 'WAV' | 'OGG' | 'AAC';
    quality?: 'Low' | 'Medium' | 'High' | 'Lossless';
  };
}

// Video-specific media card (sermons, events, documentaries)
export interface VideoMediaCard extends BaseMediaCard {
  mediaType: MediaType.VIDEO;
  // Video-specific metadata (minimal display)
  speaker?: string;
  preacher?: string;
  location?: string;
  recordedAt?: Date;
  // Small metadata section
  videoMeta?: {
    resolution?: string; // e.g., "1080p", "720p"
    format?: 'MP4' | 'WEBM' | 'AVI' | 'MOV';
    aspectRatio?: string; // e.g., "16:9", "4:3"
    hasSubtitles?: boolean;
  };
}

// Union type for all media card types
export type MediaCard = TextMediaCard | AudioMediaCard | VideoMediaCard;

// Basic media card for mixed-type displays (when no specific media type is selected)
export interface BasicMediaCard {
  id: string;
  title: string;
  description?: string;
  categories: DocumentCategory[];
  mediaType: MediaType;
  tags: TagSummary[];
  language: LanguageOption;
  thumbnailUrl?: string;
  duration?: number;
  createdAt: Date;
  // Minimal metadata that works for all types
  primaryPerson?: string; // author, speaker, preacher - whatever is most relevant
  location?: string;
  recordedAt?: Date;
}

// Legacy types for backward compatibility
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
  relatedItems: string[]; // Changed to array of IDs
}

///////////////////////
// Card Data Types (for UI components)
///////////////////////

interface BaseCardData {
  id: string;
  title: string;
  categories: DocumentCategory[];
}

export interface BookCardData extends BaseCardData {
  bookMeta: BookMetadata;
}

export interface SermonCardData extends BaseCardData {
  sermonMeta: SermonMetadata;
}

export interface EventCardData extends BaseCardData {
  eventMeta: EventMetadata;
}

// Union type for all card data types
export type DocumentCardData = BookCardData | SermonCardData | EventCardData;

///////////////////////
// Type Guards
///////////////////////

export function isBookCard(card: DocumentCardData): card is BookCardData {
  return card.categories.includes(DocumentCategory.BOOK);
}

export function isSermonCard(card: DocumentCardData): card is SermonCardData {
  return card.categories.includes(DocumentCategory.SERMON);
}

export function isEventCard(card: DocumentCardData): card is EventCardData {
  return card.categories.includes(DocumentCategory.EVENT);
}

// Media card type guards
export function isTextMediaCard(card: MediaCard): card is TextMediaCard {
  return card.mediaType === MediaType.TEXT;
}

export function isAudioMediaCard(card: MediaCard): card is AudioMediaCard {
  return card.mediaType === MediaType.AUDIO;
}

export function isVideoMediaCard(card: MediaCard): card is VideoMediaCard {
  return card.mediaType === MediaType.VIDEO;
}

///////////////////////
// Utility Types
///////////////////////

// Extract ID type from any entity
export type EntityId<T extends { id: any }> = T['id'];

// Make all properties of T optional except for the specified keys
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// Create a type that represents the creation payload for any entity
export type CreatePayload<T extends BaseEntity> = Omit<T, keyof BaseEntity>;

// Create a type that represents the update payload for any entity
export type UpdatePayload<T extends BaseEntity> = Partial<Omit<T, keyof BaseEntity>>;