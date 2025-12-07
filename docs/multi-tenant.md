# Tenant Architecture

This document provides an overview of the tenant configuration in the Grupo Raia Web Client.

## Overview

The application operates as a single-tenant deployment for Grupo Raia, with the following characteristics:

- Single configuration
- Unified theme
- Shared content and data
- Simplified architecture

## Tenant Resolution

The application uses a default tenant identifier (`'default'`) for all operations:

```typescript
// src/core/tenantUtils.ts
export function resolveTenant(): string {
  return 'default';
}
```

## Core Components

### 1. Tenant Context

The `TenantProvider` and `useTenant` hook provide tenant identification throughout the application:

```tsx
// In App.tsx
<TenantProvider>{/* Application content */}</TenantProvider>;

// In any component
const currentTenant = useTenant(); // Returns 'default'
```

### 2. Data Services

Data services use the tenant parameter for consistency with the API structure:

```typescript
// Service implementation
const response = await projectService.list(currentTenant, page, limit);

// Legacy function with tenant parameter
const data = await fetchProjects(page, limit, tenant);
```

## Theme Customization

The theme is defined centrally in the theme configuration:

```typescript
// Theme provider using unified theme
<ThemeProvider theme={theme}>
  {/* Application content */}
</ThemeProvider>
```

## Best Practices

1. **Use Tenant Context**: Use the tenant context for future extensibility
2. **Theme Variables**: Use theme variables instead of hardcoded styles
3. **Service Parameters**: Pass tenant to services for API compatibility

## Future Extensibility

The codebase maintains the tenant abstraction to allow for future multi-tenant capabilities if needed. The tenant context and service patterns can be extended to support multiple tenants with minimal changes.
