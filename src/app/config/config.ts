// src/app/config/config.ts
export const API_BASE = 'http://localhost:8080/api';

export const apiUrl = (path: string) =>
  `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
