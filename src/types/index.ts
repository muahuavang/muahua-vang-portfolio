/**
 * Type definitions for the portfolio application
 * This file contains all shared interfaces, types, and enums
 */

// ============================================================================
// CORE TYPES
// ============================================================================

/**
 * Theme configuration for the application
 */
export type Theme = 'light' | 'dark';

/**
 * Application environment configuration
 */
export interface AppConfig {
  /** Base URL for API endpoints */
  apiBaseUrl: string;
  /** Current environment (development, production, etc.) */
  environment: string;
  /** Whether analytics are enabled */
  enableAnalytics: boolean;
  /** Whether debug mode is enabled */
  enableDebugMode: boolean;
  /** Google Analytics ID if enabled */
  googleAnalyticsId?: string;
}

// ============================================================================
// COMPONENT PROPS INTERFACES
// ============================================================================

/**
 * Props for the Header component
 */
export interface HeaderProps {
  /** Current theme state */
  isDarkMode: boolean;
  /** Callback to toggle theme */
  onToggleTheme: () => void;
}

/**
 * Props for the Hero component
 */
export interface HeroProps {
  /** Hero title text */
  title: string;
  /** Hero subtitle text */
  subtitle: string;
  /** Hero description text */
  description: string;
  /** Call-to-action button text */
  ctaText: string;
  /** Call-to-action button link */
  ctaLink: string;
}

/**
 * Props for the About component
 */
export interface AboutProps {
  /** Personal introduction text */
  introduction: string;
  /** Personal statistics */
  stats: PersonalStat[];
  /** Personal interests/hobbies */
  interests: string[];
}

/**
 * Props for the Projects component
 */
export interface ProjectsProps {
  /** Array of projects to display */
  projects: Project[];
  /** Whether to show all projects or just featured ones */
  showAll?: boolean;
}

/**
 * Props for the ProjectCard component
 */
export interface ProjectCardProps {
  /** Project data to display */
  project: Project;
  /** Animation delay for staggered animations */
  animationDelay?: number;
}

/**
 * Props for the Contact component
 */
export interface ContactProps {
  /** Contact form submission handler */
  onSubmit: (data: ContactFormData) => Promise<void>;
  /** Whether the form is currently submitting */
  isSubmitting?: boolean;
  /** Contact information to display */
  contactInfo: ContactInfo;
}

/**
 * Props for the Skills component
 */
export interface SkillsProps {
  /** Technical skills to display */
  skills: Skill[];
  /** Skill categories */
  categories: SkillCategory[];
}

// ============================================================================
// DATA INTERFACES
// ============================================================================

/**
 * Personal statistic information
 */
export interface PersonalStat {
  /** Statistic label */
  label: string;
  /** Statistic value */
  value: string | number;
  /** Statistic icon class */
  icon: string;
}

/**
 * Project information
 */
export interface Project {
  /** Unique project identifier */
  id: string;
  /** Project title */
  title: string;
  /** Project description */
  description: string;
  /** Project icon class */
  icon: string;
  /** Project tags/technologies */
  tags: string[];
  /** Live demo link */
  liveLink?: string;
  /** Source code link */
  sourceLink?: string;
  /** Project image URL */
  imageUrl?: string;
  /** Project completion date */
  completedAt?: string;
  /** Project status */
  status: ProjectStatus;
}

/**
 * Project status enumeration
 */
export enum ProjectStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
  PLANNED = 'planned'
}

/**
 * Contact form data
 */
export interface ContactFormData {
  /** User's name */
  name: string;
  /** User's email address */
  email: string;
  /** User's message */
  message: string;
  /** Optional subject line */
  subject?: string;
}

/**
 * Contact information
 */
export interface ContactInfo {
  /** Email address */
  email: string;
  /** Phone number */
  phone: string;
  /** Location */
  location: string;
  /** LinkedIn profile */
  linkedin?: string;
  /** GitHub profile */
  github?: string;
}

/**
 * Skill information
 */
export interface Skill {
  /** Skill name */
  name: string;
  /** Skill proficiency level (1-100) */
  proficiency: number;
  /** Skill category */
  category: string;
  /** Skill icon class */
  icon: string;
  /** Years of experience */
  yearsOfExperience: number;
}

/**
 * Skill category information
 */
export interface SkillCategory {
  /** Category name */
  name: string;
  /** Category description */
  description: string;
  /** Category icon class */
  icon: string;
}

/**
 * Education information
 */
export interface Education {
  /** Institution name */
  institution: string;
  /** Degree title */
  degree: string;
  /** Field of study */
  field: string;
  /** Graduation year */
  graduationYear: number;
  /** GPA if applicable */
  gpa?: number;
  /** Relevant coursework */
  coursework?: string[];
}

/**
 * Competency information
 */
export interface Competency {
  /** Competency name */
  name: string;
  /** Competency description */
  description: string;
  /** Competency level */
  level: CompetencyLevel;
  /** Related skills */
  relatedSkills: string[];
}

/**
 * Competency level enumeration
 */
export enum CompetencyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

// ============================================================================
// API INTERFACES
// ============================================================================

/**
 * Standard API response structure
 */
export interface ApiResponse<T = any> {
  /** Whether the request was successful */
  success: boolean;
  /** Response message */
  message: string;
  /** Response data */
  data?: T;
  /** Error details if applicable */
  errors?: Record<string, string[]>;
  /** Response timestamp */
  timestamp: string;
}

/**
 * Contact form submission response
 */
export interface ContactResponse {
  /** Message ID */
  id: string;
  /** Submission timestamp */
  timestamp: string;
}

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
 * Form field configuration interface
 */
export interface FormFieldConfig {
  /** Field label */
  label: string;
  /** Field placeholder text */
  placeholder: string;
  /** Field type */
  type: 'text' | 'email' | 'textarea';
  /** Whether field is required */
  required: boolean;
  /** Minimum length (optional) */
  minLength?: number;
  /** Maximum length (optional) */
  maxLength?: number;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Make specific properties optional in a type
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties required in a type
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Extract the type of an array element
 */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

/**
 * Component that can be rendered
 */
export type Renderable = React.ReactNode | string | number | boolean | null | undefined;
