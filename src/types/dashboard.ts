import { SermonSummaryDto } from "./documents";

export interface SermonStatsDto {
  total: number;
  byType: {
    video: number;
    audio: number;
    text: number;
  };
  recent: SermonSummaryDto[];
}

export interface DocumentsByLanguageResponseDto {
    data:{
        languageId: string;
        documentsNumber: number;
    }[]
}

export interface UserMessageResponseDto {
    id: string;
    username: string;
    email: string;
    message: string;
    createdAt: Date;
}