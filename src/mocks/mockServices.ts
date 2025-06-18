import { Services } from "../types/services";
import mockDocumentMedia from "./mockDocumentMedia";
import mockDocuments from "./mockDocuments";
import mockDocumentVersions from "./mockDocumentVersions";
import { mockLanguageSummaries, mockLanguages } from "./mockLanguages";
import { mockAudioItemView, mockLibraryItems, mockTextItemView, mockVideoItemView } from "./mockLibraryItems";
import mockMetaData from "./mockMetaData";
import { mockTagSummaries, mockTags } from "./mockTags";


const mockServices: Services = {
  documentService: {
    fetchDocuments: async () => (mockDocuments),
    fetchDocument: async () => (mockDocuments[0]), // Return the first document as a mock
    createDocument: async () => {},
    updateDocument: async () => {},
    deleteDocument: async () => {},
    fetchEvents: async () => [],
    fetchMetaByDocument: async () => (mockMetaData[0]), // Return an empty object as a mock
  },
  documentMediaService: {
    fetchAllMedia: async () => (mockDocumentMedia),
    fetchMediaItem: async () => (mockDocumentMedia[0]), // Return the first media item as a mock
    fetchMediaByVersion: async () => (mockDocumentMedia),
    createMedia: async () => {},
    updateMedia: async () => {},
    deleteMedia: async () => {},
  },
  documentVersionsService: {
    fetchAllVersions: async () => (mockDocumentVersions),
    fetchVersion: async () => ({} as any), // Return an empty object as a mock
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
    fetchLanguageSummaries: async () => (mockLanguageSummaries),
    fetchLanguages: async () => (mockLanguages), // Return an empty object as a mock
    createLanguage: async () => {},
    updateLanguage: async () => {},
    deleteLanguage: async () => {},
  },
  tagService: {
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