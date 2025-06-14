import React, { createContext, ReactNode, useContext } from 'react';
import { IDocumentMediaService, IDocumentService } from '../types/services';
import { DocumentService } from '../services/documentService';

interface Services {
  documentService: IDocumentService;
  documentMediaService: IDocumentMediaService;
}

const defaultServices: Services = {
  documentService: new DocumentService(),
};

const mockServices: Services = {
  
}

const ServiceContext = createContext<Services>(defaultServices);

interface ServiceProviderProps {
  services?: Partial<Services>;
  children: ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({
  services,
  children,
}) => {
    // Merge default services with provided overrides
  const mergedServices = { ...defaultServices, ...services };
  return (
    <ServiceContext value={mergedServices}>
      {children}
    </ServiceContext>
  );
};

export const useServices = () => useContext(ServiceContext);
