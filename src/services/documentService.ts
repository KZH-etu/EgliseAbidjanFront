import api from './clientService';
import { CreateDocumentDto, UpdateDocumentDto } from '../types/documents/create-document.dto';
import { Document } from '../types/documents/documents';
import { IDocumentService } from '../types/services';

export class DocumentService implements IDocumentService {
  async fetchDocuments() {
    const res = await api.get<Document[]>('/documents');
    return res.data;
  }

  async fetchDocument(id: string) {
    const res = await api.get<Document>(`/documents/${id}`);
    return res.data;
  }

  async createDocument(body: CreateDocumentDto) {
    api.post<Document>('/documents', body);
  }

  async updateDocument(id: string, body: UpdateDocumentDto) {
    api.patch<Document>(`/documents/${id}`, body);
  }

  async deleteDocument(id: string) {
    api.delete(`/documents/${id}`);
  }
}
