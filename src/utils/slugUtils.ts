/**
 * Converts a title to a URL-friendly slug
 * @param title The title to convert
 * @returns A kebab-case slug
 */
export function titleToSlug(title: string): string {
  return (
    title
      .toLowerCase()
      .trim()
      // Replace accented characters
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      // Replace spaces and special characters with hyphens
      .replace(/[^a-z0-9]+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '')
  );
}

/**
 * Gets a project slug based on the known project titles
 * This is a mapping of known projects to ensure consistent slugs
 */
export function getProjectSlug(id: string, title: string): string {
  // Mapping of known project IDs to their expected slugs
  const knownSlugs: Record<string, string> = {
    '1': 'chat-diario-oficial',
    '2': 'bemu',
    '3': 'ecovision',
    '4': 'tts-autotuning',
    '5': 'bonecheck',
    '6': 'spellnet',
    '7': 'vestagents',
  };

  // Use known slug if available, otherwise generate from title
  return knownSlugs[id] || titleToSlug(title);
}

/**
 * Creates a reverse mapping from slug to project ID
 */
export function getProjectIdFromSlug(slug: string): string | null {
  const slugToId: Record<string, string> = {
    'chat-diario-oficial': '1',
    bemu: '2',
    ecovision: '3',
    'tts-autotuning': '4',
    bonecheck: '5',
    spellnet: '6',
    vestagents: '7',
  };

  return slugToId[slug] || null;
}

/**
 * Gets an event slug based on the known event titles
 * This is a mapping of known events to ensure consistent slugs
 */
export function getEventSlug(id: string, title: string): string {
  // Mapping of known event IDs to their expected slugs
  const knownSlugs: Record<string, string> = {
    '1': 'conferencia-raia-2025',
    '2': 'llm-spring-school',
    '3': 'hackathon-raia-monks',
  };

  // Use known slug if available, otherwise generate from title
  return knownSlugs[id] || titleToSlug(title);
}

/**
 * Creates a reverse mapping from slug to event ID
 */
export function getEventIdFromSlug(slug: string): string | null {
  const slugToId: Record<string, string> = {
    'conferencia-raia-2025': '1',
    'llm-spring-school': '2',
    'hackathon-raia-monks': '3',
  };

  return slugToId[slug] || null;
}
