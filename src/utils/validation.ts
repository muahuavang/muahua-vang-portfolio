/**
 * Validation utility functions for form inputs and data
 * Provides comprehensive validation for user inputs with meaningful error messages
 */

import { ContactFormData } from '../types';

// ============================================================================
// VALIDATION CONSTANTS
// ============================================================================

/**
 * Regular expressions for validation
 */
export const VALIDATION_REGEX = {
  /** Email validation pattern */
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  /** Phone number validation pattern (US format) */
  PHONE: /^(\+1\s?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
  /** URL validation pattern */
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  /** Name validation pattern (letters, spaces, hyphens, apostrophes) */
  NAME: /^[a-zA-Z\s\-']{2,50}$/,
  /** Message validation pattern (minimum 10 characters, maximum 1000) */
  MESSAGE: /^.{10,1000}$/
} as const;

/**
 * Validation error messages
 */
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_URL: 'Please enter a valid URL',
  INVALID_NAME: 'Name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes',
  MESSAGE_TOO_SHORT: 'Message must be at least 10 characters long',
  MESSAGE_TOO_LONG: 'Message must be no more than 1000 characters long',
  INVALID_LENGTH: (min: number, max: number) => `Must be between ${min} and ${max} characters`,
  INVALID_FORMAT: 'Invalid format'
} as const;

// ============================================================================
// CORE VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validates if a value is not empty
 * @param value - The value to validate
 * @returns True if valid, false otherwise
 */
export const isRequired = (value: string | number | null | undefined): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Validates email format
 * @param email - Email address to validate
 * @returns True if valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  return VALIDATION_REGEX.EMAIL.test(email.trim());
};

/**
 * Validates phone number format
 * @param phone - Phone number to validate
 * @returns True if valid, false otherwise
 */
export const isValidPhone = (phone: string): boolean => {
  return VALIDATION_REGEX.PHONE.test(phone.trim());
};

/**
 * Validates URL format
 * @param url - URL to validate
 * @returns True if valid, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  return VALIDATION_REGEX.URL.test(url.trim());
};

/**
 * Validates name format
 * @param name - Name to validate
 * @returns True if valid, false otherwise
 */
export const isValidName = (name: string): boolean => {
  return VALIDATION_REGEX.NAME.test(name.trim());
};

/**
 * Validates string length
 * @param value - String to validate
 * @param min - Minimum length
 * @param max - Maximum length
 * @returns True if valid, false otherwise
 */
export const isValidLength = (value: string, min: number, max: number): boolean => {
  const length = value.trim().length;
  return length >= min && length <= max;
};

/**
 * Validates message content
 * @param message - Message to validate
 * @returns True if valid, false otherwise
 */
export const isValidMessage = (message: string): boolean => {
  return VALIDATION_REGEX.MESSAGE.test(message.trim());
};

// ============================================================================
// FORM VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validation result interface
 */
export interface ValidationResult {
  /** Whether the validation passed */
  isValid: boolean;
  /** Array of error messages */
  errors: string[];
}

/**
 * Validates contact form data
 * @param data - Contact form data to validate
 * @returns Validation result with errors if any
 */
export const validateContactForm = (data: ContactFormData): ValidationResult => {
  const errors: string[] = [];

  // Validate name
  if (!isRequired(data.name)) {
    errors.push(VALIDATION_MESSAGES.REQUIRED);
  } else if (!isValidName(data.name)) {
    errors.push(VALIDATION_MESSAGES.INVALID_NAME);
  }

  // Validate email
  if (!isRequired(data.email)) {
    errors.push(VALIDATION_MESSAGES.REQUIRED);
  } else if (!isValidEmail(data.email)) {
    errors.push(VALIDATION_MESSAGES.INVALID_EMAIL);
  }

  // Validate message
  if (!isRequired(data.message)) {
    errors.push(VALIDATION_MESSAGES.REQUIRED);
  } else if (!isValidMessage(data.message)) {
    if (data.message.trim().length < 10) {
      errors.push(VALIDATION_MESSAGES.MESSAGE_TOO_SHORT);
    } else {
      errors.push(VALIDATION_MESSAGES.MESSAGE_TOO_LONG);
    }
  }

  // Validate subject if provided
  if (data.subject && !isValidLength(data.subject, 2, 100)) {
    errors.push(VALIDATION_MESSAGES.INVALID_LENGTH(2, 100));
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validates a single form field
 * @param fieldName - Name of the field being validated
 * @param value - Value to validate
 * @param validators - Array of validation functions to apply
 * @returns Validation result for the field
 */
export const validateField = (
  fieldName: string,
  value: string,
  validators: Array<(value: string) => boolean>
): ValidationResult => {
  const errors: string[] = [];

  for (const validator of validators) {
    if (!validator(value)) {
      // Map field name to appropriate error message
      switch (fieldName) {
        case 'email':
          errors.push(VALIDATION_MESSAGES.INVALID_EMAIL);
          break;
        case 'phone':
          errors.push(VALIDATION_MESSAGES.INVALID_PHONE);
          break;
        case 'name':
          errors.push(VALIDATION_MESSAGES.INVALID_NAME);
          break;
        case 'message':
          if (value.trim().length < 10) {
            errors.push(VALIDATION_MESSAGES.MESSAGE_TOO_SHORT);
          } else {
            errors.push(VALIDATION_MESSAGES.MESSAGE_TOO_LONG);
          }
          break;
        default:
          errors.push(VALIDATION_MESSAGES.INVALID_FORMAT);
      }
      break; // Stop at first validation error
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// ============================================================================
// SANITIZATION FUNCTIONS
// ============================================================================

/**
 * Sanitizes user input to prevent XSS attacks
 * @param input - Raw user input
 * @returns Sanitized input
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

/**
 * Sanitizes HTML content for safe display
 * @param html - HTML content to sanitize
 * @returns Sanitized HTML string
 */
export const sanitizeHtml = (html: string): string => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Debounces validation to avoid excessive validation calls
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Creates a validation function that can be used with form libraries
 * @param validators - Array of validation functions
 * @returns Function that returns error message or undefined
 */
export const createValidator = (
  validators: Array<(value: string) => boolean>
) => {
  return (value: string): string | undefined => {
    for (const validator of validators) {
      if (!validator(value)) {
        return VALIDATION_MESSAGES.INVALID_FORMAT;
      }
    }
    return undefined;
  };
};
