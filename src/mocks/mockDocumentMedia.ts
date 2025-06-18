import { DocumentMediaResponseDto, MediaType } from "../types/document-media";

// These media items are referenced by mediaId in mockLibraryItems
const mockDocumentMedia: DocumentMediaResponseDto[] = [
  {
    id: 'dm1',
    documentVersionId: 'v1',
    mediaType: MediaType.TEXT,
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // PDF
    createdAt: new Date('2025-03-11T08:15:00Z'),
    updatedAt: new Date('2025-03-11T08:15:00Z'),
  },
  {
    id: 'dm2',
    documentVersionId: 'v2',
    mediaType: MediaType.TEXT,
    url: 'https://www.cte.iup.edu/cte/Resources/PDF_TestPage.pdf', // PDF
    createdAt: new Date('2025-03-11T09:10:00Z'),
    updatedAt: new Date('2025-03-11T09:10:00Z'),
  },
  {
    id: 'dm3',
    documentVersionId: 'v1',
    mediaType: MediaType.AUDIO,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // MP3
    createdAt: new Date('2025-04-01T10:05:00Z'),
    updatedAt: new Date('2025-04-01T10:05:00Z'),
  },
  {
    id: 'dm4',
    documentVersionId: 'v1',
    mediaType: MediaType.AUDIO,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // MP3
    createdAt: new Date('2025-05-05T08:20:00Z'),
    updatedAt: new Date('2025-05-05T08:20:00Z'),
  },
  {
    id: 'dm5',
    documentVersionId: 'v2',
    mediaType: MediaType.VIDEO,
    url: 'https://www.w3schools.com/html/mov_bbb.mp4', // MP4
    createdAt: new Date('2025-06-01T07:30:00Z'),
    updatedAt: new Date('2025-06-01T07:30:00Z'),
  },
  {
    id: 'dm6',
    documentVersionId: 'v2',
    mediaType: MediaType.TEXT,
    url: 'https://s24.q4cdn.com/216390268/files/doc_downloads/test.pdf', // PDF
    createdAt: new Date('2025-06-01T07:35:00Z'),
    updatedAt: new Date('2025-06-01T07:35:00Z'),
  }
];

export default mockDocumentMedia;