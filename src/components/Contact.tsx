/**
 * Contact Component
 * 
 * This component provides a functional contact form using EmailJS
 * with form validation and error handling.
 */

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';

// Declare global emailjs object for CDN usage
declare global {
  interface Window {
    emailjs: {
      send: (
        serviceId: string,
        templateId: string,
        templateParams: Record<string, any>,
        publicKey: string
      ) => Promise<any>;
    };
  }
}

// ============================================================================
// TYPES
// ============================================================================

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// ============================================================================
// CONTACT COMPONENT
// ============================================================================

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>();

  // Copy functionality state
  const [copyStatus, setCopyStatus] = useState<{ email: boolean; phone: boolean }>({
    email: false,
    phone: false,
  });

  // Copy to clipboard function
  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(prev => ({ ...prev, [type]: true }));
      
      // Reset copy status after 2 seconds
      setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [type]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // EmailJS credentials
      const serviceId = 'service_zzugue6';
      const templateId = 'template_g1nu38e';
      const publicKey = 'qEc6NdWGsxAcGtd7U';
      
      // Log what we're sending for debugging
      console.log('Sending EmailJS with data:', {
        name: data.name,
        subject: data.subject,
        message: data.message,
      });
      
      await window.emailjs.send(
        serviceId,
        templateId,
        {
          name: data.name,
          subject: data.subject,
          message: data.message,
        },
        publicKey
      );
      reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Contact Me</h2>
        </motion.div>

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
                <button
                  onClick={() => copyToClipboard('muahuavang@gmail.com', 'email')}
                  className={`contact-link copyable ${copyStatus.email ? 'copied' : ''}`}
                  aria-label="Copy email address"
                  title="Click to copy email address"
                >
                  muahuavang@gmail.com
                  {copyStatus.email && (
                    <span className="copy-feedback">
                      <i className="fas fa-check" aria-hidden="true"></i>
                      Copied!
                    </span>
                  )}
                </button>
              </div>
              
              <div className="contact-item">
                <i className="fas fa-phone" aria-hidden="true"></i>
                <button
                  onClick={() => copyToClipboard('608-658-6206', 'phone')}
                  className={`contact-link copyable ${copyStatus.phone ? 'copied' : ''}`}
                  aria-label="Copy phone number"
                  title="Click to copy phone number"
                >
                  608-658-6206
                  {copyStatus.phone && (
                    <span className="copy-feedback">
                      <i className="fas fa-check" aria-hidden="true"></i>
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="contact-form"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format',
                },
              })}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          {/* Subject Field */}
          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              {...register('subject', { required: 'Subject is required' })}
              className={`form-input ${errors.subject ? 'error' : ''}`}
              placeholder="Enter message subject"
            />
            {errors.subject && (
              <span className="error-message">{errors.subject.message}</span>
            )}
          </div>

          {/* Message Field */}
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              {...register('message', { required: 'Message is required' })}
              className={`form-input ${errors.message ? 'error' : ''}`}
              placeholder="Tell me about your project or question"
            />
            {errors.message && (
              <span className="error-message">{errors.message.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {/* Success Message */}
          {isSubmitSuccessful && (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <i className="fas fa-check-circle"></i>
              <span>Message sent successfully! I&apos;ll get back to you soon.</span>
            </motion.div>
          )}
        </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
