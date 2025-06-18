// Importing necessary DTOs and interfaces for the services
import { CreateDocumentMediaDto, UpdateDocumentMediaDto } from "./document-media";
import { DocumentMediaResponseDto } from "./document-media";
import { CreateDocumentVersionDto, UpdateDocumentVersionDto } from "./document-versions";
import { DocumentVersionResponseDto } from "./document-versions";
import { CreateDocumentDto, UpdateDocumentDto } from "./documents";
import { DocumentMetaResponseDto, DocumentResponseDto, EventSummaryDto } from "./documents";
import { CreateLanguageDto, UpdateLanguageDto } from "./languages";
import { LanguageResponseDto, LanguageSummaryDto } from "./languages";
import { MediaLibraryItemDto, MediaLibraryItemViewDto } from "./mediaLibrary";
import { CreateTagDto } from "./tags";
import { TagResponseDto, TagSummaryDto } from "./tags";

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
    fetchDocuments(): Promise<DocumentResponseDto[]>;
    fetchDocument(id: string): Promise<DocumentResponseDto>;
    createDocument(body: CreateDocumentDto): Promise<void>;
    updateDocument(id: string, body: UpdateDocumentDto): Promise<void>;
    deleteDocument(id: string): Promise<void>;
    fetchMetaByDocument(documentId: string): Promise<DocumentMetaResponseDto>;
    fetchEvents(): Promise<EventSummaryDto[]>;
}

export interface IDocumentMediaService {
    fetchAllMedia(): Promise<DocumentMediaResponseDto[]>;
    fetchMediaByVersion(versionId: string): Promise<DocumentMediaResponseDto[]>;
    fetchMediaItem(id: string): Promise<DocumentMediaResponseDto>;
    createMedia(body: CreateDocumentMediaDto): Promise<void>;
    updateMedia(id: string, body: UpdateDocumentMediaDto): Promise<void>;
    deleteMedia(id: string): Promise<void>;
}

export interface IDocumentVersionService {
    fetchAllVersions(): Promise<DocumentVersionResponseDto[]>;
    fetchVersionsByDocument(documentId: string): Promise<DocumentVersionResponseDto[]>;
    fetchVersion(id: string): Promise<DocumentVersionResponseDto>;
    createVersion(body: CreateDocumentVersionDto): Promise<void>;
    updateVersion(id: string, body: UpdateDocumentVersionDto): Promise<void>;
    deleteVersion(id: string): Promise<void>;
    searchVersions(query: string): Promise<DocumentVersionResponseDto[]>;
}

export interface ILanguageService {
    fetchLanguageSummaries(): Promise<LanguageSummaryDto[]>;
    fetchLanguages(): Promise<LanguageResponseDto[]>;
    createLanguage(body: CreateLanguageDto): Promise<void>;
    updateLanguage(id: string, body: UpdateLanguageDto): Promise<void>;
    deleteLanguage(id: string): Promise<void>;
}

export interface ITagService {
    fetchTagSummaries(): Promise<TagSummaryDto[]>;
    fetchTags(): Promise<TagResponseDto[]>;
    searchTags(query: string): Promise<TagSummaryDto[]>;
    createTag(body: CreateTagDto): Promise<void>;
    updateTag(id: string, body: CreateTagDto): Promise<void>;
    deleteTag(id: string): Promise<void>;
}

export interface IMediaLibraryService {
    fetchItems(): Promise<MediaLibraryItemDto[]>;
    fetchView(id: string, languageId: string, type: string ): Promise<MediaLibraryItemViewDto>;
        // type can be 'audio', 'video', or 'text'
}