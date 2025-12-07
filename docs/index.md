# Grupo Raia Web Client Documentation

Welcome to the documentation for the Grupo Raia Web Client. This documentation provides an overview of the various components and features of the application.

## Table of Contents

- [Architecture Overview](./architecture-overview.md) - High-level overview of application structure
- [Component Library](./component-library.md) - Documentation for UI components
- [Data Services](./data-services.md) - Documentation for the data service layer implementation
- [Data Sources](./data-sources.md) - Guide for working with data sources
- [Routing System](./routing-system.md) - Documentation for the routing system
- [Tenant Architecture](./multi-tenant.md) - Documentation for tenant configuration
- [Internationalization](./i18n.md) - Documentation for internationalization
- [Theming](./theming.md) - Documentation for theme customization
- [Debug System](./debug-system.md) - Documentation for debug utilities and mock data
- [Environment Variables](./environment-variables.md) - Documentation for environment configuration
- [Navbar Implementation](./navbar-implementation.md) - Documentation for navbar component
- [CI/CD Pipeline](./pipeline.md) - Documentation for deployment and release management

## Getting Started

To get started with the Grupo Raia Web Client, clone the repository and install the dependencies:

```bash
git clone https://github.com/gruporaia/Raia-Web-Client.git
cd Raia-Web-Client
npm install
```

Then start the development server:

```bash
npm run dev
```

## Environment Configuration

The application uses the following environment variables:

- `VITE_API_URL` - Base URL for the API
- `VITE_USE_MOCK_DATA` - Set to 'true' to use mock data (currently always true)
- `VITE_ENABLE_NEWSLETTER` - Set to 'true' to enable newsletter functionality

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run test` - Run tests
- `npm run lint` - Run linting
