import { http, HttpResponse } from 'msw';

import { MockEvent } from '../types/eventTypes';
import conference2025Content from './events/content/conference-2025.json';
import hackathonRaiaMonks from './events/content/hackathon-raia-monks.json';
import llmSpringSchoolContent from './events/content/llm-spring-school-2025.json';
import eventsEn from './events/events-en.json';
import eventsEs from './events/events-es.json';
import eventsPt from './events/events-pt.json';

export type { MockEvent };

const contentMap: Record<string, Record<string, string>> = {
  '1': conference2025Content,
  '2': llmSpringSchoolContent,
  '3': hackathonRaiaMonks,
};

function addContentToEvents(events: MockEvent[]): MockEvent[] {
  return events.map((event) => ({
    ...event,
    body: contentMap[event.id]?.[event.language || 'pt'] || '',
  }));
}

export const mockEventsPt: MockEvent[] = addContentToEvents(
  eventsPt as MockEvent[]
);
export const mockEventsEn: MockEvent[] = addContentToEvents(
  eventsEn as MockEvent[]
);
export const mockEventsEs: MockEvent[] = addContentToEvents(
  eventsEs as MockEvent[]
);

export const mockEvents: MockEvent[] = [
  ...mockEventsPt,
  ...mockEventsEn,
  ...mockEventsEs,
];

export const eventHandlers = [
  http.get('/api/events', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '9');
    const lang = url.searchParams.get('lang') || 'pt';
    const status = url.searchParams.get('status'); // 'upcoming' or 'completed'

    // Filter events by language
    let filteredEvents = mockEvents.filter((e) => e.language === lang);

    // Filter by status if provided
    if (status) {
      filteredEvents = filteredEvents.filter((e) => e.status === status);
    }

    const totalItems = filteredEvents.length;
    const totalPages = Math.ceil(totalItems / limit);

    if (page < 1 || page > totalPages) {
      return HttpResponse.json(
        { error: 'Invalid page number' },
        { status: 400 }
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

    return HttpResponse.json({
      items: paginatedEvents,
      totalPages,
      currentPage: page,
      totalItems,
    });
  }),

  http.get('/api/events/:id', ({ params }) => {
    const { id } = params;
    const event = mockEvents.find((e) => e.id === id);

    if (!event) {
      return HttpResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return HttpResponse.json(event);
  }),
];

export const EVENT_CATEGORY_ICONS_STRINGS = {
  event: 'EventIcon',
  hackathon: 'CodeIcon',
  fellowship: 'GroupsIcon',
  conference: 'PresentationIcon',
};
