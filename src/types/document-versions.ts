
export interface DocumentVersionResponseDto {
    id: string;
    documentId: string;         // Foreign Key -> document
    language: string;          // language.name ("Anglais", "Français", etc.)
    title: string;             // translated title of the document
    createdAt: Date;       // date of creation
    updatedAt: Date;       // date of last update
}

export interface CreateDocumentVersionDto {
    documentId: string; // when creating a new version, the documentId is required
    languageId: string; // also required; links to id of an added language
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
