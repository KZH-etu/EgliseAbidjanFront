import { MediaType } from "./document-media";
import { LanguageSummaryDto } from "./languages";
import { TagSummaryDto } from "./tags";

// SERMONS

export interface SermonMetadata {
    preacher: string;
    preachedAt: Date;
    location?: string;
}

// EVENTS

export enum EventType {
    CONVENTION = 'CONVENTION',
    PRAYER = 'PRAYER',
    SEMINAR = 'SEMINAR'
};

export interface EventMetadata {
    type: EventType;
    startTime: Date;
    endTime?: Date;
    location?: string;
}

// BOOKS

export interface BookMetadata {
    author: string;
    publisher?: string;
    publishedAt?: Date;
    isbn?: string;
    pageCount?: number;
}

// DOCUMENTS

export enum DocumentCategory {
  BOOK   = 'BOOK',
  SERMON = 'SERMON',
  EVENT  = 'EVENT',
}

export interface SermonSummaryDto {
    id: string;
    title: string;
    preacher: string;
    date: string;
    type: MediaType;
    mediaUrl?: string;
}

export interface EventSummaryDto {
    id: string;
    title: string;
    date: string;
    location: string;
    description?: string;
}

export interface DocumentResponseDto {
    id: string;
    globalTitle: string;
    createdAt: Date;
    updatedAt: Date;
    categories: DocumentCategory[];
    tags: TagSummaryDto[];
    availableLanguages: LanguageSummaryDto[];
    docVersionIds: string[];
}

export interface DocumentMetaResponseDto {
    id: string;
    bookMeta?: BookMetadata;
    sermonMeta?: SermonMetadata;
    eventMeta?: EventMetadata;
}
export interface CreateBookMetadataDto {
    author?: string;
    publisher?: string;
    publishedAt?: Date;
    isbn?: string;
    pageCount?: number;
}

export interface CreateSermonMetadataDto {
    preacher?: string;
    preachedAt?: Date;
    topic?: string;
    location?: string;
}

export interface CreateEventMetadataDto {
    type?: EventType;
    startTime?: Date;
    theme?: string;
    endTime?: Date;
    location?: string;
}

export interface CreateDocumentDto {
    globalTitle: string;
    categories: DocumentCategory[]; //if empty, then no category is set
    tagIds: string[]; // array of tag IDs, can be empty if no tags are set

    // optional metadata
    bookMeta?: CreateBookMetadataDto;
    sermonMeta?: CreateSermonMetadataDto;
    eventMeta?: CreateEventMetadataDto;
    docVersionIds: string[]; // array of document version IDs, can be empty if no versions are set
}

export interface UpdateDocumentDto {
    globalTitle?: string;
    categories?: DocumentCategory[];
    tagIds?: string[];
    bookMeta?: CreateBookMetadataDto;
    sermonMeta?: CreateSermonMetadataDto;
    eventMeta?: CreateEventMetadataDto;
    docVersionId: string[];
}
