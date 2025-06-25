// Importing necessary DTOs and interfaces for the services
import { NewDocumentMedia, DocumentMediaUpdate } from "./api";
import { DocumentMedia } from "./api";
import { NewDocumentVersion, DocumentVersionUpdate } from "./api";
import { DocumentVersion } from "./api";
import { NewDocument, DocumentUpdate } from "./api";
import { DocumentMeta, Document } from "./api";
import { NewLanguage, LanguageUpdate } from "./api";
import { Language, LanguageOption } from "./api";
import { MediaLibraryItem, MediaLibraryItemView } from "./api";
import { NewTag } from "./api";
import { Tag, TagSummary } from "./api";

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
    fetchDocuments(): Promise<Document[]>;
    fetchDocument(id: string): Promise<Document>;
    createDocument(body: NewDocument): Promise<void>;
    updateDocument(id: string, body: DocumentUpdate): Promise<void>;
    deleteDocument(id: string): Promise<void>;
    fetchMetaByDocument(documentId: string): Promise<DocumentMeta>;
}

export interface IDocumentMediaService {
    fetchAllMedia(): Promise<DocumentMedia[]>;
    fetchMediaByVersion(versionId: string): Promise<DocumentMedia[]>;
    fetchMediaItem(id: string): Promise<DocumentMedia>;
    createMedia(body: NewDocumentMedia): Promise<void>;
    updateMedia(id: string, body: DocumentMediaUpdate): Promise<void>;
    deleteMedia(id: string): Promise<void>;
}

export interface IDocumentVersionService {
    fetchAllVersions(): Promise<DocumentVersion[]>;
    fetchVersionsByDocument(documentId: string): Promise<DocumentVersion[]>;
    fetchVersion(id: string): Promise<DocumentVersion>;
    createVersion(body: NewDocumentVersion): Promise<void>;
    updateVersion(id: string, body: DocumentVersionUpdate): Promise<void>;
    deleteVersion(id: string): Promise<void>;
    searchVersions(query: string): Promise<DocumentVersion[]>;
}

export interface ILanguageService {
    fetchLanguageSummaries(): Promise<LanguageOption[]>;
    fetchLanguages(): Promise<Language[]>;
    createLanguage(body: NewLanguage): Promise<void>;
    updateLanguage(id: string, body: LanguageUpdate): Promise<void>;
    deleteLanguage(id: string): Promise<void>;
}

export interface ITagService {
    fetchTagSummaries(): Promise<TagSummary[]>;
    fetchTags(): Promise<Tag[]>;
    searchTags(query: string): Promise<TagSummary[]>;
    createTag(body: NewTag): Promise<void>;
    updateTag(id: string, body: NewTag): Promise<void>;
    deleteTag(id: string): Promise<void>;
}

export interface IMediaLibraryService {
    fetchItems(): Promise<MediaLibraryItem[]>;
    fetchView(id: string, languageId: string, type: string ): Promise<MediaLibraryItemView>;
        // type can be 'audio', 'video', or 'text'
}