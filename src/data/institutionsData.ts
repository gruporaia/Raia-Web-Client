import { useLocalizedContent } from '../hooks/useLocalizedContent';

export interface Institution {
  id: number;
  name: string;
  website: string;
  src: string;
}

/**
 * Hook to fetch institutions data from the localized content
 * @returns Array of institution objects
 */
export function useInstitutions(): Institution[] {
  const { getContent } = useLocalizedContent('data');

  try {
    return getContent<Institution[]>('institutionsData') || [];
  } catch (error) {
    console.error('Failed to load institutions data:', error);
    return [];
  }
}
