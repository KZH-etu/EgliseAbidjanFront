import { MediaType } from "./document-media";
import { DocumentCategory, BookMetadata, SermonMetadata, EventMetadata } from "./documents";
import { LanguageSummaryDto } from "./languages";
import { TagSummaryDto } from "./tags";

export interface MediaLibraryItemDto {   //assumes the language AND media type have been provided in params
    id: string;
    title: string;
    description?: string;
    categories: DocumentCategory[];
    mediaId: string;  // ID of the media item
    mediaType: MediaType;  // Type of media (e.g., audio, video, text)
    tags: TagSummaryDto[];
    language: LanguageSummaryDto;  // Language of the media item
    keyPersons: string[];  // Key persons associated with the media item (e.g., preacher, author)
}

export interface MediaLibraryCardDto  {  // Represents a small card for audio, vieo or text media in the library
    id: string;
    title: string;
    description?: string;
    speaker?: string;
    location?: string;
    date?: Date;
    mediaUrl: string;  // URL to the file
};

export interface MediaLibraryItemViewDto {  // Represents a detailed view of an audio, video or text item in the library
    id: string;
    title: string;
    description?: string;
    bookMeta?: BookMetadata;
    sermonMeta?: SermonMetadata;
    eventMeta?: EventMetadata;
    mediaUrl: string;  // URL to the media file
    tags: TagSummaryDto[];
    availableLanguages: LanguageSummaryDto[];  // List of languages available for this doc
    relatedItems: MediaLibraryCardDto[];  // Related items
}