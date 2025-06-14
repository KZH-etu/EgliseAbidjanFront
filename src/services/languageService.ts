import api from "./clientService";
import { CreateLanguageDto, UpdateLanguageDto } from "../types/languages/create-language.dto";
import { LanguageResponseDto } from "../types/languages/languages";

export const fetchLanguages = () => api.get<LanguageResponseDto[]>('/languages');
export const fetchLanguage = (id: string) => api.get<LanguageResponseDto>(`/languages/${id}`);
export const createLanguage = (body: CreateLanguageDto) => api.post<LanguageResponseDto>('/languages', body);
export const updateLanguage = (id: string, body: UpdateLanguageDto) => api.patch<LanguageResponseDto>(`/languages/${id}`, body);
export const deleteLanguage = (id: string) => api.delete(`/languages/${id}`);