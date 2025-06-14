import { DocumentMediaResponseDto, MediaType } from "../types/document-media/document-media";

export const mockDocumentMedia: DocumentMediaResponseDto[] = [
  {
    id: 'dm1',
    documentVersionId: 'ver1',
    mediaType: MediaType.TEXT,
    url: 'https://example.com/docs/walking_in_faith_en.pdf',
    createdAt: new Date('2025-03-11T08:15:00Z'),
    updatedAt: new Date('2025-03-11T08:15:00Z'),
  },
  {
    id: 'dm2',
    documentVersionId: 'ver2',
    mediaType: MediaType.TEXT,
    url: 'https://example.com/docs/marcher_dans_la_foi_fr.pdf',
    createdAt: new Date('2025-03-11T09:10:00Z'),
    updatedAt: new Date('2025-03-11T09:10:00Z'),
  },
  {
    id: 'dm3',
    documentVersionId: 'ver3',
    mediaType: MediaType.AUDIO,
    url: 'https://example.com/audio/sunday_sermon_en.mp3',
    createdAt: new Date('2025-04-01T10:05:00Z'),
    updatedAt: new Date('2025-04-01T10:05:00Z'),
  },
  {
    id: 'dm4',
    documentVersionId: 'ver4',
    mediaType: MediaType.AUDIO,
    url: 'https://example.com/audio/prayer_meeting_en.mp3',
    createdAt: new Date('2025-05-05T08:20:00Z'),
    updatedAt: new Date('2025-05-05T08:20:00Z'),
  },
  {
    id: 'dm5',
    documentVersionId: 'ver5',
    mediaType: MediaType.VIDEO,
    url: 'https://youtube.com/watch?v=abcd1234',
    createdAt: new Date('2025-06-01T07:30:00Z'),
    updatedAt: new Date('2025-06-01T07:30:00Z'),
  },
  {
    id: 'dm6',
    documentVersionId: 'ver5',
    mediaType: MediaType.TEXT,
    url: 'https://example.com/docs/faith_and_fellowship_en.pdf',
    createdAt: new Date('2025-06-01T07:35:00Z'),
    updatedAt: new Date('2025-06-01T07:35:00Z'),
  }
];
