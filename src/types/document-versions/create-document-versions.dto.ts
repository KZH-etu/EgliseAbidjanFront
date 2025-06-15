export interface CreateDocumentVersionDto {
    documentId: string; // when creating a new version, the documentId is required
    languageId: string;   // also required; links to id of an added language
    title: string;
    description?: string;
    mediaItems: string[]; // Array of media item IDs, if empty, no media will be added
}

export interface UpdateDocumentVersionDto {
    documentId?: string;
    languageId?: string;
    title?: string;
    description?: string;
    mediaItems: string[];
}