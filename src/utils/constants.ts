// Application constants
export const APP_CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  DEFAULT_PAGE_SIZE: 20,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  SUPPORTED_AUDIO_TYPES: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  SUPPORTED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/ogg'],
} as const;

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  LIBRARY: '/library',
  EVENTS: '/events',
  CONTACT: '/contact',
  WEBRADIO: '/webradio',
  WEBTV: '/webtv',
  ADMIN: '/admin',
  LOGIN: '/login',
} as const;

export const MEDIA_TYPES = {
  TEXT: 'TEXT',
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO',
} as const;

export const DOCUMENT_CATEGORIES = {
  BOOK: 'BOOK',
  SERMON: 'SERMON',
  EVENT: 'EVENT',
} as const;