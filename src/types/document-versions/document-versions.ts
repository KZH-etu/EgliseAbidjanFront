
export interface DocumentVersionResponseDto {
    id: string;
    documentId: string;         // Foreign Key -> document
    language: string;          // language.name ("Anglais", "Français", etc.)
    title: string;             // translated title of the document
    createdAt: Date;       // date of creation
    updatedAt: Date;       // date of last update
}