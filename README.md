
<kbd>[<img title="Português (Brasil)" alt="Português (Brasil)" src="https://cdn.statically.io/gh/hjnilsson/country-flags/master/svg/br.svg" width="22">](./README-pt-BR.md)</kbd>

# Grupo Raia - Web Client

A multilingual web platform for Grupo Raia with comprehensive localization support.

## 🚀 Live Demo

Experience the platform in action:

**[https://grupo-raia.org/](https://grupo-raia.org/)**

## Platform Overview

The Grupo Raia Web Client is a comprehensive React + TypeScript solution designed for:

- **Multilingual Support**: Complete i18n implementation with content management
- **Modern Tech Stack**: React 19 + TypeScript + Vite for optimal performance
- **Mock Data**: Currently uses MSW (Mock Service Worker) for data, pending backend implementation
- **Scalable Infrastructure**: Built for cloud deployment with automated CI/CD

## Table of Contents

- [Key Features](#key-features)
- [Architecture](#architecture)
- [Internationalization](#internationalization)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)

## Key Features

### Core Platform Capabilities
- **Comprehensive Internationalization**: Static UI translations + dynamic content management
- **Mock Data Support**: MSW-based data mocking for development and production
- **Advanced Theming**: Customizable themes with dark/light mode support
- **Enterprise-grade Routing**: Type-safe routing with SEO metadata and lazy loading

### Development & Operations
- **Modern Tech Stack**: React 19 + TypeScript + Vite for optimal performance
- **Automated CI/CD**: GitHub Actions with semantic versioning and deployment automation
- **Quality Assurance**: ESLint, Prettier, Vitest with comprehensive testing suite
- **Development Tools**: MSW for API mocking, debug utilities
- **Security**: BlackBox file encryption for sensitive configuration
- **Performance**: Code splitting, lazy loading, and optimized caching strategies

### Business Features
- **Professional Pages**: Home, About, Services, Projects, Blog, Contact, Team
- **Content Showcase**: Project portfolios, team profiles, service descriptions
- **Partner Integration**: Partner logos and information display
- **Contact Management**: Multi-channel contact forms and information
- **SEO Optimization**: Helmet-based metadata management

## Architecture

### Technology Stack
- **Frontend**: React 19, TypeScript, Material-UI, Framer Motion
- **Routing**: React Router with type-safe navigation
- **State Management**: React Context + TanStack Query
- **Internationalization**: i18next with content support
- **Data**: Mock Service Worker (MSW) for API mocking
- **Development**: Vite, MSW, Vitest, ESLint, Prettier
- **Deployment**: GitHub Actions, automated versioning

## Internationalization

### Static Translations (UI Elements)
- **Supported Languages**: English, Spanish, Portuguese (extensible)
- **Translation Files**: JSON-based with hierarchical organization
- **Utilities**: Type-safe translation functions with fallbacks
- **Development**: Missing translation detection and debugging

### Dynamic Content
- **Mock Data**: Language-specific content in mock data
- **Fallback Strategy**: Automatic fallback to English when translations unavailable
- **MSW Integration**: Mock multilingual responses for development

### Language Selection
- **Persistent**: Language preference maintained across navigation
- **Fallback**: Graceful degradation when content unavailable

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/gruporaia/Raia-Web-Client.git
   cd Raia-Web-Client
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Initialize MSW (Mock Service Worker)**
   ```bash
   npx msw init ./public --save
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   ```
   http://localhost:3000
   ```

### Environment Configuration

Create a `.env` file for your environment:

```env
# API Configuration
VITE_API_URL=https://demo.example.com/mock
VITE_USE_MOCK_DATA=true

# Feature Flags
VITE_ENABLE_NEWSLETTER=true

# Form Emails
VITE_FORM_DEFAULT_EMAIL=contato@grupo-raia.org
VITE_FORM_CONTACT_EMAIL=contato@grupo-raia.org
VITE_FORM_TEAMJOIN_EMAIL=contato@grupo-raia.org
```

## Development

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components
│   ├── content/         # Content-specific components
│   └── translation/     # Translation utilities
├── context/             # React contexts (Theme, Language)
├── core/                # Core utilities
├── hooks/               # Custom React hooks
├── i18n/                # Internationalization
│   ├── locales/         # Translation files
│   └── msw/             # MSW handlers for i18n
├── pages/               # Page components
├── routes/              # Routing configuration
├── services/            # API services and data fetching
├── theme/               # Theme configuration
└── utils/               # Utility functions
```

### Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:prod         # Start in production mode

# Building
npm run build            # Build for production
npm run build:mocked     # Build with mocked data
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format with Prettier
npm run format:check     # Check formatting

# Testing
npm run test             # Run tests
npm run test:coverage    # Generate coverage report
npm run test:ui          # Open Vitest UI

# Utilities
npm run clean:logs:check # Check for console.log statements
npm run clean:logs:fix   # Replace console.log with debugLog
```
       "primary": "#1976d2",
       "secondary": "#dc004e"
     },
     "features": {
       "newsletter": true,
       "blog": true,
       "analytics": true
     },
     "contact": {
       "email": "info@newcompany.com",
       "phone": "+1234567890"
     }
   }
   ```

2. **Add Content** (projects, team, services)
3. **Test Locally**
   ```bash
   npm run dev -- --tenant=newcompany
   ```

### Adding New Languages

1. **Create Translation Files**
   ```
   src/i18n/locales/de/
   ├── index.ts
   ├── common.json
   ├── navigation.json
   └── screens/
       ├── home.json
       ├── about.json
       └── ...
   ```

2. **Update Language Context**
   ```typescript
   // src/context/LanguageContext.tsx
   const languages = ['en', 'es', 'pt', 'de'];
   ```

3. **Add Content to Mock Data**
   Update mock data files with new language content.

## Deployment

### Automated Deployment

The platform uses GitHub Actions for automated deployment:

1. **Development**: Push to `develop` branch triggers development deployment
2. **Staging**: Create release branch for staging deployment  
3. **Production**: Merge to `main` branch triggers production deployment

### Manual Deployment

```bash
# Initialize main branch (for new projects)
bash scripts/init-main-branch.sh

# Build for production
npm run build

# Deploy to hosting provider
# (Configure based on your hosting solution)
```

### Environment-specific Builds

```bash
# Development build with mocks
npm run build:mocked

# Production build
npm run build
```

For detailed deployment information, see [docs/pipeline.md](./docs/pipeline.md).

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Architecture Overview](./docs/architecture-overview.md)** - System design and structure
- **[Tenant Architecture](./docs/multi-tenant.md)** - Tenant configuration
- **[Internationalization](./docs/i18n.md)** - Complete i18n guide
- **[Data Services](./docs/data-services.md)** - Data layer documentation
- **[Data Sources](./docs/data-sources.md)** - Data source configuration
- **[Theming System](./docs/theming.md)** - Theme customization
- **[Routing System](./docs/routing-system.md)** - Navigation and routing
- **[Component Library](./docs/component-library.md)** - UI components
- **[Debug System](./docs/debug-system.md)** - Development tools
- **[Environment Variables](./docs/environment-variables.md)** - Configuration
- **[CI/CD Pipeline](./docs/pipeline.md)** - Deployment processes

## Contributing

### Development Setup

1. **Fork the Repository**
2. **Create Feature Branch**
   ```bash
   git checkout -b feature/new-feature
   ```
3. **Make Changes**
4. **Run Tests**
   ```bash
   npm run test
   npm run lint
   ```
5. **Submit Pull Request**

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration with custom rules
- **Prettier**: Consistent code formatting
- **Testing**: Vitest with React Testing Library
- **Commits**: Conventional commit messages

## Security & Configuration

### BlackBox File Encryption

For secure handling of sensitive configuration files, this project uses StackExchange BlackBox:

#### Setup Instructions

1. **Install BlackBox**
   ```bash
   git clone https://github.com/StackExchange/blackbox.git
   cd blackbox
   sudo make copy-install
   ```

2. **Import GPG Keys** (obtain from project maintainer)
   ```bash
   # Import public key
   echo "base64_encoded_public_key" | base64 --decode | gpg --import
   
   # Import private key  
   echo "base64_encoded_private_key" | base64 --decode | gpg --import
   ```

3. **Verify Import**
   ```bash
   gpg --list-secret-keys
   ```

4. **Decrypt Project Files**
   ```bash
   blackbox_decrypt_all_files
   ```

### Environment Security

- Sensitive configuration stored encrypted in repository
- Environment variables for deployment-specific settings
- Secure handling of form submission endpoints

---

## License

This project is licensed under the **GNU General Public License v3.0** (GPL-3.0).

## Support

- **Documentation**: Complete guides in `/docs` directory
- **Issues**: GitHub Issues for bug reports and feature requests
- **Contact**: contato@grupo-raia.org

---

Built with ❤️ by the Grupo Raia Team

---

**Built with ❤️ by the Rubrion Team**

*Making technology accessible through open-source innovation*