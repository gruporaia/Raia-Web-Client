import { COLLECTIONS } from '../config';
import { resolveTenant } from '../core/tenantUtils';
import {
  EVENT_CATEGORY_ICONS_STRINGS,
  MockEvent,
  mockEvents,
} from '../mocks/mockEvents';
import { createPaginatedService } from './createPaginatedService';
import { EventSchema } from './validators';

/**
 * Service for fetching events - initialized lazily to avoid require issues
 */
let _eventService: ReturnType<typeof createPaginatedService<MockEvent>>;

/**
 * Get the event service instance, initializing if necessary
 */
export const getEventService = async () => {
  if (!_eventService) {
    _eventService = createPaginatedService<MockEvent>({
      route: '/events',
      mock: mockEvents,
      collection: COLLECTIONS.EVENTS || 'events',
      schema: EventSchema,
    });
  }
  return _eventService;
};

export type { MockEvent };
export { EVENT_CATEGORY_ICONS_STRINGS };

export interface PaginatedEventResponse {
  events: MockEvent[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

/**
 * Legacy function for backwards compatibility
 * @deprecated Use eventService.list() instead
 */
export const fetchEvents = async (
  page = 1,
  limit = 9,
  tenant?: string,
  language?: string,
  status?: 'upcoming' | 'completed'
): Promise<PaginatedEventResponse> => {
  const currentTenant = tenant || resolveTenant();
  const eventService = await getEventService();
  const response = await eventService.list(
    currentTenant,
    page,
    limit,
    language
  );

  // Filter by status if provided
  let filtered = response.items;
  if (status) {
    filtered = filtered.filter((event) => event.status === status);
  }

  // Recalculate pagination based on filtered results
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedEvents = filtered.slice(startIndex, endIndex);

  const eventsWithIcons = paginatedEvents.map((event) => {
    if (!event.categoryIcon) {
      const iconKey = event.iconType || event.category;
      const icon =
        EVENT_CATEGORY_ICONS_STRINGS[
          iconKey as keyof typeof EVENT_CATEGORY_ICONS_STRINGS
        ];
      return {
        ...event,
        categoryIcon: icon || undefined,
      };
    }
    return event;
  });

  return {
    events: eventsWithIcons,
    totalPages,
    currentPage: page,
    totalItems,
  };
};

/**
 * Legacy function for backwards compatibility
 * @deprecated Use eventService.byId() instead
 */
export const fetchEventById = async (
  id: string,
  tenant?: string,
  language?: string
): Promise<MockEvent> => {
  const currentTenant = tenant || resolveTenant();
  const eventService = await getEventService();
  const event = await eventService.byId(currentTenant, id, language);

  if (!event.categoryIcon) {
    const iconKey = event.iconType || event.category;
    event.categoryIcon =
      EVENT_CATEGORY_ICONS_STRINGS[
        iconKey as keyof typeof EVENT_CATEGORY_ICONS_STRINGS
      ] || undefined;
  }

  return event;
};
