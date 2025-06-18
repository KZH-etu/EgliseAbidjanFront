import { SubscriberResponseDto } from "../types/subscribers";
import api from "./clientService";
import { CreateSubscriberDto, UpdateSubscriberDto } from "../types/subscribers";

// get rid of this along with store. replace with hooks

export const fetchSubscribers = () => api.get<SubscriberResponseDto[]>('/subscribers');
export const fetchSubscriber = (id: string) => api.get<SubscriberResponseDto>(`/subscribers/${id}`);
export const createSubscriber = (body: CreateSubscriberDto) => api.post<SubscriberResponseDto>('/subscribers', body);
export const updateSubscriber = (id: string, body: UpdateSubscriberDto) => api.patch<SubscriberResponseDto>(`/subscribers/${id}`, body);
export const deleteSubscriber = (id: string) => api.delete(`/subscribers/${id}`);