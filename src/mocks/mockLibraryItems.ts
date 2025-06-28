import { MediaLibraryItem, MediaLibraryItemView } from "../types/api";
import { MediaType } from "../types/api";
import { DocumentCategory } from "../types/api";
import { mockTagSummaries } from "./mockTags";
import { mockLanguageSummaries } from "./mockLanguages";

// Use tag and language summaries from mocks for consistency
export const mockLibraryItems: MediaLibraryItem[] = [
  {
    id: "doc1",
    mediaId: "dm1",
    title: "Walking in Faith",
    description: "A book about walking in faith.",
    categories: [DocumentCategory.BOOK],
    mediaType: MediaType.TEXT,
    tags: [mockTagSummaries[0], mockTagSummaries[2]],
    language: mockLanguageSummaries[0],
    keyPersons: ["John Doe"]
  },
  {
    id: "doc2",
    mediaId: "dm3",
    title: "Sunday Sermon Series",
    description: "A powerful sermon series.",
    categories: [DocumentCategory.SERMON],
    mediaType: MediaType.AUDIO,
    tags: [mockTagSummaries[1], mockTagSummaries[2]],
    language: mockLanguageSummaries[0],
    keyPersons: ["Jane Smith"]
  },
  {
    id: "doc3",
    mediaId: "dm4",
    title: "Annual Prayer Meeting",
    description: "Event for annual prayer.",
    categories: [DocumentCategory.EVENT],
    mediaType: MediaType.AUDIO,
    tags: [mockTagSummaries[3], mockTagSummaries[4]],
    language: mockLanguageSummaries[0],
    keyPersons: ["Carlos Ruiz"]
  },
  {
    id: "doc4",
    mediaId: "dm6",
    title: "Faith & Fellowship",
    description: "A book and sermon on faith and fellowship.",
    categories: [DocumentCategory.BOOK, DocumentCategory.SERMON],
    mediaType: MediaType.TEXT,
    tags: [mockTagSummaries[0], mockTagSummaries[1], mockTagSummaries[2]],
    language: mockLanguageSummaries[0],
    keyPersons: ["Paul Martin"]
  }
];

// Example MediaLibraryItemViewDto (using tags/languages from mocks)
export const mockTextItemView: MediaLibraryItemView = {
  id: "doc1",
  title: "Walking in Faith",
  description: "A book about walking in faith.",
  bookMeta: {
    author: "John Doe",
    publisher: "Faith Press",
    publishedAt: new Date("2022-05-10"),
    isbn: "978-3-16-148410-0",
    pageCount: 320
  },
  mediaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // PDF
  tags: [mockTagSummaries[0], mockTagSummaries[2]],
  availableLanguages: [mockLanguageSummaries[0], mockLanguageSummaries[1]],
  relatedItems: ["doc4", "doc2"] // Changed to array of IDs
};

export const mockAudioItemView: MediaLibraryItemView = {
  id: "doc2",
  title: "Sunday Sermon Series",
  description: "A powerful sermon series.",
  sermonMeta: {
    preacher: "Jane Smith",
    preachedAt: new Date("2025-04-01T10:30:00Z"),
    location: "Main Sanctuary"
  },
  mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // MP3
  tags: [mockTagSummaries[1], mockTagSummaries[2]],
  availableLanguages: [mockLanguageSummaries[0]],
  relatedItems: ["doc3", "doc1"] // Changed to array of IDs
};

export const mockVideoItemView: MediaLibraryItemView = {
  id: "doc4",
  title: "Faith & Fellowship",
  description: "A book and sermon on faith and fellowship.",
  sermonMeta: {
    preacher: "Paul Martin",
    preachedAt: new Date("2025-06-01T07:00:00Z"),
    location: "Main Hall"
  },
  mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // MP4
  tags: [mockTagSummaries[0], mockTagSummaries[1], mockTagSummaries[2]],
  availableLanguages: [mockLanguageSummaries[0], mockLanguageSummaries[1]],
  relatedItems: ["doc1", "doc2"] // Changed to array of IDs
};