import { resolveTenant } from './core/tenantUtils';
import { shouldUseMockData } from './utils/debugControl';

declare global {
  interface Window {
    __IS_MSW_ACTIVE__?: boolean;
    env?: Record<string, string>;
  }
}

/**
 * Get an environment variable with fallback to window.env or default value
 */
export const getEnvVariable = (key: string, defaultValue = ''): string => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      const value = import.meta.env[key];
      if (value !== undefined) return value;
    }
  } catch {
    // Silent catch - import.meta might not be available
  }

  if (typeof window !== 'undefined') {
    const windowEnv = window.env || {};
    if (windowEnv[key] !== undefined) {
      return windowEnv[key];
    }
  }

  return defaultValue;
};

/**
 * API base URL from environment with tenant support
 * @param tenant Optional tenant override
 */
export function getApiBaseUrl(tenant?: string): string {
  const baseUrl = getEnvVariable('VITE_API_URL', '');
  const currentTenant = tenant || resolveTenant();

  return baseUrl.replace('{tenant}', currentTenant);
}

/**
 * Feature flags with tenant configuration
 * Base flags can be overridden by tenant configuration
 */
export const FEATURES = {
  ENABLE_NEWSLETTER:
    getEnvVariable('VITE_ENABLE_NEWSLETTER', 'true') !== 'false',
};

/**
 * Pagination settings
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 9,
  MAX_PAGE_SIZE: 50,
};

/**
 * Collection paths for data resources
 */
export const COLLECTIONS = {
  BLOGS: 'blogs',
  PROJECTS: 'projects',
};

/**
 * Check if mock data should be used
 *
 * @returns true if mock data should be used
 */
export function getDataSourceMode() {
  const isMswEnabled = shouldUseMockData();

  return {
    IS_MOCK: isMswEnabled,
  };
}

export const IS_MOCK = getDataSourceMode().IS_MOCK;

export const API_PAGE_LIMIT = PAGINATION.DEFAULT_PAGE_SIZE;
