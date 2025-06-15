// src/mocks/mockDocuments.ts
import { Document, DocumentCategory } from '../types/documents/documents';
import { Tag } from '../types/tags/tags';
import { BookMetadata, SermonMetadata, EventMetadata } from '../types/documents/documents';

// Example Tags
const tag1: Tag = {
  id: 'tag1',
  createdAt: new Date('2025-01-01T10:00:00Z'),
  updatedAt: new Date('2025-02-01T12:00:00Z'),
  translations: [
    { language: 'en', title: 'Faith' },
    { language: 'fr', title: 'Foi' }
  ]
};
const tag2: Tag = {
  id: 'tag2',
  createdAt: new Date('2025-01-05T11:00:00Z'),
  updatedAt: new Date('2025-02-05T13:30:00Z'),
  translations: [
    { language: 'en', title: 'Blessing' },
    { language: 'es', title: 'Bendición' }
  ]
};

const mockDocuments: Document[] = [
  {
    id: 'doc1',
    globalTitle: 'Walking in Faith',
    createdAt: new Date('2025-03-10T09:00:00Z'),
    updatedAt: new Date('2025-03-12T15:00:00Z'),
    categories: [DocumentCategory.BOOK],
    versions: [
      {
        id: 'ver1',
        documentId: 'doc1',
        languageId: 'en',
        title: 'Walking in Faith (EN)',
        description: 'An English introduction',
        publishedAt: new Date('2025-03-11T08:00:00Z')
      },
      {
        id: 'ver2',
        documentId: 'doc1',
        languageId: 'fr',
        title: 'Marcher dans la Foi',
        description: 'Version française',
        publishedAt: new Date('2025-03-11T09:00:00Z')
      }
    ],
    bookMeta: {
      id: 'doc1',
      author: 'Jane Doe',
      publisher: 'Good News Press',
      publishedAt: new Date('2025-02-20T00:00:00Z'),
      isbn: '978-1234567890',
      pageCount: 200
    } as BookMetadata,
    tags: [tag1]
  },
  {
    id: 'doc2',
    globalTitle: 'Sunday Sermon Series',
    createdAt: new Date('2025-04-01T10:30:00Z'),
    updatedAt: new Date('2025-04-02T11:45:00Z'),
    categories: [DocumentCategory.SERMON],
    versions: [
      {
        id: 'ver3',
        documentId: 'doc2',
        languageId: 'en',
        title: 'Sunday Sermon (EN)',
        description: 'Weekly message',
        publishedAt: new Date('2025-04-01T10:00:00Z')
      }
    ],
    sermonMeta: {
      id: 'doc2',
      preacher: 'Rev. John Smith',
      preachedAt: new Date('2025-04-01T10:00:00Z'),
      location: 'Main Sanctuary'
    } as SermonMetadata,
    tags: [tag1, tag2]
  },
  {
    id: 'doc3',
    globalTitle: 'Annual Prayer Meeting',
    createdAt: new Date('2025-05-05T08:00:00Z'),
    updatedAt: new Date('2025-05-06T09:15:00Z'),
    categories: [DocumentCategory.EVENT],
    versions: [
      {
        id: 'ver4',
        documentId: 'doc3',
        languageId: 'en',
        title: 'Prayer Meeting (EN)',
        description: 'Gathering for prayer',
        publishedAt: new Date('2025-05-05T08:00:00Z')
      }
    ],
    eventMeta: {
      id: 'doc3',
      type: 'PRAYER',
      startTime: new Date('2025-05-10T18:00:00Z'),
      endTime: new Date('2025-05-10T20:00:00Z'),
      location: 'Chapel Hall'
    } as EventMetadata,
    tags: [tag2]
  },
  // Combined categories example
  {
    id: 'doc4',
    globalTitle: 'Faith & Fellowship',
    createdAt: new Date('2025-06-01T07:00:00Z'),
    updatedAt: new Date('2025-06-02T12:00:00Z'),
    categories: [DocumentCategory.BOOK, DocumentCategory.SERMON],
    versions: [
      {
        id: 'ver5',
        documentId: 'doc4',
        languageId: 'en',
        title: 'Faith & Fellowship (EN)',
        description: 'Combined insights',
        publishedAt: new Date('2025-06-01T07:00:00Z')
      }
    ],
    bookMeta: {
      id: 'doc4',
      author: 'Alice Johnson',
      publisher: 'Church Publications',
      publishedAt: new Date('2025-05-20T00:00:00Z'),
      isbn: '978-0987654321',
      pageCount: 120
    } as BookMetadata,
    sermonMeta: {
      id: 'doc4',
      preacher: 'Pastor Lee',
      preachedAt: new Date('2025-06-01T07:00:00Z')
    } as SermonMetadata,
    tags: [tag1]
  }
];

export default mockDocuments;