# Grupo Raia - Web Client

Uma plataforma web multilíngue para o Grupo Raia com suporte completo de localização.

## 🚀 Demo Ao Vivo

Experimente a plataforma em ação:

**[https://grupo-raia.org/](https://grupo-raia.org/)**

## Visão Geral da Plataforma

O Web Client do Grupo Raia é uma solução abrangente em React + TypeScript projetada para:

- **Suporte Multilíngue**: Implementação completa de i18n com gerenciamento de conteúdo
- **Stack Tecnológico Moderno**: React 19 + TypeScript + Vite para performance otimizada
- **Dados Mockados**: Utiliza MSW (Mock Service Worker) para dados, aguardando implementação do backend
- **Infraestrutura Escalável**: Construída para deployment em nuvem com CI/CD automatizado

## Índice

- [Principais Recursos](#principais-recursos)
- [Arquitetura](#arquitetura)
- [Internacionalização](#internacionalização)
- [Primeiros Passos](#primeiros-passos)
- [Desenvolvimento](#desenvolvimento)
- [Deploy](#deploy)
- [Documentação](#documentação)
- [Contribuindo](#contribuindo)

## Principais Recursos

### Capacidades Centrais da Plataforma
- **Internacionalização Abrangente**: Traduções estáticas da UI + gerenciamento dinâmico de conteúdo
- **Suporte a Dados Mockados**: Mocking baseado em MSW para desenvolvimento e produção
- **Temas Avançados**: Temas personalizáveis com suporte a modo escuro/claro
- **Roteamento Enterprise**: Roteamento type-safe com metadados SEO e lazy loading

### Desenvolvimento e Operações
- **Stack Tecnológico Moderno**: React 19 + TypeScript + Vite para performance otimizada
- **CI/CD Automatizado**: GitHub Actions com versionamento semântico e automação de deployment
- **Garantia de Qualidade**: ESLint, Prettier, Vitest com suíte de testes abrangente
- **Ferramentas de Desenvolvimento**: MSW para mocking de API, utilitários de debug
- **Segurança**: Criptografia de arquivos BlackBox para configuração sensível
- **Performance**: Divisão de código, lazy loading e estratégias otimizadas de cache

### Recursos Empresariais
- **Páginas Profissionais**: Home, Sobre, Serviços, Projetos, Blog, Contato, Equipe
- **Showcase de Conteúdo**: Portfólios de projetos, perfis de equipe, descrições de serviços
- **Integração de Parceiros**: Logotipos e informações de parceiros
- **Gerenciamento de Contato**: Formulários e informações de contato multi-canal
- **Otimização SEO**: Gerenciamento de metadados baseado no Helmet

## Arquitetura

### Stack Tecnológico
- **Frontend**: React 19, TypeScript, Material-UI, Framer Motion
- **Roteamento**: React Router com navegação type-safe
- **Gerenciamento de Estado**: React Context + TanStack Query
- **Internacionalização**: i18next com suporte a conteúdo
- **Dados**: Mock Service Worker (MSW) para mocking de API
- **Desenvolvimento**: Vite, MSW, Vitest, ESLint, Prettier
- **Deploy**: GitHub Actions, versionamento automatizado

## Internacionalização

### Traduções Estáticas (Elementos da UI)
- **Idiomas Suportados**: Inglês, Espanhol, Português (extensível)
- **Arquivos de Tradução**: Baseados em JSON com organização hierárquica
- **Utilitários**: Funções de tradução type-safe com fallbacks
- **Desenvolvimento**: Detecção e debug de traduções ausentes

### Conteúdo Dinâmico
- **Dados Mockados**: Conteúdo específico por idioma nos dados mock
- **Estratégia de Fallback**: Fallback automático para inglês quando traduções indisponíveis
- **Integração MSW**: Respostas multilíngues simuladas para desenvolvimento

### Seleção de Idioma
- **Persistente**: Preferência de idioma mantida durante navegação
- **Fallback**: Degradação graciosa quando conteúdo indisponível

## Primeiros Passos

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Git

### Início Rápido

1. **Clonar o Repositório**
   ```bash
   git clone https://github.com/gruporaia/Raia-Web-Client.git
   cd Raia-Web-Client
   ```

2. **Instalar Dependências**
   ```bash
   npm install
   ```

3. **Inicializar MSW (Mock Service Worker)**
   ```bash
   npx msw init ./public --save
   ```

4. **Iniciar Servidor de Desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Acessar a Aplicação**
   ```
   http://localhost:3000
   ```

### Configuração de Ambiente

Crie um arquivo `.env` para seu ambiente:

```env
# Configuração da API
VITE_API_URL=https://demo.example.com/mock
VITE_USE_MOCK_DATA=true

# Feature Flags
VITE_ENABLE_NEWSLETTER=true

# Emails de Formulário
VITE_FORM_DEFAULT_EMAIL=contato@grupo-raia.org
VITE_FORM_CONTACT_EMAIL=contato@grupo-raia.org
VITE_FORM_TEAMJOIN_EMAIL=contato@grupo-raia.org
```

## Desenvolvimento

### Estrutura do Projeto
```
src/
├── components/           # Componentes UI reutilizáveis
│   ├── ui/              # Componentes UI básicos
│   ├── content/         # Componentes específicos de conteúdo
│   └── translation/     # Utilitários de tradução
├── context/             # Contextos React (Theme, Language)
├── core/                # Utilitários centrais
├── hooks/               # Hooks React customizados
├── i18n/                # Internacionalização
│   ├── locales/         # Arquivos de tradução
│   └── msw/             # Handlers MSW para i18n
├── pages/               # Componentes de página
├── routes/              # Configuração de roteamento
├── services/            # Serviços de API e busca de dados
├── theme/               # Configuração de tema
└── utils/               # Funções utilitárias
```

### Scripts de Desenvolvimento

```bash
# Desenvolvimento
npm run dev              # Iniciar servidor de desenvolvimento
npm run dev:prod         # Iniciar em modo produção

# Build
npm run build            # Build para produção
npm run build:mocked     # Build com dados simulados
npm run preview          # Visualizar build de produção

# Qualidade de Código
npm run lint             # Executar ESLint
npm run lint:fix         # Corrigir problemas ESLint
npm run format           # Formatar com Prettier
npm run format:check     # Verificar formatação

# Testes
npm run test             # Executar testes
npm run test:coverage    # Gerar relatório de cobertura
npm run test:ui          # Abrir UI do Vitest

# Utilitários
npm run clean:logs:check # Verificar declarações console.log
npm run clean:logs:fix   # Substituir console.log com debugLog
```

### Adicionando Novos Idiomas

1. **Criar Arquivos de Tradução**
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

2. **Atualizar Contexto de Idioma**
   ```typescript
   // src/context/LanguageContext.tsx
   const languages = ['en', 'es', 'pt', 'de'];
   ```

3. **Adicionar Conteúdo aos Dados Mock**
   Atualize os arquivos de dados mock com o novo conteúdo do idioma.

## Deploy

### Deploy Automatizado

A plataforma usa GitHub Actions para deploy automatizado:

1. **Desenvolvimento**: Push para branch `develop` aciona deploy de desenvolvimento
2. **Staging**: Criar branch de release para deploy de staging  
3. **Produção**: Merge para branch `main` aciona deploy de produção

### Deploy Manual

```bash
# Inicializar branch main (para novos projetos)
bash scripts/init-main-branch.sh

# Build para produção
npm run build

# Deploy para provedor de hospedagem
# (Configurar baseado na sua solução de hospedagem)
```

### Builds Específicos por Ambiente

```bash
# Build de desenvolvimento com mocks
npm run build:mocked

# Build de produção
npm run build
```

Para informações detalhadas de deploy, veja [docs/pipeline.md](./docs/pipeline.md).

## Documentação

Documentação abrangente está disponível no diretório `docs/`:

- **[Visão Geral da Arquitetura](./docs/architecture-overview.md)** - Design e estrutura do sistema
- **[Arquitetura de Tenant](./docs/multi-tenant.md)** - Configuração de tenant
- **[Internacionalização](./docs/i18n.md)** - Guia completo de i18n
- **[Serviços de Dados](./docs/data-services.md)** - Documentação da camada de dados
- **[Fontes de Dados](./docs/data-sources.md)** - Configuração de fontes de dados
- **[Sistema de Temas](./docs/theming.md)** - Personalização de tema
- **[Sistema de Roteamento](./docs/routing-system.md)** - Navegação e roteamento
- **[Biblioteca de Componentes](./docs/component-library.md)** - Componentes UI
- **[Sistema de Debug](./docs/debug-system.md)** - Ferramentas de desenvolvimento
- **[Variáveis de Ambiente](./docs/environment-variables.md)** - Configuração
- **[Pipeline CI/CD](./docs/pipeline.md)** - Processos de deploy

## Contribuindo

### Configuração de Desenvolvimento

1. **Fork do Repositório**
2. **Criar Branch de Feature**
   ```bash
   git checkout -b feature/nova-feature
   ```
3. **Fazer Alterações**
4. **Executar Testes**
   ```bash
   npm run test
   npm run lint
   ```
5. **Submeter Pull Request**

### Padrões de Código

- **TypeScript**: Modo strict habilitado
- **ESLint**: Configuração Airbnb com regras customizadas
- **Prettier**: Formatação consistente de código
- **Testes**: Vitest com React Testing Library
- **Commits**: Mensagens de commit convencionais

## Segurança e Configuração

### Criptografia de Arquivos BlackBox

Para manuseio seguro de arquivos de configuração sensíveis, este projeto usa StackExchange BlackBox:

#### Instruções de Configuração

1. **Instalar BlackBox**
   ```bash
   git clone https://github.com/StackExchange/blackbox.git
   cd blackbox
   sudo make copy-install
   ```

2. **Importar Chaves GPG** (obter do mantenedor do projeto)
   ```bash
   # Importar chave pública
   echo "chave_publica_codificada_base64" | base64 --decode | gpg --import
   
   # Importar chave privada  
   echo "chave_privada_codificada_base64" | base64 --decode | gpg --import
   ```

3. **Verificar Importação**
   ```bash
   gpg --list-secret-keys
   ```

4. **Descriptografar Arquivos do Projeto**
   ```bash
   blackbox_decrypt_all_files
   ```

### Segurança de Ambiente

- Configuração sensível armazenada criptografada no repositório
- Variáveis de ambiente para configurações específicas de deploy
- Manuseio seguro de endpoints de envio de formulário

---

## Licença

Este projeto é licenciado sob a **GNU General Public License v3.0** (GPL-3.0).

## Suporte

- **Documentação**: Guias completos no diretório `/docs`
- **Issues**: GitHub Issues para relatórios de bugs e solicitações de recursos
- **Contato**: contato@grupo-raia.org

---

**Construído com ❤️ pela Equipe Grupo Raia**
