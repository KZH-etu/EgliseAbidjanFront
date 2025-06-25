import { DocumentCategory, Document } from "../types/api";
import { mockTags } from './mockTags';
import { LanguageOption } from "../types/api";

const langEn: LanguageOption = { id: 'en', name: 'English' };
const langFr: LanguageOption = { id: 'fr', name: 'Français' };
const langEs: LanguageOption = { id: 'es', name: 'Español' };

const mockDocuments: Document[] = [
  {
    id: 'doc1',
    globalTitle: 'Walking in Faith',
    createdAt: new Date('2025-03-10T09:00:00Z'),
    updatedAt: new Date('2025-03-12T15:00:00Z'),
    categories: [DocumentCategory.BOOK],
    tags: [mockTags[0]],
    availableLanguages: [langEn, langFr],
    docVersionIds: ['v1', 'v2']
  },
  {
    id: 'doc2',
    globalTitle: 'Sunday Sermon Series',
    createdAt: new Date('2025-04-01T10:30:00Z'),
    updatedAt: new Date('2025-04-02T11:45:00Z'),
    categories: [DocumentCategory.SERMON],
    tags: [mockTags[1], mockTags[2]],
    availableLanguages: [langEn],
    docVersionIds: ['v1']
  },
  {
    id: 'doc3',
    globalTitle: 'Annual Prayer Meeting',
    createdAt: new Date('2025-05-05T08:00:00Z'),
    updatedAt: new Date('2025-05-06T09:15:00Z'),
    categories: [DocumentCategory.EVENT],
    tags: [mockTags[3], mockTags[4]],
    availableLanguages: [langEn],
    docVersionIds: ['v1', 'v2', 'v3']
  },
  {
    id: 'doc4',
    globalTitle: 'Faith & Fellowship',
    createdAt: new Date('2025-06-01T07:00:00Z'),
    updatedAt: new Date('2025-06-02T12:00:00Z'),
    categories: [DocumentCategory.BOOK, DocumentCategory.SERMON],
    tags: [mockTags[0], mockTags[1], mockTags[2]],
    availableLanguages: [langEn, langFr, langEs],
    docVersionIds: ['v1', 'v2']
  }
];

export default mockDocuments;