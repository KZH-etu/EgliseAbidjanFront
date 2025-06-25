import { } from "./api";

export interface SermonStats {
  total: number;
  byType: {
    video: number;
    audio: number;
    text: number;
  };
  // recent: DocumentCard[];
}

export interface DocumentsByLanguageResponse {
    data:{
        languageId: string;
        documentsNumber: number;
    }[]
}

export interface UserMessageResponse {
    id: string;
    username: string;
    email: string;
    message: string;
    createdAt: Date;
}