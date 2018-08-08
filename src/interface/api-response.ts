export interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
  status?: number;
  errors: [{ field: string, group?: string, message: string }]
}
