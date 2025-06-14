import { CreateDocumentMediaDto, UpdateDocumentMediaDto } from "./document-media/create-document-media.dto";
import { DocumentMediaResponseDto } from "./document-media/document-media";
import { CreateDocumentDto, UpdateDocumentDto } from "./documents/create-document.dto";
import { Document, EventSummaryDto } from "./documents/documents";

export interface IDocumentService {
    fetchDocuments(): Promise<Document[]>;
    fetchDocument(id: string): Promise<Document>;
    createDocument(body: CreateDocumentDto): Promise<void>;
    updateDocument(id: string, body: UpdateDocumentDto): Promise<void>;
    deleteDocument(id: string): Promise<void>;
    fetchEvents(): Promise<EventSummaryDto[]>;
}

export interface IDocumentMediaService {
    fetchMedia(): Promise<DocumentMediaResponseDto[]>;
    fetchMediaItem(id: string): Promise<DocumentMediaResponseDto>;
    createMedia(body: CreateDocumentMediaDto): Promise<void>;
    updateMedia(id: string, body: UpdateDocumentMediaDto): Promise<void>;
    deleteMedia(id: string): Promise<void>;
}