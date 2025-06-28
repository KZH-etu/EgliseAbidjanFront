// Importing necessary DTOs and interfaces for the services
import { NewDocumentMedia, DocumentMediaUpdate } from "./api";
import { DocumentMedia } from "./api";
import { NewDocumentVersion, DocumentVersionUpdate } from "./api";
import { DocumentVersion } from "./api";
import { NewDocument, DocumentUpdate } from "./api";
import { DocumentMeta, Document } from "./api";
import { NewLanguage, LanguageUpdate } from "./api";
import { Language, LanguageOption } from "./api";
import { MediaCard, BasicMediaCard } from "./api";
import { NewTag } from "./api";
import { Tag, TagSummary } from "./api";
import { QueryState, PaginatedResponse } from "./common";

// Type Definitions for Services

export interface Services {
  documentService: IDocumentService;
  documentMediaService: IDocumentMediaService;
  documentVersionsService: IDocumentVersionService;
  languageService: ILanguageService;
  tagService: ITagService;
  mediaLibraryService: IMediaLibraryService;
}

export interface IDocumentService {
    // Query-based methods
    queryDocuments(params: QueryState): Promise<PaginatedResponse<Document>>;
    fetchDocument(id: string): Promise<Document>;
    createDocument(body: NewDocument): Promise<void>;
    updateDocument(id: string, body: DocumentUpdate): Promise<void>;
    deleteDocument(id: string): Promise<void>;
    fetchMetaByDocument(documentId: string): Promise<DocumentMeta>;
    
    // Legacy methods for backward compatibility
    fetchDocuments(): Promise<Document[]>;
}

export interface IDocumentMediaService {
    // Query-based methods
    queryMedia(params: QueryState): Promise<PaginatedResponse<DocumentMedia>>;
    fetchMediaByVersion(versionId: string): Promise<DocumentMedia[]>;
    fetchMediaItem(id: string): Promise<DocumentMedia>;
    createMedia(body: NewDocumentMedia): Promise<void>;
    updateMedia(id: string, body: DocumentMediaUpdate): Promise<void>;
    deleteMedia(id: string): Promise<void>;
    
    // Legacy methods for backward compatibility
    fetchAllMedia(): Promise<DocumentMedia[]>;
}

export interface IDocumentVersionService {
    // Query-based methods
    queryVersions(params: QueryState): Promise<PaginatedResponse<DocumentVersion>>;
    fetchVersionsByDocument(documentId: string): Promise<DocumentVersion[]>;
    fetchVersion(id: string): Promise<DocumentVersion>;
    createVersion(body: NewDocumentVersion): Promise<void>;
    updateVersion(id: string, body: DocumentVersionUpdate): Promise<void>;
    deleteVersion(id: string): Promise<void>;
    searchVersions(query: string): Promise<DocumentVersion[]>;
    
    // Legacy methods for backward compatibility
    fetchAllVersions(): Promise<DocumentVersion[]>;
}

export interface ILanguageService {
    // Query-based methods
    queryLanguages(params: QueryState): Promise<PaginatedResponse<Language>>;
    fetchLanguageSummaries(): Promise<LanguageOption[]>;
    createLanguage(body: NewLanguage): Promise<void>;
    updateLanguage(id: string, body: LanguageUpdate): Promise<void>;
    deleteLanguage(id: string): Promise<void>;
    
    // Legacy methods for backward compatibility
    fetchLanguages(): Promise<Language[]>;
}

export interface ITagService {
    // Query-based methods
    queryTags(params: QueryState): Promise<PaginatedResponse<Tag>>;
    fetchTagSummaries(): Promise<TagSummary[]>;
    searchTags(query: string): Promise<TagSummary[]>;
    createTag(body: NewTag): Promise<void>;
    updateTag(id: string, body: NewTag): Promise<void>;
    deleteTag(id: string): Promise<void>;
    
    // Legacy methods for backward compatibility
    fetchTags(): Promise<Tag[]>;
}

export interface IMediaLibraryService {
    // Query-based methods
    queryMediaCards(params: QueryState & { type?: 'text' | 'audio' | 'video' }): Promise<PaginatedResponse<MediaCard | BasicMediaCard>>;
    fetchView(id: string, languageId: string, type: string): Promise<any>; // Keep existing for item view
    
    // Legacy methods for backward compatibility
    fetchItems(): Promise<any[]>;
}