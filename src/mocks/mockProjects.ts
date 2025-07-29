import { http, HttpResponse } from 'msw';

import bemuContent from './projects/content/bemu.json';
import bonecheckContent from './projects/content/bonecheck.json';
import chatDiarioContent from './projects/content/chat-diario-oficial.json';
import ecoVisionContent from './projects/content/ecovision.json';
import spellnetContent from './projects/content/spellnet.json';
import ttsAutotuningContent from './projects/content/tts-autotuning.json';
import vestagentsContent from './projects/content/vestagents.json';
import projectsEn from './projects/projects-en.json';
import projectsEs from './projects/projects-es.json';
import projectsPt from './projects/projects-pt.json';

export interface ProjectReference {
  title: string;
  url: string;
  type: 'article' | 'link';
}

export interface Author {
  name: string;
  role: string;
  image: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface MockProject {
  id: string;
  title: string;
  description: string;
  body: string;
  image?: string;
  category?: string;
  categoryIcon?: string;
  date?: string;
  technologies?: string[];
  github?: string;
  website?: string;
  featured?: boolean;
  references?: ProjectReference[];
  authors?: Author[];
  language?: string;
  excerpt?: string;
  meta?: {
    description?: string;
    team?: Author[];
    technologies?: string[];
    [key: string]: unknown;
  };
  iconType?: string;
}

import { PROJECT_CATEGORY_ICONS_STRINGS as PROJECT_CATEGORY_ICONS } from '../utils/iconMappings';
export { PROJECT_CATEGORY_ICONS };

const contentMap: Record<string, Record<string, string>> = {
  '1': chatDiarioContent,
  '2': bemuContent,
  '3': ecoVisionContent,
  '4': ttsAutotuningContent,
  '5': bonecheckContent,
  '6': spellnetContent,
  '7': vestagentsContent,
};

function addContentToProjects(projects: MockProject[]): MockProject[] {
  return projects.map((project) => ({
    ...project,
    body: contentMap[project.id]?.[project.language || 'pt'] || '',
  }));
}

export const mockProjectsPt: MockProject[] = addContentToProjects(
  projectsPt as MockProject[]
);
export const mockProjectsEn: MockProject[] = addContentToProjects(
  projectsEn as MockProject[]
);
export const mockProjectsEs: MockProject[] = addContentToProjects(
  projectsEs as MockProject[]
);

export const mockProjects: MockProject[] = [
  ...mockProjectsPt,
  ...mockProjectsEn,
  ...mockProjectsEs,
];

export const projectHandlers = [
  http.get('/api/projects', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '9');
    const lang = url.searchParams.get('lang') || 'pt';

    // Filter projects by language
    const filteredProjects = mockProjects.filter(
      (project) =>
        project.language === lang || (lang === 'pt' && !project.language)
    );

    const start = (page - 1) * limit;
    const end = Math.min(start + limit, filteredProjects.length);
    const paginatedProjects = filteredProjects.slice(start, end);

    return HttpResponse.json({
      projects: paginatedProjects,
      totalPages: Math.ceil(filteredProjects.length / limit),
      currentPage: page,
      totalItems: filteredProjects.length,
    });
  }),

  http.get('/api/projects/:id', ({ params, request }) => {
    const { id } = params;
    const url = new URL(request.url);
    const lang = url.searchParams.get('lang') || 'pt';

    // Find project with the specified language
    let project = mockProjects.find((p) => p.id === id && p.language === lang);

    // If not found and language is not Portuguese, fallback to Portuguese
    if (!project && lang !== 'pt') {
      project = mockProjects.find(
        (p) => p.id === id && (p.language === 'pt' || !p.language)
      );

      if (project) {
        return HttpResponse.json({
          ...project,
          langUsed: 'pt',
        });
      }
    }

    if (project) {
      return HttpResponse.json({
        ...project,
        langUsed: project.language || 'pt',
      });
    }

    return HttpResponse.json(
      { error: `Projeto não encontrado: ${id}` },
      { status: 404 }
    );
  }),
];
