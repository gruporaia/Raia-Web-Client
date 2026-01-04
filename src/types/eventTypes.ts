/**
 * Event Types and Interfaces
 */

export type EventStatus = 'upcoming' | 'completed';
export type EventCategory = 'event' | 'hackathon' | 'fellowship' | 'conference';

export interface InitiativeTab {
  id: string;
  title: string;
  description: string;
  date?: string;
  link?: string;
}

export interface EventReference {
  title: string;
  url: string;
  type: 'article' | 'link' | 'video';
}

export interface EventAuthor {
  name: string;
  role: string;
  image: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface MockEvent {
  id: string;
  title: string;
  description: string;
  body: string;
  image?: string;
  category?: EventCategory;
  categoryIcon?: string;
  date: string;
  endDate?: string;
  status: EventStatus;
  location?: string;
  featured?: boolean;
  references?: EventReference[];
  authors?: EventAuthor[];
  language?: string;
  excerpt?: string;
  initiatives?: InitiativeTab[];
  meta?: {
    description?: string;
    participants?: number;
    speakers?: number;
    [key: string]: unknown;
  };
  iconType?: string;
}

export interface Event extends MockEvent {}

export interface PaginatedEventResponse {
  events: MockEvent[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}
