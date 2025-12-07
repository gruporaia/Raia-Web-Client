# Grupo Raia Web Client - Data Services Documentation

## Overview

This document provides an overview of the data services implementation in the Grupo Raia Web Client. The goal of this implementation is to provide a unified data layer that works seamlessly with mock data through MSW (Mock Service Worker).

## Architecture

The implementation follows a layered architecture:

```
┌───────────────────┐
│    UI Components  │
└─────────┬─────────┘
          │
┌─────────▼─────────┐
│    React Hooks    │
└─────────┬─────────┘
          │
┌─────────▼─────────┐
│  Service Layer    │
└─────────┬─────────┘
          │
┌─────────▼─────────┐
│  Data Sources     │
├───────────────────┤
│    MSW (Mock)     │
└───────────────────┘
```

### Key Features

- **Environment-aware data fetching**: Uses mock data via MSW
- **Type-safe data models**: All data models are defined using Zod schemas
- **Unified API**: Same interface regardless of data source
- **Resilient fallbacks**: Falls back to mock data when API fails
- **Pagination support**: Consistent pagination across all data sources
- **Legacy compatibility**: Maintains backward compatibility with existing code

## Configuration

The application's runtime behavior is controlled by environment variables and configuration flags:

```typescript
// Configuration flags determine data source
export const IS_MOCK = getDataSourceMode().IS_MOCK;

function getDataSourceMode() {
  const isMswEnabled = shouldUseMockData();

  return {
    IS_MOCK: isMswEnabled,
  };
}
```

## Core Components

### 1. Data Models

Data models are defined using Zod schemas for type safety and validation:

- **BlogPost**: Blog post model with required fields like id, title, summary, and content
- **Project**: Project model with required fields like id, title, description, and content
- **ProjectReference**: Submodel for project references with title, URL, and type

### 2. Tenant Resolution

Tenant identification is used for API compatibility:

```typescript
export function resolveTenant(): string {
  return 'default';
}
```

### 3. Service Factory

The `createPaginatedService` function creates a paginated service for any data model:

```typescript
export function createPaginatedService<T extends { id: string }>(options) {
  // Returns an object with list() and byId() methods
  return {
    list: (tenant: string, page = 1, limit = 9) => {
      // Implementation details
    },
    byId: (tenant: string, id: string) => {
      // Implementation details
    },
  };
}
```

### 4. Data Sources

#### Mock Service Worker (MSW)

- Used in both development and production (until backend is implemented)
- Intercepts HTTP requests and returns mock data
- Supports pagination via query parameters
- Simulates API behavior with proper error handling

### 5. React Integration

React Query hooks provide a clean interface for components:

```typescript
// Hook for fetching paginated data
function useProjects(
  page = 1,
  limit = PAGINATION.DEFAULT_PAGE_SIZE,
  tenantOverride?: string
) {
  const defaultTenant = useTenant();
  const tenant = tenantOverride || defaultTenant;

  return useQuery({
    queryKey: ['projects', tenant, page, limit],
    queryFn: () => projectService.list(tenant, page, limit),
  });
}

// Hook for fetching a single item
function useProject(id: string | undefined, tenantOverride?: string) {
  const defaultTenant = useTenant();
  const tenant = tenantOverride || defaultTenant;

  return useQuery({
    queryKey: ['project', tenant, id],
    queryFn: () => projectService.byId(tenant, id as string),
    enabled: !!id,
  });
}
```

## Data Flow

1. **Component Renders**: A React component renders and calls a data hook
2. **Tenant Resolution**: The hook resolves the current tenant (returns 'default')
3. **Hook Invokes Service**: The hook calls a service method with parameters
4. **Service Determines Source**: Based on configuration, the service decides which data source to use
5. **Data Fetching**: The service fetches data from MSW mock handlers
6. **Data Processing**: The fetched data is validated and transformed
7. **Return to Component**: The processed data is returned to the component via React Query

## Example Usage

### React Query Approach (Recommended)

```tsx
const Projects = () => {
  const tenant = useTenant();
  const projectsQuery = useProjects(page, limit);

  if (projectsQuery.isLoading) {
    return <LoadingIndicator />;
  }

  const projects = projectsQuery.data?.items || [];

  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
```

### Legacy Approach (Still Supported)

```tsx
const [projects, setProjects] = useState<Project[]>([]);

useEffect(() => {
  const loadProjects = async () => {
    try {
      const data = await fetchProjects(page, limit);
      setProjects(data.projects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  loadProjects();
}, [page, limit]);
```

## Implementation Files

### Core Files

- `core/tenant.ts`: Tenant resolution and context
- `config.ts`: Environment variables, feature flags, and runtime configuration

### Services

- `services/createPaginatedService.ts`: Factory function for creating paginated services
- `services/blog.ts`: Blog post service implementation
- `services/projects.ts`: Project service implementation
- `services/validators.ts`: Zod schemas for data validation

### Data Access

- `lib/fetcher.ts`: Utility function for making HTTP requests

### Mock Data

- `mocks/browser.ts`: MSW browser setup
- `mocks/handlers.ts`: API route handlers for MSW
- `mocks/mockBlogPosts.ts`: Mock blog post data
- `mocks/mockProjects.ts`: Mock project data

### React Integration

- `hooks/useTenant.ts`: Hook for accessing current tenant
- `hooks/useBlogPosts.ts`: React Query hooks for blog posts
- `hooks/useProjects.ts`: React Query hooks for projects

## Best Practices

1. **Always Use Tenant Context**: Use the tenant context or pass tenant explicitly
2. **Progressive Enhancement**: Starts with mock data, can upgrade to real API or Firestore
3. **Graceful Degradation**: Falls back to mock data when external services fail
4. **Type Safety**: Uses TypeScript and Zod for type validation
5. **Clean API Design**: Consistent interfaces across all data sources
6. **Error Resilience**: Robust error handling and fallback mechanisms
7. **Code Splitting**: Dynamic imports for Firebase to reduce bundle size

## Conclusion

This implementation provides a solid foundation for data management in multi-tenant applications. It enables seamless development with mock data while supporting production deployment with real data sources. The tenant-aware architecture ensures proper data isolation while maintaining a clean API for components.
