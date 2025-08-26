/**
 * Contact Component
 * 
 * This component provides a contact form for users to send messages.
 * Features include:
 * - Form validation with real-time feedback
 * - Input sanitization for security
 * - Accessibility features (ARIA labels, error announcements)
 * - Loading states and success/error handling
 * - Responsive design for mobile and desktop
 */

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Utility imports
import { validateContactForm, sanitizeInput } from '../utils/validation';
import { submitContactForm } from '../utils/api';

// Type imports
import { ContactFormData, ContactInfo, ValidationResult, FormFieldConfig } from '../types';

// ============================================================================
// INTERFACES
// ============================================================================

/**
 * Props for the Contact component
 */
interface ContactProps {
  /** Contact information to display */
  contactInfo?: ContactInfo;
  /** Custom form submission handler */
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

/**
 * Form field state interface
 */
interface FieldState {
  /** Field value */
  value: string;
  /** Field error message */
  error: string;
  /** Whether field has been touched */
  touched: boolean;
}

/**
 * Form state interface
 */
interface FormState {
  /** Name field state */
  name: FieldState;
  /** Email field state */
  email: FieldState;
  /** Subject field state */
  subject: FieldState;
  /** Message field state */
  message: FieldState;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Default contact information
 */
const DEFAULT_CONTACT_INFO: ContactInfo = {
  email: 'muahuavang@gmail.com',
  phone: '608-658-6206',
  location: 'Madison, WI',
  linkedin: 'https://linkedin.com/in/muahuavang',
  github: 'https://github.com/muahuavang'
};

/**
 * Animation variants for form elements
 */
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

/**
 * Form field configuration
 */
const FORM_FIELDS: Record<keyof FormState, FormFieldConfig> = {
  name: {
    label: 'Your Name',
    placeholder: 'Enter your full name',
    type: 'text',
    required: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    label: 'Your Email',
    placeholder: 'Enter your email address',
    type: 'email',
    required: true
  },
  subject: {
    label: 'Subject (Optional)',
    placeholder: 'Enter message subject',
    type: 'text',
    required: false,
    minLength: 2,
    maxLength: 100
  },
  message: {
    label: 'Your Message',
    placeholder: 'Enter your message (minimum 10 characters)',
    type: 'textarea',
    required: true,
    minLength: 10,
    maxLength: 1000
  }
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Contact component for user communication
 */
const Contact: React.FC<ContactProps> = ({ 
  contactInfo = DEFAULT_CONTACT_INFO,
  onSubmit 
}) => {
  // ========================================================================
  // STATE MANAGEMENT
  // ========================================================================
  
  /** Form field states */
  const [formState, setFormState] = useState<FormState>({
    name: { value: '', error: '', touched: false },
    email: { value: '', error: '', touched: false },
    subject: { value: '', error: '', touched: false },
    message: { value: '', error: '', touched: false }
  });
  
  /** Form submission state */
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  /** Form submission result */
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  /** Whether form has been submitted successfully */
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // ========================================================================
  // FORM VALIDATION
  // ========================================================================

  /**
   * Validates a single form field
   * @param fieldName - Name of the field to validate
   * @param value - Field value to validate
   * @returns Validation result
   */
  const validateField = useCallback((fieldName: keyof FormState, value: string): string => {
    const field = FORM_FIELDS[fieldName];
    
    // Check required fields
    if (field.required && !value.trim()) {
      return 'This field is required';
    }
    
    // Check minimum length
    if (field.minLength && value.trim().length < field.minLength) {
      return `Must be at least ${field.minLength} characters`;
    }
    
    // Check maximum length
    if (field.maxLength && value.trim().length > field.maxLength) {
      return `Must be no more than ${field.maxLength} characters`;
    }
    
    // Email-specific validation
    if (fieldName === 'email' && value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        return 'Please enter a valid email address';
      }
    }
    
    return ''; // No error
  }, []);

  /**
   * Validates the entire form
   * @returns True if form is valid, false otherwise
   */
  const validateForm = useCallback((): boolean => {
    let isValid = true;
    const newFormState = { ...formState };
    
    // Validate each field
    Object.keys(FORM_FIELDS).forEach((fieldName) => {
      const key = fieldName as keyof FormState;
      const error = validateField(key, formState[key].value);
      
      if (error) {
        isValid = false;
        newFormState[key].error = error;
        newFormState[key].touched = true;
      } else {
        newFormState[key].error = '';
      }
    });
    
    setFormState(newFormState);
    return isValid;
  }, [formState, validateField]);

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  /**
   * Handles input changes for form fields
   * @param fieldName - Name of the field being changed
   * @param value - New field value
   */
  const handleInputChange = useCallback((
    fieldName: keyof FormState,
    value: string
  ): void => {
    setFormState(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value: sanitizeInput(value),
        error: '', // Clear error when user starts typing
        touched: true
      }
    }));
  }, []);

  /**
   * Handles field blur events for validation
   * @param fieldName - Name of the field that lost focus
   */
  const handleFieldBlur = useCallback((fieldName: keyof FormState): void => {
    const field = formState[fieldName];
    const error = validateField(fieldName, field.value);
    
    setFormState(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        error,
        touched: true
      }
    }));
  }, [formState, validateField]);

  /**
   * Handles form submission
   * @param event - Form submission event
   */
  const handleSubmit = useCallback(async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitResult(null);
    
    try {
      // Prepare form data
      const formData: ContactFormData = {
        name: formState.name.value.trim(),
        email: formState.email.value.trim(),
        message: formState.message.value.trim(),
        subject: formState.subject.value.trim() || undefined
      };
      
      // Submit form
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        await submitContactForm(formData);
      }
      
      // Handle success
      setSubmitResult({
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      });
      setIsSubmitted(true);
      
      // Reset form
      setFormState({
        name: { value: '', error: '', touched: false },
        email: { value: '', error: '', touched: false },
        subject: { value: '', error: '', touched: false },
        message: { value: '', error: '', touched: false }
      });
      
    } catch (error) {
      // Handle error
      console.error('Form submission error:', error);
      setSubmitResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formState, validateForm, onSubmit]);

  /**
   * Resets the form to initial state
   */
  const handleReset = useCallback((): void => {
    setFormState({
      name: { value: '', error: '', touched: false },
      email: { value: '', error: '', touched: false },
      subject: { value: '', error: '', touched: false },
      message: { value: '', error: '', touched: false }
    });
    setSubmitResult(null);
    setIsSubmitted(false);
  }, []);

  // ========================================================================
  // EFFECTS
  // ========================================================================

  /**
   * Auto-hide success message after 5 seconds
   */
  useEffect(() => {
    if (submitResult?.success) {
      const timer = setTimeout(() => {
        setSubmitResult(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [submitResult?.success]);

  // ========================================================================
  // RENDER HELPERS
  // ========================================================================

  /**
   * Renders a form field with proper validation and accessibility
   * @param fieldName - Name of the field to render
   * @returns JSX element for the field
   */
  const renderField = (fieldName: keyof FormState): JSX.Element => {
    const field = FORM_FIELDS[fieldName];
    const state = formState[fieldName];
    const fieldId = `contact-${fieldName}`;
    
    return (
      <div className="form-group" key={fieldName}>
        <label htmlFor={fieldId} className="form-label">
          {field.label}
          {field.required && <span className="required">*</span>}
        </label>
        
        {field.type === 'textarea' ? (
          <textarea
            id={fieldId}
            name={fieldName}
            placeholder={field.placeholder}
            value={state.value}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
            onBlur={() => handleFieldBlur(fieldName)}
            rows={4}
            required={field.required}
            minLength={field.minLength}
            maxLength={field.maxLength}
            className={`form-input ${state.error && state.touched ? 'error' : ''}`}
            aria-describedby={state.error && state.touched ? `${fieldId}-error` : undefined}
            aria-invalid={state.error && state.touched ? 'true' : 'false'}
          />
        ) : (
          <input
            id={fieldId}
            name={fieldName}
            type={field.type}
            placeholder={field.placeholder}
            value={state.value}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
            onBlur={() => handleFieldBlur(fieldName)}
            required={field.required}
            minLength={field.minLength}
            maxLength={field.maxLength}
            className={`form-input ${state.error && state.touched ? 'error' : ''}`}
            aria-describedby={state.error && state.touched ? `${fieldId}-error` : undefined}
            aria-invalid={state.error && state.touched ? 'true' : 'false'}
          />
        )}
        
        {/* Error message */}
        {state.error && state.touched && (
          <div 
            id={`${fieldId}-error`}
            className="form-error" 
            role="alert"
            aria-live="polite"
          >
            {state.error}
          </div>
        )}
        
        {/* Character count for textarea */}
        {field.type === 'textarea' && field.maxLength && (
          <div className="char-count">
            {state.value.length} / {field.maxLength}
          </div>
        )}
      </div>
    );
  };

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container">
        <motion.h2 
          id="contact-title"
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Contact Me
        </motion.h2>
        
        <div className="contact-content">
          {/* Contact Information */}
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="contact-info-title">Get In Touch</h3>
            <div className="contact-details">
              <div className="contact-item">
                <i className="fas fa-envelope" aria-hidden="true"></i>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="contact-link"
                  aria-label={`Send email to ${contactInfo.email}`}
                >
                  {contactInfo.email}
                </a>
              </div>
              
              <div className="contact-item">
                <i className="fas fa-phone" aria-hidden="true"></i>
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="contact-link"
                  aria-label={`Call ${contactInfo.phone}`}
                >
                  {contactInfo.phone}
                </a>
              </div>
              
              <div className="contact-item">
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                <span>{contactInfo.location}</span>
              </div>
              
              {contactInfo.linkedin && (
                <div className="contact-item">
                  <i className="fab fa-linkedin" aria-hidden="true"></i>
                  <a 
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                    aria-label="Visit LinkedIn profile"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              )}
              
              {contactInfo.github && (
                <div className="contact-item">
                  <i className="fab fa-github" aria-hidden="true"></i>
                  <a 
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                    aria-label="Visit GitHub profile"
                  >
                    GitHub Profile
                  </a>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            noValidate
          >
            {/* Success/Error Messages */}
            <AnimatePresence>
              {submitResult && (
                <motion.div
                  className={`form-message ${submitResult.success ? 'success' : 'error'}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  role="alert"
                  aria-live="polite"
                >
                  {submitResult.message}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Form Fields */}
            {(Object.keys(FORM_FIELDS) as Array<keyof FormState>).map(renderField)}
            
            {/* Form Actions */}
            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
                aria-describedby={isSubmitting ? 'submitting-status' : undefined}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {isSubmitted && (
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={handleReset}
                >
                  Send Another Message
                </button>
              )}
            </div>
            
            {/* Loading Status */}
            {isSubmitting && (
              <div 
                id="submitting-status"
                className="submitting-status"
                aria-live="polite"
              >
                Submitting your message...
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
