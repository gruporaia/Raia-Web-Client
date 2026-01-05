import { z } from 'zod';

/**
 * Base schema for entities with timestamps
 */
export const HasTimestamps = z.object({
  createdAt: z.string().or(z.date()).optional(),
  updatedAt: z.string().or(z.date()).optional(),
});

/**
 * Schema for newsletter subscription emails
 * Validates that the email is properly formatted
 */
export const NewsletterEmailSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

/**
 * Type for newsletter subscription email
 */
export type NewsletterEmail = z.infer<typeof NewsletterEmailSchema>;

/**
 * Schema for project references
 */
export const ProjectReferenceSchema = z.object({
  title: z.string(),
  url: z.string(),
  type: z.enum(['article', 'link']),
});

/**
 * Type for project references
 */
export type ProjectReference = z.infer<typeof ProjectReferenceSchema>;

/**
 * Schema for blog post entities
 */
export const BlogPostSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    body: z.string(),
    date: z.string().optional(),
    author: z.string().optional(),
    categories: z.array(z.string()).optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    categoryIcon: z.string().optional(),
    language: z.string().optional(),
    featured: z.boolean().optional(),
    meta: z.record(z.unknown()).optional(),
  })
  .merge(HasTimestamps);

/**
 * Schema for project entities
 */
export const ProjectSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    body: z.string(),
    image: z.string().optional(),
    category: z.string().optional(),
    categoryIcon: z.string().optional(),
    date: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    github: z.string().optional(),
    website: z.string().optional(),
    featured: z.boolean().optional(),
    references: z.array(ProjectReferenceSchema).optional(),
    language: z.string().optional(),
    excerpt: z.string().optional(),
    meta: z.record(z.unknown()).optional(),
  })
  .merge(HasTimestamps);

/**
 * Type for blog posts parsed from the schema
 */
export type BlogPost = z.infer<typeof BlogPostSchema>;

/**
 * Type for projects parsed from the schema
 */
export type Project = z.infer<typeof ProjectSchema>;

/**
 * Schema for event references
 */
export const EventReferenceSchema = z.object({
  title: z.string(),
  url: z.string(),
  type: z.enum(['article', 'link', 'video']),
});

/**
 * Schema for event authors
 */
export const EventAuthorSchema = z.object({
  name: z.string(),
  role: z.string(),
  image: z.string(),
  bio: z.string().optional(),
  email: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  website: z.string().optional(),
});

/**
 * Schema for initiative tabs
 */
export const InitiativeTabSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string().optional(),
  link: z.string().optional(),
});

/**
 * Schema for event entities
 */
export const EventSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    body: z.string(),
    image: z.string().optional(),
    category: z.enum(['event', 'hackathon', 'fellowship', 'conference']).optional(),
    categoryIcon: z.string().optional(),
    date: z.string(),
    endDate: z.string().optional(),
    status: z.enum(['upcoming', 'completed']),
    location: z.string().optional(),
    featured: z.boolean().optional(),
    references: z.array(EventReferenceSchema).optional(),
    authors: z.array(EventAuthorSchema).optional(),
    language: z.string().optional(),
    excerpt: z.string().optional(),
    initiatives: z.array(InitiativeTabSchema).optional(),
    meta: z.record(z.unknown()).optional(),
    iconType: z.string().optional(),
    videoUrl: z.string().optional(),
  })
  .merge(HasTimestamps);

/**
 * Type for events parsed from the schema
 */
export type Event = z.infer<typeof EventSchema>;
