export enum MediaType {
  TEXT = 'TEXT',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
}


export interface DocumentMediaResponseDto {
    id: string;
    documentVersionId: string;  // id to link back to the document-version
    mediaType: MediaType;
    url: string;     //url to the actual document
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateDocumentMediaDto {
    documentVersionId: string; // when creating a media, the documentVersionId is required
    mediaType: MediaType;
    url: string;
}

export interface UpdateDocumentMediaDto {
    documentVersionId?: string;
    mediaType?: MediaType;
    url?: string;
}
