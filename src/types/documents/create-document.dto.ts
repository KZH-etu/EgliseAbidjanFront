import { DocumentCategory, EventType } from "./documents";

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
    tagIds: string[];  // array of tag IDs, can be empty if no tags are set
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