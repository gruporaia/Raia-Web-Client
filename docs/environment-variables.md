# Environment Variables

This document describes all environment variables used in the Grupo Raia Web Client project, organized by function and build type.

## Build Types

The application supports various build configurations through environment variables:

- **Development**: Default mode using `npm run dev` (uses `.env.debug`)
- **Production-like Development**: For testing in production-like environment using `npm run dev:prod`
- **Production**: Standard production build using `npm run build`
- **Production with Mock Data**: Production build using mock data with `npm run build:mocked` (uses `.env.mocked`)

## Core Environment Variables

| Variable                 | Description                                  | Default                        | Used In    |
| ------------------------ | -------------------------------------------- | ------------------------------ | ---------- |
| `VITE_API_URL`           | Base URL for the API                         | `https://demo.example.com/mock`| All builds |
| `VITE_USE_MOCK_DATA`     | Whether to use mock data instead of real API | `true`                         | All builds |
| `VITE_ENABLE_NEWSLETTER` | Enable newsletter functionality              | `true`                         | All builds |

## Form Submission Endpoints

Form submissions use FormSubmit.co service with configurable email endpoints:

| Variable                   | Description                                              | Default               | Used For       |
| -------------------------- | -------------------------------------------------------- | --------------------- | -------------- |
| `VITE_FORM_DEFAULT_EMAIL`  | Default recipient for all forms if specific ones not set | `contato@grupo-raia.org` | All forms      |
| `VITE_FORM_CONTACT_EMAIL`  | Email address for contact form submissions               | Falls back to default | Contact form   |
| `VITE_FORM_TEAMJOIN_EMAIL` | Email address for team/job applications                  | Falls back to default | Team Join form |

## Feature Flags

| Variable                         | Description                              | Default                       | Used In              |
| -------------------------------- | ---------------------------------------- | ----------------------------- | -------------------- |
| `VITE_FEATURE_SHOW_LANDING`      | Whether to display seasonal landing page | `false`                       | All builds           |
| `VITE_LANDING_CAMPAIGN_SLUG`     | URL slug for landing page                | `raia-conference-2025`        | When landing enabled |
| `VITE_LANDING_START_DATE`        | Start date for seasonal landing page     | `2025-05-01T00:00:00-03:00`   | When landing enabled |
| `VITE_LANDING_END_DATE`          | End date for seasonal landing page       | `2025-06-14T23:59:59-03:00`   | When landing enabled |
| `VITE_LANDING_CAMPAIGN_BASE_URL` | Base URL for landing page campaign       | `https://forms.gle/...`       | When landing enabled |

## Environment Files

### `.env.debug` (Development with Debug)

Development with explicit debug features enabled:

```
VITE_API_URL=http://localhost:3001/mock
VITE_USE_MOCK_DATA=true
VITE_ENABLE_NEWSLETTER=true
VITE_FORM_DEFAULT_EMAIL=contato@grupo-raia.org
VITE_FORM_CONTACT_EMAIL=contato@grupo-raia.org
VITE_FORM_TEAMJOIN_EMAIL=contato@grupo-raia.org
VITE_LANDING_CAMPAIGN_SLUG=raia-conference-2025
VITE_LANDING_START_DATE=2025-05-01T00:00:00-03:00
VITE_LANDING_END_DATE=2025-06-14T23:59:59-03:00
VITE_LANDING_CAMPAIGN_BASE_URL=https://forms.gle/Fh4sZTw7DMGamttE7
```

### `.env.mocked` (Production with Mock Data)

Production configuration that uses mock data:

```
VITE_API_URL=https://demo.example.com/mock
VITE_USE_MOCK_DATA=true
VITE_ENABLE_NEWSLETTER=false
VITE_FORM_DEFAULT_EMAIL=contato@grupo-raia.org
VITE_FORM_CONTACT_EMAIL=contato@grupo-raia.org
VITE_FORM_TEAMJOIN_EMAIL=contato@grupo-raia.org
VITE_LANDING_CAMPAIGN_SLUG=raia-conference-2025
VITE_LANDING_START_DATE=2025-05-01T00:00:00-03:00
VITE_LANDING_END_DATE=2025-06-14T23:59:59-03:00
VITE_LANDING_CAMPAIGN_BASE_URL=https://forms.gle/Fh4sZTw7DMGamttE7
```

## Adding New Environment Variables

When adding new environment variables:

1. Add them to all relevant `.env.*` files
2. Document them in this file
3. Use the `getEnvVariable()` function from `src/config.ts` to access them
4. Provide sensible defaults for all environment variables

## Using Environment Variables in Code

```typescript
import { getEnvVariable } from '../config';

// Get value with fallback
const apiUrl = getEnvVariable('VITE_API_URL', 'https://api.default.com');

// Boolean flag
const isFeatureEnabled = getEnvVariable('VITE_SOME_FEATURE') === 'true';
```
