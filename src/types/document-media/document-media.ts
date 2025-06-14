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
