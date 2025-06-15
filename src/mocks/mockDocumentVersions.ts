import { DocumentVersionResponseDto } from "../types/document-versions/document-versions";

// Example mock data for DocumentVersionResponseDto
const mockDocumentVersions: DocumentVersionResponseDto[] = [
  {
    id: '1',
    documentId: 'doc-001',
    language: 'Français',
    title: 'Titre en Français',
    createdAt: new Date('2024-01-01T10:00:00Z'),
    updatedAt: new Date('2024-01-02T12:00:00Z'),
  },
  {
    id: '2',
    documentId: 'doc-002',
    language: 'Anglais',
    title: 'Title in English',
    createdAt: new Date('2024-02-01T09:30:00Z'),
    updatedAt: new Date('2024-02-03T15:45:00Z'),
  },
  {
    id: '3',
    documentId: 'doc-003',
    language: 'Espagnol',
    title: 'Título en Español',
    createdAt: new Date('2024-03-10T08:15:00Z'),
    updatedAt: new Date('2024-03-12T11:20:00Z'),
  },
];

export default mockDocumentVersions;