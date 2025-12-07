import React, { createContext } from 'react';

/**
 * Resolves the current tenant
 *
 * Since multi-tenant is disabled, always returns 'default'
 *
 * @returns The default tenant identifier
 */
export function resolveTenant(): string {
  return 'default';
}

/**
 * Creates a URL for the current tenant
 *
 * @param tenant Tenant identifier (ignored in single-tenant mode)
 * @param path URL path
 * @returns URL without tenant-specific routing
 */
export function createTenantUrl(tenant: string, path: string): string {
  return new URL(path, window.location.origin).toString();
}

// Create tenant context
export const TenantContext = createContext<string>('default');

// Props for TenantProvider
export interface TenantProviderProps {
  children: React.ReactNode;
  initialTenant?: string;
}
