import { MediaType } from "./document-media";

export interface CreateDocumentMediaDto {
    documentVersionId: string;  // when creating a media, the documentVersionId is required
    mediaType: MediaType;
    url: string;
}

export interface UpdateDocumentMediaDto {
    documentVersionId?: string;
    mediaType?: MediaType;
    url?: string;
}