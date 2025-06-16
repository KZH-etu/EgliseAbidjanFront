import { DocumentVersionResponseDto } from "../types/document-versions/document-versions";

// Example mock data for DocumentVersionResponseDto
const mockDocumentVersions: DocumentVersionResponseDto[] = [
  {
    id: '1gdzygu54322v',
    documentId: 'doc-001',
    language: 'Français',
    title: 'Titre en Français',
    createdAt: new Date('2024-01-01T10:00:00Z'),
    updatedAt: new Date('2024-01-02T12:00:00Z'),
  },
  {
    id: '2vdgguRTD263',
    documentId: 'doc-002',
    language: 'Anglais',
    title: 'Title in English',
    createdAt: new Date('2024-02-01T09:30:00Z'),
    updatedAt: new Date('2024-02-03T15:45:00Z'),
  },
  {
    id: '3zgdvvzbdkzbz',
    documentId: 'doc-003',
    language: 'Espagnol',
    title: 'Título en Español',
    createdAt: new Date('2024-03-10T08:15:00Z'),
    updatedAt: new Date('2024-03-12T11:20:00Z'),
  },
  {
    id: '4effefzgf',
    documentId: 'doc-004',
    language: 'Allemand',
    title: 'Titel auf Deutsch',
    createdAt: new Date('2024-04-05T14:00:00Z'),
    updatedAt: new Date('2024-04-06T16:30:00Z'),
  },
  {
    id: '5efeee',
    documentId: 'doc-005',
    language: 'Italien',
    title: 'Titolo in Italiano',
    createdAt: new Date('2024-05-12T11:45:00Z'),
    updatedAt: new Date('2024-05-13T13:50:00Z'),
  },
  {
    id: '6iehzgyzc69b',
    documentId: 'doc-006',
    language: 'Portugais',
    title: 'Título em Português',
    createdAt: new Date('2024-06-18T07:20:00Z'),
    updatedAt: new Date('2024-06-19T09:25:00Z'),
  },
  {
    id: '7YCH51781ffef',
    documentId: 'doc-007',
    language: 'Néerlandais',
    title: 'Titel in het Nederlands',
    createdAt: new Date('2024-07-22T17:10:00Z'),
    updatedAt: new Date('2024-07-23T18:15:00Z'),
  },
  {
    id: '8YYFYH645vdzdd',
    documentId: 'doc-008',
    language: 'Russe',
    title: 'Заголовок на русском',
    createdAt: new Date('2024-08-30T12:00:00Z'),
    updatedAt: new Date('2024-08-31T14:05:00Z'),
  },
];

export default mockDocumentVersions;