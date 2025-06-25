// import { SubscriberResponse } from "../types/api";
// import api from "./clientService";
// import { CreateSubscriber, UpdateSubscriber } from "../types/api";

// // get rid of this along with store. replace with hooks

// export const fetchSubscribers = () => api.get<SubscriberResponse[]>('/subscribers');
// export const fetchSubscriber = (id: string) => api.get<SubscriberResponse>(`/subscribers/${id}`);
// export const createSubscriber = (body: CreateSubscriber) => api.post<SubscriberResponse>('/subscribers', body);
// export const updateSubscriber = (id: string, body: UpdateSubscriber) => api.patch<SubscriberResponse>(`/subscribers/${id}`, body);
// export const deleteSubscriber = (id: string) => api.delete(`/subscribers/${id}`);