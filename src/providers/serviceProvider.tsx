import React, { createContext, ReactNode, useContext } from 'react';
import { IDocumentMediaService, IDocumentService, IDocumentVersionService, ILanguageService } from '../types/services';
// import { DocumentService } from '../services/documentService';
import mockDocuments from '../mocks/mockDocuments';
import mockDocumentMedia from '../mocks/mockDocumentMedia';
import mockDocumentVersions from '../mocks/mockDocumentVersions';
import { mockLanguageSummaries } from '../mocks/mockLanguages';

interface Services {
  documentService: IDocumentService;
  documentMediaService: IDocumentMediaService;
  documentVersionsService: IDocumentVersionService;
  languageService: ILanguageService;
}

// const defaultServices: Services = {
//   documentService: new DocumentService(),
// };

const mockServices: Services = {
  documentService: {
    fetchDocuments: async () => (mockDocuments),
    fetchDocument: async () => (mockDocuments[0]), // Return the first document as a mock
    createDocument: async () => {},
    updateDocument: async () => {},
    deleteDocument: async () => {},
    fetchEvents: async () => [],
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
  },
  languageService: {
    fetchLanguageSummaries: async () => (mockLanguageSummaries),
  },
};

const ServiceContext = createContext<Services>(mockServices);

interface ServiceProviderProps {
  services?: Partial<Services>;
  children: ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({
  services,
  children,
}) => {
    // Merge default services with provided overrides
  const mergedServices = { ...mockServices, ...services };
  return (
    <ServiceContext value={mergedServices}>
      {children}
    </ServiceContext>
  );
};

export const useServices = () => useContext(ServiceContext);
