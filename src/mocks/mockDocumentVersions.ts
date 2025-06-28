import { DocumentVersion } from "../types/api";

// Consistent with mockDocuments, mockLanguages, and mockDocumentMedia
const mockDocumentVersions: DocumentVersion[] = [
  // doc1: Walking in Faith (English, French)
  {
    id: 'dv1', // Changed from 'v1' to unique ID
    documentId: 'doc1',
    languageId: 'en',
    title: 'Walking in Faith',
    createdAt: new Date('2025-03-10T09:00:00Z'),
    updatedAt: new Date('2025-03-12T15:00:00Z'),
  },
  {
    id: 'dv2', // Changed from 'v2' to unique ID
    documentId: 'doc1',
    languageId: 'fr',
    title: 'Marcher dans la Foi',
    createdAt: new Date('2025-03-11T09:10:00Z'),
    updatedAt: new Date('2025-03-12T15:10:00Z'),
  },

  // doc2: Sunday Sermon Series (English)
  {
    id: 'dv3', // Changed from 'v1' to unique ID
    documentId: 'doc2',
    languageId: 'en',
    title: 'Sunday Sermon Series',
    createdAt: new Date('2025-04-01T10:30:00Z'),
    updatedAt: new Date('2025-04-02T11:45:00Z'),
  },

  // doc3: Annual Prayer Meeting (English, French, Spanish)
  {
    id: 'dv4', // Changed from 'v1' to unique ID
    documentId: 'doc3',
    languageId: 'en',
    title: 'Annual Prayer Meeting',
    createdAt: new Date('2025-05-05T08:00:00Z'),
    updatedAt: new Date('2025-05-06T09:15:00Z'),
  },
  {
    id: 'dv5', // Changed from 'v2' to unique ID
    documentId: 'doc3',
    languageId: 'fr',
    title: 'Réunion Annuelle de Prière',
    createdAt: new Date('2025-05-05T08:10:00Z'),
    updatedAt: new Date('2025-05-06T09:20:00Z'),
  },
  {
    id: 'dv6', // Changed from 'v3' to unique ID
    documentId: 'doc3',
    languageId: 'es',
    title: 'Reunión Anual de Oración',
    createdAt: new Date('2025-05-05T08:20:00Z'),
    updatedAt: new Date('2025-05-06T09:25:00Z'),
  },

  // doc4: Faith & Fellowship (English, French, Spanish)
  {
    id: 'dv7', // Changed from 'v1' to unique ID
    documentId: 'doc4',
    languageId: 'en',
    title: 'Faith & Fellowship',
    createdAt: new Date('2025-06-01T07:00:00Z'),
    updatedAt: new Date('2025-06-02T12:00:00Z'),
  },
  {
    id: 'dv8', // Changed from 'v2' to unique ID
    documentId: 'doc4',
    languageId: 'fr',
    title: 'Foi et Communion',
    createdAt: new Date('2025-06-01T07:10:00Z'),
    updatedAt: new Date('2025-06-02T12:10:00Z'),
  },
  {
    id: 'dv9', // Changed from 'v3' to unique ID
    documentId: 'doc4',
    languageId: 'es',
    title: 'Fe y Comunión',
    createdAt: new Date('2025-06-01T07:20:00Z'),
    updatedAt: new Date('2025-06-02T12:20:00Z'),
  },
];

export default mockDocumentVersions;