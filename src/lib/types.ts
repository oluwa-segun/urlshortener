export interface Link {
  id: string;
  slug: string;
  longUrl: string;
  createdAt: string;
}

export interface CreateLinkResponse {
  success: boolean;
  data?: Link;
  error?: string;
} 