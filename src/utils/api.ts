/**
 * API utility functions for making HTTP requests
 * Provides standardized API communication with proper error handling and response formatting
 */

import { ApiResponse, ContactFormData, ContactResponse } from '../types';

// ============================================================================
// API CONFIGURATION
// ============================================================================

/**
 * API configuration constants
 */
export const API_CONFIG = {
  /** Base URL for API endpoints */
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  /** Default request timeout in milliseconds */
  TIMEOUT: 10000,
  /** Maximum retry attempts for failed requests */
  MAX_RETRIES: 3,
  /** Retry delay in milliseconds */
  RETRY_DELAY: 1000
} as const;

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
} as const;

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * Custom API error class
 */
export class ApiError extends Error {
  public status: number;
  public statusText: string;
  public data?: any;

  constructor(message: string, status: number, statusText: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

/**
 * Network error class for connection issues
 */
export class NetworkError extends Error {
  constructor(message: string = 'Network error occurred') {
    super(message);
    this.name = 'NetworkError';
  }
}

/**
 * Validation error class for form validation failures
 */
export class ValidationError extends Error {
  public errors: Record<string, string[]>;

  constructor(message: string, errors: Record<string, string[]>) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

// ============================================================================
// CORE API FUNCTIONS
// ============================================================================

/**
 * Makes an HTTP request with proper error handling and retry logic
 * @param url - API endpoint URL
 * @param options - Request options
 * @param retryCount - Current retry attempt
 * @returns Promise with response data
 */
export const makeRequest = async <T = any>(
  url: string,
  options: RequestInit = {},
  retryCount: number = 0
): Promise<T> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        response.statusText,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    // Handle abort (timeout)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new NetworkError('Request timeout');
    }

    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new NetworkError('Network connection failed');
    }

    // Re-throw API errors
    if (error instanceof ApiError) {
      throw error;
    }

    // Retry logic for server errors
    if (retryCount < API_CONFIG.MAX_RETRIES && 
        (error instanceof ApiError && error.status >= 500)) {
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY * (retryCount + 1)));
      return makeRequest(url, options, retryCount + 1);
    }

    // Re-throw other errors
    throw error;
  }
};

/**
 * Makes a GET request to the specified endpoint
 * @param endpoint - API endpoint path
 * @param params - Query parameters
 * @returns Promise with response data
 */
export const apiGet = async <T = any>(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): Promise<T> => {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return makeRequest<T>(url.toString(), { method: 'GET' });
};

/**
 * Makes a POST request to the specified endpoint
 * @param endpoint - API endpoint path
 * @param data - Request body data
 * @returns Promise with response data
 */
export const apiPost = async <T = any>(
  endpoint: string,
  data: any
): Promise<T> => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  return makeRequest<T>(url, {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

/**
 * Makes a PUT request to the specified endpoint
 * @param endpoint - API endpoint path
 * @param data - Request body data
 * @returns Promise with response data
 */
export const apiPut = async <T = any>(
  endpoint: string,
  data: any
): Promise<T> => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  return makeRequest<T>(url, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

/**
 * Makes a DELETE request to the specified endpoint
 * @param endpoint - API endpoint path
 * @returns Promise with response data
 */
export const apiDelete = async <T = any>(endpoint: string): Promise<T> => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  return makeRequest<T>(url, { method: 'DELETE' });
};

// ============================================================================
// SPECIFIC API ENDPOINTS
// ============================================================================

/**
 * Submits a contact form message
 * @param formData - Contact form data
 * @returns Promise with submission response
 */
export const submitContactForm = async (
  formData: ContactFormData
): Promise<ApiResponse<ContactResponse>> => {
  try {
    const response = await apiPost<ApiResponse<ContactResponse>>('/contact', formData);
    
    if (!response.success) {
      throw new ValidationError(response.message, response.errors || {});
    }
    
    return response;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    
    // Re-throw as generic API error
    throw new ApiError(
      'Failed to submit contact form',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Internal Server Error'
    );
  }
};

/**
 * Fetches projects data
 * @param limit - Maximum number of projects to return
 * @param category - Optional category filter
 * @returns Promise with projects data
 */
export const fetchProjects = async (
  limit?: number,
  category?: string
): Promise<ApiResponse<any[]>> => {
  const params: Record<string, string | number> = {};
  
  if (limit) params.limit = limit;
  if (category) params.category = category;
  
  return apiGet<ApiResponse<any[]>>('/projects', params);
};

/**
 * Fetches skills data
 * @param category - Optional category filter
 * @returns Promise with skills data
 */
export const fetchSkills = async (
  category?: string
): Promise<ApiResponse<any[]>> => {
  const params: Record<string, string> = {};
  
  if (category) params.category = category;
  
  return apiGet<ApiResponse<any[]>>('/skills', params);
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Checks if the API is available
 * @returns Promise indicating API availability
 */
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    await apiGet('/health');
    return true;
  } catch {
    return false;
  }
};

/**
 * Creates a full API URL
 * @param endpoint - API endpoint path
 * @returns Full API URL
 */
export const createApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

/**
 * Logs API errors for debugging
 * @param error - Error to log
 * @param context - Additional context information
 */
export const logApiError = (error: Error, context?: Record<string, any>): void => {
  if (process.env.NODE_ENV === 'development') {
    console.error('API Error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      context
    });
  }
  
  // In production, you might want to send this to an error tracking service
  // like Sentry or LogRocket
};
