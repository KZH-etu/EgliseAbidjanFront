import { MediaType } from "../document-media/document-media";
import { DocumentVersionResponseDto } from "../document-versions/document-versions";
import { LanguageSummaryDto } from "../languages/languages";
import { TagResponseDto, TagSummaryDto } from "../tags/tags";

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

export interface Document {
    id: string;
    globalTitle: string;
    createdAt: Date;
    updatedAt: Date;

    //can choose to 'include' these fields in return statements
    categories?: DocumentCategory[]
    versions?: DocumentVersionResponseDto[]
    bookMeta?: BookMetadata
    sermonMeta?: SermonMetadata
    eventMeta?: EventMetadata

    tags?: TagResponseDto[];
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

export interface DocumentMediaResponseDto {   //assumes the language AND media type have been provided in params
    id: string;
    globalTitle: string;
    categories: DocumentCategory[];
    bookMeta?: BookMetadata;
    sermonMeta?: SermonMetadata;
    eventMeta?: EventMetadata;
    version: {
        id: string;
        languageId: string;
        title: string;
        description?: string;
        mediaItem: {
            id: string;
            mediaType: MediaType;
            url: string;
        }
    };
    tags: {
        id: string;
        title: string;
    }[];
}

export interface DocumentFullDto {
    id: string;
    globalTitle: string;
    categories: DocumentCategory[];
    versions: {
        id: string;
        languageId: string;
        title: string;
        description?: string;
        mediaItems: {
            id: string;
            mediaType: MediaType;
            url: string;
        }[]
    }[];
    bookMeta?: BookMetadata;
    sermonMeta?: SermonMetadata;
    eventMeta?: EventMetadata;
    tags: {
        id: string;
        translations: {
            language: string;
            title: string;
        }[]
    }[]
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