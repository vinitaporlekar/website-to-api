export interface API {
  id: string;
  url: string;
  name: string;
  endpoints: string[];
  createdAt?: string;
  schema?: Record<string, unknown>;
}

export interface GenerateAPIResponse {
  success: boolean;
  api?: API;
  error?: string;
}

export interface APIListResponse {
  apis: API[];
  error?: string;
}