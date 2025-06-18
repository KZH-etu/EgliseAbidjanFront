import React, { createContext, ReactNode, useContext } from 'react';
import { Services } from '../types/services';
import mockServices from '../mocks/mockServices';

// const defaultServices: Services = {
//   documentService: new DocumentService(),
// };


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
