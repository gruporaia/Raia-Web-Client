import { DynamicRoute, PaginationParams, RouteObject } from './types';

interface ProjectDetailParams {
  slug?: string;
  [key: string]: string | number | undefined;
}

const PROJECTS_ROUTES = {
  ROOT: {
    path: '/projetos',
    label: 'Projects',
    labelKey: { namespace: 'navigation', key: 'menu.projects' },
    description: 'Explore our projects',
    descriptionKey: { namespace: 'common', key: 'meta.projects' },
    translationNamespace: 'navigation',
  } as RouteObject,

  LIST: {
    path: '/projetos/pagina/1',
    label: 'Projects',
    labelKey: { namespace: 'navigation', key: 'menu.projects' },
    description: 'Explore our projects',
    descriptionKey: { namespace: 'common', key: 'meta.projects' },
    translationNamespace: 'navigation',
  } as RouteObject,

  LIST_PAGED: ((params: PaginationParams): string => {
    return `/projetos/pagina/${params.page}`;
  }) as DynamicRoute<PaginationParams>,

  LIST_PAGED_STATIC: '/projetos/pagina/:page',

  PROJECT_DETAIL: ((params: ProjectDetailParams = {}): string => {
    if (!params.slug) return '/projetos/projeto/:slug';
    return `/projetos/projeto/${params.slug}`;
  }) as DynamicRoute<ProjectDetailParams>,

  PROJECT_DETAIL_STATIC: '/projetos/projeto/:slug',
};

export default PROJECTS_ROUTES;
