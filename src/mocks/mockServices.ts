import { Services } from "../types/services";
import mockDocumentMedia from "./mockDocumentMedia";
import mockDocuments from "./mockDocuments";
import mockDocumentVersions from "./mockDocumentVersions";
import { mockLanguageSummaries, mockLanguages } from "./mockLanguages";
import { mockAudioItemView, mockLibraryItems, mockTextItemView, mockVideoItemView } from "./mockLibraryItems";
import mockMetaData from "./mockMetaData";
import { mockTagSummaries, mockTags } from "./mockTags";
import { QueryState, PaginatedResponse } from "../types/common";

// Helper function to simulate backend filtering and pagination
function simulateQuery<T>(
  items: T[],
  params: QueryState,
  searchFields: (keyof T)[] = []
): PaginatedResponse<T> {
  let filtered = [...items];

  // Apply search filter
  if (params.search && searchFields.length > 0) {
    const searchTerm = params.search.toLowerCase();
    filtered = filtered.filter(item =>
      searchFields.some(field => {
        const value = item[field];
        return value && String(value).toLowerCase().includes(searchTerm);
      })
    );
  }

  // Apply sorting
  if (params.sortBy) {
    filtered.sort((a, b) => {
      const aVal = a[params.sortBy as keyof T];
      const bVal = b[params.sortBy as keyof T];
      
      if (aVal < bVal) return params.sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return params.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Apply pagination
  const page = params.page || 1;
  const limit = params.limit || 20;
  const offset = (page - 1) * limit;
  const paginatedItems = filtered.slice(offset, offset + limit);
  
  const totalPages = Math.ceil(filtered.length / limit);

  return {
    data: paginatedItems,
    success: true,
    pagination: {
      total: filtered.length,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

const mockServices: Services = {
  documentService: {
    // New query method
    queryDocuments: async (params: QueryState) => {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      return simulateQuery(mockDocuments, params, ['id', 'globalTitle']);
    },
    fetchDocuments: async () => (mockDocuments),
    fetchDocument: async () => (mockDocuments[0]),
    createDocument: async () => {},
    updateDocument: async () => {},
    deleteDocument: async () => {},
    fetchMetaByDocument: async () => (mockMetaData[0]),
  },
  
  documentMediaService: {
    // New query method
    queryMedia: async (params: QueryState) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return simulateQuery(mockDocumentMedia, params, ['id', 'documentVersionId', 'url']);
    },
    fetchAllMedia: async () => (mockDocumentMedia),
    fetchMediaItem: async () => (mockDocumentMedia[0]),
    fetchMediaByVersion: async () => (mockDocumentMedia),
    createMedia: async () => {},
    updateMedia: async () => {},
    deleteMedia: async () => {},
  },
  
  documentVersionsService: {
    // New query method
    queryVersions: async (params: QueryState) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return simulateQuery(mockDocumentVersions, params, ['id', 'documentId', 'title']);
    },
    fetchAllVersions: async () => (mockDocumentVersions),
    fetchVersion: async () => ({} as any),
    fetchVersionsByDocument: async () => (mockDocumentVersions),
    createVersion: async () => {},
    updateVersion: async () => {},
    deleteVersion: async () => {},
    searchVersions: async (query: string) => {
      return mockDocumentVersions.filter(version => [version.id, version.title].some(field =>
        field.toLowerCase().includes(query.toLowerCase())));
    },
  },
  
  languageService: {
    // New query method
    queryLanguages: async (params: QueryState) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return simulateQuery(mockLanguages, params, ['id', 'name', 'countryOfOrigin']);
    },
    fetchLanguageSummaries: async () => (mockLanguageSummaries),
    fetchLanguages: async () => (mockLanguages),
    createLanguage: async () => {},
    updateLanguage: async () => {},
    deleteLanguage: async () => {},
  },
  
  tagService: {
    // New query method
    queryTags: async (params: QueryState) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return simulateQuery(mockTags, params, ['id']);
    },
    searchTags: async (query: string) => {
      return mockTagSummaries.filter(tag => [tag.id, tag.title].some(field => field &&
        field.toLowerCase().includes(query.toLowerCase())));
    },
    fetchTagSummaries: async () => (mockTagSummaries),
    fetchTags: async () => (mockTags),
    createTag: async () => {},
    updateTag: async () => {},
    deleteTag: async () => {},
  },
  
  mediaLibraryService: {
    // New query method
    queryMediaCards: async (params: QueryState & { type?: 'text' | 'audio' | 'video' }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Convert library items to basic cards for this mock
      const basicCards = mockLibraryItems.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        categories: item.categories,
        mediaType: item.mediaType,
        tags: item.tags,
        language: item.language,
        thumbnailUrl: undefined,
        duration: undefined,
        createdAt: new Date(),
        primaryPerson: item.keyPersons[0],
        location: undefined,
        recordedAt: undefined,
      }));
      
      return simulateQuery(basicCards, params, ['title', 'description']);
    },
    fetchItems: async () => (mockLibraryItems),
    fetchView: async (_id, _lang, type) => {
      switch (type) {
        case 'audio':
          return mockAudioItemView;
        case 'video':
          return mockVideoItemView;
        case 'text':
          return mockTextItemView;
        default:
          return {} as any;
      }
    },
  },
};

export default mockServices;