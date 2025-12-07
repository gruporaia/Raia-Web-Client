# Data Sources Guide

This guide explains how data is handled in the Grupo Raia Web Client.

## Current Data Source

The application currently uses **Mock Data** through Mock Service Worker (MSW) to intercept requests and return mock data. This is because the backend is not yet implemented.

## How Mock Data Works

Mock Service Worker (MSW) intercepts API requests at the network level and returns pre-defined mock data. This allows the application to function without a real backend.

### Mock Data Location

Mock data is defined in the following files:

- `src/mocks/mockBlogPosts.ts` - Blog post data
- `src/mocks/mockProjects.ts` - Project data
- `src/mocks/handlers.ts` - MSW request handlers

### Checking Data Source Status

During development, you can use the browser console to verify the data source:

```javascript
console.log({
  'Mock Active': localStorage.getItem('useMSW') === 'true',
  'Current Data Source': localStorage.getItem('dataSource'),
});
```

You can also call the debugging utility:

```javascript
import { logDataSourceInfo } from './utils/debugUtils';
logDataSourceInfo();
```

## Environment Configuration

The data source is controlled by:

```
VITE_USE_MOCK_DATA=true
```

When set to `true`, the application uses mock data.

## Best Practices

- **Keep Mock Data Updated**: Update mock data to reflect the expected API structure
- **Test with Real Data**: Once the backend is implemented, test with actual API data
- **Use Environment Variables**: Configure API endpoints in environment variables for easy switching

## Future: Real API Integration

When the backend is ready, the application can be switched to use real API endpoints by:

1. Setting `VITE_USE_MOCK_DATA=false` in environment variables
2. Configuring `VITE_API_URL` with the actual API endpoint
3. Ensuring MSW is disabled in production builds
