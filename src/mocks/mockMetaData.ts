import { DocumentMeta } from "../types/api";
import { EventType } from "../types/api";

const mockMetaData: DocumentMeta[] = [
  {
    id: 'meta1',
    bookMeta: {
      author: 'John Doe',
      publisher: 'Faith Press',
      publishedAt: new Date('2022-05-10'),
      isbn: '978-3-16-148410-0',
      pageCount: 320,
    },
  },
  {
    id: 'meta2',
    sermonMeta: {
      preacher: 'Pastor Jane Smith',
      preachedAt: new Date('2023-01-15'),
      location: 'Main Sanctuary',
    },
  },
  {
    id: 'meta3',
    eventMeta: {
      type: EventType.CONVENTION,
      startTime: new Date('2024-03-20T09:00:00Z'),
      endTime: new Date('2024-03-22T17:00:00Z'),
      location: 'City Conference Center',
    },
  },
  {
    id: 'meta4',
    bookMeta: {
      author: 'Alice Johnson',
      publishedAt: new Date('2021-09-01'),
    },
    sermonMeta: {
      preacher: 'Rev. Mark Lee',
      preachedAt: new Date('2022-11-05'),
    },
    eventMeta: {
      type: EventType.PRAYER,
      startTime: new Date('2023-07-10T18:00:00Z'),
      location: 'Chapel Hall',
    },
  },
];

export default mockMetaData;