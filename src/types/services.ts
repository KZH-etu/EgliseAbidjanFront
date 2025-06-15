import { CreateDocumentMediaDto, UpdateDocumentMediaDto } from "./document-media/create-document-media.dto";
import { DocumentMediaResponseDto } from "./document-media/document-media";
import { CreateDocumentVersionDto, UpdateDocumentVersionDto } from "./document-versions/create-document-versions.dto";
import { DocumentVersionResponseDto } from "./document-versions/document-versions";
import { CreateDocumentDto, UpdateDocumentDto } from "./documents/create-document.dto";
import { Document, EventSummaryDto } from "./documents/documents";
import { LanguageSummaryDto } from "./languages/languages";

export interface IDocumentService {
    fetchDocuments(): Promise<Document[]>;
    fetchDocument(id: string): Promise<Document>;
    createDocument(body: CreateDocumentDto): Promise<void>;
    updateDocument(id: string, body: UpdateDocumentDto): Promise<void>;
    deleteDocument(id: string): Promise<void>;
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
}

export interface ILanguageService {
    fetchLanguageSummaries(): Promise<LanguageSummaryDto[]>
}