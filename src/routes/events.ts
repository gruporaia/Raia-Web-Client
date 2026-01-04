import { DynamicRoute, PaginationParams, RouteObject } from './types';

interface EventDetailParams {
  slug?: string;
  [key: string]: string | number | undefined;
}

const EVENTS_ROUTES = {
  ROOT: {
    path: '/eventos',
    label: 'Events',
    labelKey: { namespace: 'navigation', key: 'menu.events' },
    description: 'Explore our events',
    descriptionKey: { namespace: 'common', key: 'meta.events' },
    translationNamespace: 'navigation',
  } as RouteObject,

  LIST: {
    path: '/eventos/pagina/1',
    label: 'Events',
    labelKey: { namespace: 'navigation', key: 'menu.events' },
    description: 'Explore our events',
    descriptionKey: { namespace: 'common', key: 'meta.events' },
    translationNamespace: 'navigation',
  } as RouteObject,

  LIST_PAGED: ((params: PaginationParams): string => {
    return `/eventos/pagina/${params.page}`;
  }) as DynamicRoute<PaginationParams>,

  LIST_PAGED_STATIC: '/eventos/pagina/:page',

  EVENT_DETAIL: ((params: EventDetailParams = {}): string => {
    if (!params.slug) return '/eventos/evento/:slug';
    return `/eventos/evento/${params.slug}`;
  }) as DynamicRoute<EventDetailParams>,

  EVENT_DETAIL_STATIC: '/eventos/evento/:slug',
};

export default EVENTS_ROUTES;
