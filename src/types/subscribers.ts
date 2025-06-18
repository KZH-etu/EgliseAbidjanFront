export interface SubscriberResponseDto {
  id: string;
  email: string;
  subscribedAt: Date;
  isActive: boolean;
}
export interface CreateSubscriberDto {
    email: string;
}

export interface UpdateSubscriberDto {
    isActive?: boolean;
}