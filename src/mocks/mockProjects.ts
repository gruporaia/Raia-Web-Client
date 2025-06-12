import { http, HttpResponse } from 'msw';

export interface ProjectReference {
  title: string;
  url: string;
  type: 'article' | 'link';
}

export interface Author {
  name: string;
  role: string;
  image: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface MockProject {
  id: string;
  title: string;
  description: string;
  body: string;
  image?: string;
  category?: string;
  categoryIcon?: string;
  date?: string;
  technologies?: string[];
  github?: string;
  website?: string;
  featured?: boolean;
  references?: ProjectReference[];
  authors?: Author[];
  language?: string;
  excerpt?: string;
  meta?: {
    description?: string;
    team?: Author[];
    technologies?: string[];
    [key: string]: unknown;
  };
  iconType?: string;
}

import { PROJECT_CATEGORY_ICONS_STRINGS as PROJECT_CATEGORY_ICONS } from '../utils/iconMappings';
export { PROJECT_CATEGORY_ICONS };

const chatDiarioContent = {
  pt: `
  <div>
    <h2>Visão Geral do Projeto</h2>
    <p>O Chat Diário Oficial é uma solução end-to-end desenvolvida para otimizar a busca de informações em longas bases de dados textuais, como o Diário Oficial do Município de Belo Horizonte (MG). Utilizando conceitos de Retrieval Augmented Generation (RAG), este projeto visa auxiliar servidores públicos e profissionais que precisam navegar diariamente por extensos documentos, proporcionando uma experiência de busca eficiente e economia de tempo.</p>
    
    <h3>Principais Características</h3>
    <ul>
      <li>Coleta e processamento dos documentos do Diário Oficial</li>
      <li>Recuperação de informações com base na pergunta do usuário</li>
      <li>Geração de respostas utilizando modelos de linguagem</li>
      <li>Interatividade via chatbot com interface visual</li>
    </ul>
    
    <h3>Tecnologias Utilizadas</h3>
    <p>O projeto foi desenvolvido utilizando:</p>
    <ul>
      <li>Ferramentas de processamento e armazenamento de textos</li>
      <li>Integração com LLM</li>
      <li>Técnicas de RAG (Retrieval Augmented Generation)</li>
    </ul>
    
    <h3>Resultados</h3>
    <p>A aplicação foi desenvolvida como uma prova de conceito e ainda requer melhorias para aprimorar sua eficiência e usabilidade. O teste desta ferramenta foi realizado internamente e também com funcionários da Prefeitura de Belo Horizonte, permitindo validar seu funcionamento em um ambiente real.</p>
  </div>
  `,
  en: `
  <div>
    <h2>Project Overview</h2>
    <p>The Official Gazette Chat is an end-to-end solution developed to optimize the search for information in extensive textual databases, such as the Official Gazette of Belo Horizonte Municipality (MG). Using Retrieval Augmented Generation (RAG) concepts, this project aims to assist public servants and professionals who need to navigate through extensive documents daily, providing an efficient search experience and saving time.</p>
    
    <h3>Key Features</h3>
    <ul>
      <li>Collection and processing of Official Gazette documents</li>
      <li>Information retrieval based on user questions</li>
      <li>Response generation using language models</li>
      <li>Interactivity via chatbot with visual interface</li>
    </ul>
    
    <h3>Technologies Used</h3>
    <p>The project was developed using:</p>
    <ul>
      <li>Text processing and storage tools</li>
      <li>LLM integration</li>
      <li>RAG (Retrieval Augmented Generation) techniques</li>
    </ul>
    
    <h3>Results</h3>
    <p>The application was developed as a proof of concept and still requires improvements to enhance its efficiency and usability. Testing of this tool was conducted internally and also with employees of the Belo Horizonte City Hall, allowing validation of its operation in a real environment.</p>
  </div>
  `,
  es: `
  <div>
    <h2>Visión General del Proyecto</h2>
    <p>El Chat del Diario Oficial es una solución integral desarrollada para optimizar la búsqueda de información en extensas bases de datos textuales, como el Diario Oficial del Municipio de Belo Horizonte (MG). Utilizando conceptos de Generación Aumentada por Recuperación (RAG), este proyecto busca ayudar a funcionarios públicos y profesionales que necesitan navegar diariamente por documentos extensos, proporcionando una experiencia de búsqueda eficiente y ahorro de tiempo.</p>
    
    <h3>Características Principales</h3>
    <ul>
      <li>Recolección y procesamiento de documentos del Diario Oficial</li>
      <li>Recuperación de información basada en las preguntas del usuario</li>
      <li>Generación de respuestas utilizando modelos de lenguaje</li>
      <li>Interactividad a través de chatbot con interfaz visual</li>
    </ul>
    
    <h3>Tecnologías Utilizadas</h3>
    <p>El proyecto fue desarrollado utilizando:</p>
    <ul>
      <li>Herramientas de procesamiento y almacenamiento de textos</li>
      <li>Integración con LLM</li>
      <li>Técnicas de RAG (Generación Aumentada por Recuperación)</li>
    </ul>
    
    <h3>Resultados</h3>
    <p>La aplicación fue desarrollada como una prueba de concepto y aún requiere mejoras para optimizar su eficiencia y usabilidad. La prueba de esta herramienta se realizó internamente y también con empleados de la Alcaldía de Belo Horizonte, permitiendo validar su funcionamiento en un entorno real.</p>
  </div>
  `,
};

const bemuContent = {
  pt: `
  <div>
    <h2>Visão Geral do Projeto</h2>
    <p>O avanço dos modelos generativos multimodais tem sido notável, mas a diversidade linguística e cultural ainda é um desafio, especialmente para o português. A maioria dos benchmarks usados para avaliar esses modelos é predominantemente em inglês, comprometendo a captura das nuances e particularidades da língua portuguesa.</p>
    
    <h3>Nossa Abordagem</h3>
    <p>Para enfrentar essa limitação, desenvolvemos o BEMU (Benchmarks Educacionais Multimodais Universitárias), focado na criação de um conjunto de dados multimodal baseado em questões de vestibulares brasileiros (Unesp, Unicamp, USP, ENEM, FAMERP e Santa Casa). Coletamos mais de 5 mil questões cobrindo diversas áreas do conhecimento, preservando o contexto cultural e linguístico original, sem depender de traduções.</p>
    
    <h3>Componentes do Projeto</h3>
    <ul>
      <li>Coleta de questões de vestibulares brasileiros</li>
      <li>Parsing de PDFs e extração estruturada de conteúdo</li>
      <li>Preservação de textos autênticos (como trechos literários e jornalísticos)</li>
      <li>Inclusão de imagens representativas da cultura brasileira</li>
    </ul>
    
    <h3>Resultados e Impacto</h3>
    <p>Nosso objetivo é fornecer um benchmark mais preciso e culturalmente relevante para a avaliação de modelos multimodais em português. Esse esforço contribui para o avanço da pesquisa em IA no Brasil e estabelece um precedente para a inclusão de outras línguas não-inglesas na avaliação de modelos de IA.</p>
  </div>
  `,
  en: `
  <div>
    <h2>Project Overview</h2>
    <p>The advancement of generative multimodal models has been remarkable, but linguistic and cultural diversity remains a challenge, especially for Portuguese. Most benchmarks used to evaluate these models are predominantly in English, compromising the capture of nuances and particularities of the Portuguese language.</p>
    
    <h3>Our Approach</h3>
    <p>To address this limitation, we developed BEMU (Educational Multimodal University Benchmarks), focused on creating a multimodal dataset based on Brazilian university entrance exams (Unesp, Unicamp, USP, ENEM, FAMERP, and Santa Casa). We collected over 5,000 questions covering various knowledge areas, preserving the original cultural and linguistic context, without relying on translations.</p>
    
    <h3>Project Components</h3>
    <ul>
      <li>Collection of questions from Brazilian university entrance exams</li>
      <li>PDF parsing and structured content extraction</li>
      <li>Preservation of authentic texts (such as literary and journalistic excerpts)</li>
      <li>Inclusion of images representative of Brazilian culture</li>
    </ul>
    
    <h3>Results and Impact</h3>
    <p>Our goal is to provide a more accurate and culturally relevant benchmark for evaluating multimodal models in Portuguese. This effort contributes to the advancement of AI research in Brazil and establishes a precedent for including other non-English languages in AI model evaluation.</p>
  </div>
  `,
  es: `
  <div>
    <h2>Visión General del Proyecto</h2>
    <p>El avance de los modelos generativos multimodales ha sido notable, pero la diversidad lingüística y cultural sigue siendo un desafío, especialmente para el portugués. La mayoría de los benchmarks utilizados para evaluar estos modelos son predominantemente en inglés, comprometiendo la captura de matices y particularidades de la lengua portuguesa.</p>
    
    <h3>Nuestro Enfoque</h3>
    <p>Para enfrentar esta limitación, desarrollamos BEMU (Benchmarks Educativos Multimodales Universitarios), enfocado en la creación de un conjunto de datos multimodal basado en exámenes de ingreso universitario brasileños (Unesp, Unicamp, USP, ENEM, FAMERP y Santa Casa). Recopilamos más de 5.000 preguntas que cubren diversas áreas de conocimiento, preservando el contexto cultural y lingüístico original, sin depender de traducciones.</p>
    
    <h3>Componentes del Proyecto</h3>
    <ul>
      <li>Recopilación de preguntas de exámenes de ingreso universitario brasileños</li>
      <li>Análisis de PDFs y extracción estructurada de contenido</li>
      <li>Preservación de textos auténticos (como extractos literarios y periodísticos)</li>
      <li>Inclusión de imágenes representativas de la cultura brasileña</li>
    </ul>
    
    <h3>Resultados e Impacto</h3>
    <p>Nuestro objetivo es proporcionar un benchmark más preciso y culturalmente relevante para la evaluación de modelos multimodales en portugués. Este esfuerzo contribuye al avance de la investigación en IA en Brasil y establece un precedente para la inclusión de otros idiomas no ingleses en la evaluación de modelos de IA.</p>
  </div>
  `,
};

const ecoVisionContent = {
  pt: `
  <div>
    <h2>Visão Geral do Projeto</h2>
    <p>O EcoVision é um projeto que busca aplicar técnicas de visão computacional para aumentar a segurança no processo de triagem de resíduos. Utilizando um modelo da família YOLO v11, a solução é capaz de identificar em tempo real objetos potencialmente perigosos que aparecem nas esteiras de coleta seletiva — como materiais perfurantes, inflamáveis ou eletrônicos indevidamente descartados.</p>

    <h3>Fase Atual</h3>
    <p>Atualmente, o projeto está em fase de implantação e testes de infraestrutura na Cooperativa Acácia (Araraquara, SP).</p>
  </div>
  `,
  en: `
  <div>
    <h2>Project Overview</h2>
    <p>EcoVision is a project that applies computer vision techniques to enhance safety in the waste sorting process. Using a YOLO v11 model, the solution can identify potentially dangerous objects in real-time that appear on recycling conveyor belts — such as sharp materials, flammable items, or improperly discarded electronics.</p>

    <h3>Current Phase</h3>
    <p>The project is currently in the implementation and infrastructure testing phase at Acácia Cooperative (Araraquara, SP).</p>
  </div>
  `,
  es: `
  <div>
    <h2>Visión General del Proyecto</h2>
    <p>EcoVision es un proyecto que busca aplicar técnicas de visión por computadora para aumentar la seguridad en el proceso de clasificación de residuos. Utilizando un modelo de la familia YOLO v11, la solución es capaz de identificar en tiempo real objetos potencialmente peligrosos que aparecen en las cintas transportadoras de reciclaje — como materiales punzantes, inflamables o electrónicos desechados incorrectamente.</p>

    <h3>Fase Actual</h3>
    <p>Actualmente, el proyecto está en fase de implementación y pruebas de infraestructura en la Cooperativa Acácia (Araraquara, SP).</p>
  </div>
  `,
};

export const mockProjectsPt: MockProject[] = [
  {
    id: '1',
    title: 'Chat Diário Oficial',
    description:
      'O Chat Diário Oficial é uma solução end-to-end que otimiza a busca em grandes bases textuais, como o Diário Oficial de Belo Horizonte, usando Retrieval Augmented Generation (RAG). Ele auxilia servidores e profissionais na navegação por documentos extensos, proporcionando buscas eficientes e economia de tempo.',
    body: chatDiarioContent.pt,
    image: '/projects/chat-diario-oficial/chat-diario-oficial.png',
    category: 'Processamento de Texto',
    iconType: 'RAG',
    date: '2024-02-15',
    language: 'pt',
    technologies: ['NLP', 'Engenharia de Dados', 'RAG', 'LLM'],
    github: 'https://github.com/gruporaia/Chat-Diario-Oficial',
    meta: {
      technologies: ['NLP', 'Engenharia de Dados', 'RAG', 'LLM'],
      team: [
        {
          name: 'Alvaro Jose Lopes',
          role: 'Desenvolvedor',
          image: '/team/chat-diario-oficial/alvaro-jose-lopes.png',
          bio: 'Contribuiu com a etapa de ingestão dos dados, desde seu design até a implementação.',
          linkedin: 'https://www.linkedin.com/in/alvaro-jose-lopes/',
        },
        {
          name: 'Bernardo Marques Costa',
          role: 'Desenvolvedor',
          image: '/team/chat-diario-oficial/bernardo-marques-costa.png',
          bio: 'Atuou no design e implementação da ferramenta, desde ingestão dos dados até criação da aplicação final.',
          linkedin: 'https://www.linkedin.com/in/bernardo-marques-costa/',
          github: 'https://github.com/bmarquescost',
        },
        {
          name: 'Cecília Nunes Sedenho',
          role: 'Desenvolvedora',
          image: '/team/cecilia-nunes-sedenho.png',
          bio: 'Contribuiu com testes de diferentes modelos de linguagem e integração entre a ingestão de dados e a interação com o modelo.',
          linkedin:
            'https://www.linkedin.com/in/cec%C3%ADlia-nunes-sedenho-305059255/',
          github: 'https://github.com/HeNunes',
        },
        {
          name: 'Laura Fernandes Camargos',
          role: 'Desenvolvedora',
          image: '/team/chat-diario-oficial/laura-fernandes-camargos.png',
          bio: 'Trabalhou na parte de testes de configurações do RAG e implementando o frontend da aplicação final.',
          linkedin:
            'https://www.linkedin.com/in/laura-fernandes-camargos-a26b89246/',
          github: 'https://github.com/laurafcamargos',
        },
        {
          name: 'Pedro Augusto Monteiro Delgado',
          role: 'Gerente',
          image: '/team/pedro-augusto-monteiro-delgado.png',
          bio: 'Gerenciou a equipe e o projeto, além de contribuir para testes da aplicação.',
          linkedin: 'https://www.linkedin.com/in/pedroamdelgado',
          github: 'https://github.com/DelgadoPedro',
        },
      ],
    },
  },
  {
    id: '2',
    title: 'BEMU',
    description:
      'O projeto coleta questões de vestibulares brasileiros para avaliar IAs multimodais em português, combinando parsing de PDFs, modelos de IA e conversores para LaTeX. O resultado são cinco datasets com mais de 5 mil questões, tornando os benchmarks mais representativos.',
    body: bemuContent.pt,
    image: '/projects/bemu/bemu.png',
    category: 'IA',
    iconType: 'Artificial Intelligence',
    date: '2024-03-20',
    language: 'pt',
    technologies: ['Machine Learning', 'Computer Vision', 'NLP', 'LaTeX'],
    github: 'https://github.com/gruporaia/BEMU',
    featured: true,
    references: [
      {
        title:
          'Indo além do inglês: ampliando o horizonte de avaliações de IAs multimodais',
        url: 'https://medium.com/@raia.diretoria/indo-al%C3%A9m-do-ingl%C3%AAs-ampliando-o-horizonte-de-avalia%C3%A7%C3%B5es-de-ias-multimodais-a5249af02f7a',
        type: 'article',
      },
    ],
    meta: {
      technologies: ['Machine Learning', 'Computer Vision', 'NLP', 'LaTeX'],
      team: [
        {
          name: 'Luísa Shimabucoro',
          role: 'Gerente de Projeto',
          image: '/team/luisa-shimabucoro.png',
          bio: 'Pesquisadora em ML com foco em NLP e Visão Computacional.',
          linkedin: 'https://www.linkedin.com/in/lushimabucoro/',
          github:
            'https://github.com/gruporaia/BEMU/commits?author=luisashimabucoro',
        },
        {
          name: 'Gabriel Merlin',
          role: 'Desenvolvedor',
          image: '/team/gabriel-merlin.png',
          bio: 'Especialista em Machine Learning e Deep Learning com foco em Séries Temporais.',
          linkedin: 'https://www.linkedin.com/in/gabrielcmerlin/',
        },
        {
          name: 'André Mitri',
          role: 'Engenheiro de Dados',
          image: '/team/bemu/andre-mitri.png',
          bio: 'Pesquisador em Séries Temporais e Aprendizado de Representação com experiência em web scraping.',
          linkedin: 'https://www.linkedin.com/in/andre-de-mitri/',
        },
        {
          name: 'Leticia Marchezi',
          role: 'Pesquisadora',
          image: '/team/leticia-marchezi.png',
          bio: 'Pesquisadora em PLN com experiência em extração de textos usando modelos multimodais.',
          linkedin: 'https://www.linkedin.com/in/letmarchezi/',
        },
        {
          name: 'Otávio F. Coletti',
          role: 'Desenvolvedor',
          image: '/team/bemu/otavio-coletti.png',
          bio: 'Desenvolvedor especializado em parsing de PDFs e extração de dados estruturados.',
          linkedin: 'https://www.linkedin.com/in/ot%C3%A1viocoletti-012/',
        },
      ],
    },
  },
  {
    id: '3',
    title: 'EcoVision',
    description:
      'O EcoVision aplica visão computacional para segurança na triagem de resíduos, identificando objetos perigosos em tempo real.',
    body: ecoVisionContent.pt,
    image: '/projects/ecovision/ecovision.png',
    category: 'Visão Computacional',
    iconType: 'Computer Vision',
    date: '2025-05-19',
    language: 'pt',
    technologies: ['YOLO v11', 'Computer Vision'],
    featured: false,
    github: 'https://github.com/gruporaia/EcoVision',
    meta: {
      technologies: ['YOLO v11', 'Computer Vision'],
      team: [
        {
          name: 'Artur De Vlieger Lima',
          role: 'Desenvolvedor',
          image: '/team/ecovision/artur-de-vlieger-lima.png',
          bio: 'Desenvolvedor especializado em técnicas de visão computacional e detecção de objetos em tempo real.',
          github: 'https://github.com/Deflyer',
        },
        {
          name: 'Lucas de Souza Brandão',
          role: 'Cientista de Dados',
          image: '/team/lucas-de-souza-brandao.png',
          bio: 'Especialista em modelos de visão computacional para reconhecimento de objetos.',
          github: 'https://github.com/sb-lucas',
        },
        {
          name: 'Gustavo Sampaio',
          role: 'Gerente de Projeto',
          image: '/team/ecovision/gustavo-sampaio.png',
          bio: 'Coordenador de projetos com experiência em visão computacional para impacto social.',
          github: 'https://github.com/GusSampaio',
        },
        {
          name: 'Pedro L. Figueiredo',
          role: 'Engenheiro de IA',
          image: '/team/ecovision/pedro-figueiredo.png',
          bio: 'Engenheiro especializado em implementação de modelos YOLO para detecção de objetos.',
          github: 'https://github.com/PedroLFigueiredo',
        },
      ],
    },
  },
];

// RAIA projects data - English
export const mockProjectsEn: MockProject[] = [
  {
    id: '1',
    title: 'Official Gazette Chat',
    description:
      'The Official Gazette Chat is an end-to-end solution that optimizes searching in large textual databases, such as the Belo Horizonte Official Gazette, using Retrieval Augmented Generation (RAG). It assists civil servants and professionals in navigating through extensive documents, providing efficient searches and time savings.',
    body: chatDiarioContent.en,
    image: '/projects/chat-diario-oficial/chat-diario-oficial.png',
    category: 'Natural Language Processing',
    iconType: 'RAG',
    date: '2024-02-15',
    language: 'en',
    technologies: ['NLP', 'Data Engineering', 'RAG', 'LLM'],
    github: 'https://github.com/gruporaia/Chat-Diario-Oficial',
    meta: {
      technologies: ['NLP', 'Data Engineering', 'RAG', 'LLM'],
      team: [
        {
          name: 'Alvaro Jose Lopes',
          role: 'Developer',
          image: '/team/chat-diario-oficial/alvaro-jose-lopes.png',
          bio: 'Contributed to the data ingestion phase, from design to implementation.',
          linkedin: 'https://www.linkedin.com/in/alvaro-jose-lopes/',
        },
        {
          name: 'Bernardo Marques Costa',
          role: 'Developer',
          image: '/team/chat-diario-oficial/bernardo-marques-costa.png',
          bio: 'Worked on the design and implementation of the tool, from data ingestion to creating the final application.',
          linkedin: 'https://www.linkedin.com/in/bernardo-marques-costa/',
          github: 'https://github.com/bmarquescost',
        },
        {
          name: 'Cecília Nunes Sedenho',
          role: 'Developer',
          image: '/team/cecilia-nunes-sedenho.png',
          bio: 'Contributed with testing of different language models and integration between data ingestion and model interaction.',
          linkedin:
            'https://www.linkedin.com/in/cec%C3%ADlia-nunes-sedenho-305059255/',
          github: 'https://github.com/HeNunes',
        },
        {
          name: 'Laura Fernandes Camargos',
          role: 'Developer',
          image: '/team/chat-diario-oficial/laura-fernandes-camargos.png',
          bio: 'Worked on RAG configuration testing and implementing the final application frontend.',
          linkedin:
            'https://www.linkedin.com/in/laura-fernandes-camargos-a26b89246/',
          github: 'https://github.com/laurafcamargos',
        },
        {
          name: 'Pedro Augusto Monteiro Delgado',
          role: 'Manager',
          image: '/team/pedro-augusto-monteiro-delgado.png',
          bio: 'Managed the team and project, and contributed to application testing.',
          linkedin: 'https://www.linkedin.com/in/pedroamdelgado',
          github: 'https://github.com/DelgadoPedro',
        },
      ],
    },
  },
  {
    id: '2',
    title: 'BEMU',
    description:
      'The project collects questions from Brazilian university entrance exams to evaluate multimodal AIs in Portuguese, combining PDF parsing, AI models, and LaTeX converters. The result is five datasets with over 5,000 questions, making the benchmarks more representative.',
    body: bemuContent.en,
    image: '/projects/bemu/bemu.png',
    category: 'Artificial Intelligence',
    iconType: 'Artificial Intelligence',
    date: '2024-03-20',
    language: 'en',
    technologies: ['Machine Learning', 'Computer Vision', 'NLP', 'LaTeX'],
    github: 'https://github.com/gruporaia/BEMU',
    featured: true,
    references: [
      {
        title:
          'Beyond English: Expanding the Horizon of Multimodal AI Evaluations',
        url: 'https://medium.com/@raia.diretoria/indo-al%C3%A9m-do-ingl%C3%AAs-ampliando-o-horizonte-de-avalia%C3%A7%C3%B5es-de-ias-multimodais-a5249af02f7a',
        type: 'article',
      },
    ],
    meta: {
      technologies: ['Machine Learning', 'Computer Vision', 'NLP', 'LaTeX'],
      team: [
        {
          name: 'Luísa Shimabucoro',
          role: 'Project Manager',
          image: '/team/luisa-shimabucoro.png',
          bio: 'Researcher in ML with focus on NLP and Computer Vision.',
          linkedin: 'https://www.linkedin.com/in/lushimabucoro/',
          github:
            'https://github.com/gruporaia/BEMU/commits?author=luisashimabucoro',
        },
        {
          name: 'Gabriel Merlin',
          role: 'Developer',
          image: '/team/gabriel-merlin.png',
          bio: 'Expert in Machine Learning and Deep Learning focused on Time Series.',
          linkedin: 'https://www.linkedin.com/in/gabrielcmerlin/',
        },
        {
          name: 'André Mitri',
          role: 'Data Engineer',
          image: '/team/bemu/andre-mitri.png',
          bio: 'Researcher in Time Series and Representation Learning with experience in web scraping.',
          linkedin: 'https://www.linkedin.com/in/andre-de-mitri/',
        },
        {
          name: 'Leticia Marchezi',
          role: 'Researcher',
          image: '/team/leticia-marchezi.png',
          bio: 'Researcher in NLP with experience in text extraction using multimodal models.',
          linkedin: 'https://www.linkedin.com/in/letmarchezi/',
        },
        {
          name: 'Otávio F. Coletti',
          role: 'Developer',
          image: '/team/bemu/otavio-coletti.png',
          bio: 'Developer specialized in PDF parsing and structured data extraction.',
          linkedin: 'https://www.linkedin.com/in/ot%C3%A1viocoletti-012/',
        },
      ],
    },
  },
  {
    id: '3',
    title: 'EcoVision',
    description:
      'EcoVision applies computer vision for safety in waste sorting, identifying dangerous objects in real-time.',
    body: ecoVisionContent.en,
    image: '/projects/ecovision/ecovision.png',
    category: 'Computer Vision',
    iconType: 'Computer Vision',
    date: '2025-05-19',
    language: 'en',
    technologies: ['YOLO v11', 'Computer Vision'],
    featured: false,
    github: 'https://github.com/gruporaia/EcoVision',
    meta: {
      technologies: ['YOLO v11', 'Computer Vision'],
      team: [
        {
          name: 'Artur De Vlieger Lima',
          role: 'Developer',
          image: '/team/ecovision/artur-de-vlieger-lima.png',
          bio: 'Developer specialized in computer vision techniques and real-time object detection.',
          github: 'https://github.com/Deflyer',
        },
        {
          name: 'Lucas de Souza Brandão',
          role: 'Data Scientist',
          image: '/team/lucas-de-souza-brandao.png',
          bio: 'Expert in computer vision models for object recognition.',
          github: 'https://github.com/sb-lucas',
        },
        {
          name: 'Gustavo Sampaio',
          role: 'Project Manager',
          image: '/team/ecovision/gustavo-sampaio.png',
          bio: 'Project coordinator with experience in computer vision for social impact.',
          github: 'https://github.com/GusSampaio',
        },
        {
          name: 'Pedro L. Figueiredo',
          role: 'AI Engineer',
          image: '/team/ecovision/pedro-figueiredo.png',
          bio: 'Engineer specialized in implementing YOLO models for object detection.',
          github: 'https://github.com/PedroLFigueiredo',
        },
      ],
    },
  },
];

// RAIA projects data - Spanish
export const mockProjectsEs: MockProject[] = [
  {
    id: '1',
    title: 'Chat Diario Oficial',
    description:
      'El Chat del Diario Oficial es una solución integral que optimiza la búsqueda en grandes bases de datos textuales, como el Diario Oficial de Belo Horizonte, utilizando Generación Aumentada por Recuperación (RAG). Ayuda a funcionarios y profesionales a navegar por documentos extensos, proporcionando búsquedas eficientes y ahorro de tiempo.',
    body: chatDiarioContent.es,
    image: '/projects/chat-diario-oficial/chat-diario-oficial.png',
    category: 'Procesamiento de Texto',
    iconType: 'RAG',
    date: '2024-02-15',
    language: 'es',
    technologies: ['NLP', 'Ingeniería de Datos', 'RAG', 'LLM'],
    github: 'https://github.com/gruporaia/Chat-Diario-Oficial',
    meta: {
      technologies: ['NLP', 'Ingeniería de Datos', 'RAG', 'LLM'],
      team: [
        {
          name: 'Alvaro Jose Lopes',
          role: 'Desarrollador',
          image: '/team/chat-diario-oficial/alvaro-jose-lopes.png',
          bio: 'Contribuyó con la etapa de ingestión de datos, desde su diseño hasta la implementación.',
          linkedin: 'https://www.linkedin.com/in/alvaro-jose-lopes/',
        },
        {
          name: 'Bernardo Marques Costa',
          role: 'Desarrollador',
          image: '/team/chat-diario-oficial/bernardo-marques-costa.png',
          bio: 'Trabajó en el diseño e implementación de la herramienta, desde la ingestión de datos hasta la creación de la aplicación final.',
          linkedin: 'https://www.linkedin.com/in/bernardo-marques-costa/',
          github: 'https://github.com/bmarquescost',
        },
        {
          name: 'Cecília Nunes Sedenho',
          role: 'Desarrolladora',
          image: '/team/cecilia-nunes-sedenho.png',
          bio: 'Contribuyó con pruebas de diferentes modelos de lenguaje e integración entre la ingestión de datos y la interacción con el modelo.',
          linkedin:
            'https://www.linkedin.com/in/cec%C3%ADlia-nunes-sedenho-305059255/',
          github: 'https://github.com/HeNunes',
        },
        {
          name: 'Laura Fernandes Camargos',
          role: 'Desarrolladora',
          image: '/team/chat-diario-oficial/laura-fernandes-camargos.png',
          bio: 'Trabajó en las pruebas de configuraciones RAG e implementó el frontend de la aplicación final.',
          linkedin:
            'https://www.linkedin.com/in/laura-fernandes-camargos-a26b89246/',
          github: 'https://github.com/laurafcamargos',
        },
        {
          name: 'Pedro Augusto Monteiro Delgado',
          role: 'Gerente',
          image: '/team/pedro-augusto-monteiro-delgado.png',
          bio: 'Gestionó el equipo y el proyecto, además de contribuir a las pruebas de la aplicación.',
          linkedin: 'https://www.linkedin.com/in/pedroamdelgado',
          github: 'https://github.com/DelgadoPedro',
        },
      ],
    },
  },
  {
    id: '2',
    title: 'BEMU',
    description:
      'El proyecto recopila preguntas de exámenes de ingreso universitario brasileños para evaluar IAs multimodales en portugués, combinando análisis de PDF, modelos de IA y conversores LaTeX. El resultado son cinco conjuntos de datos con más de 5.000 preguntas, haciendo los benchmarks más representativos.',
    body: bemuContent.es,
    image: '/projects/bemu/bemu.png',
    category: 'Inteligencia Artificial',
    iconType: 'Artificial Intelligence',
    date: '2024-03-20',
    language: 'es',
    technologies: ['Machine Learning', 'Computer Vision', 'NLP', 'LaTeX'],
    github: 'https://github.com/gruporaia/BEMU',
    featured: true,
    references: [
      {
        title:
          'Más allá del inglés: ampliando el horizonte de evaluaciones de IAs multimodales',
        url: 'https://medium.com/@raia.diretoria/indo-al%C3%A9m-do-ingl%C3%AAs-ampliando-o-horizonte-de-avalia%C3%A7%C3%B5es-de-ias-multimodais-a5249af02f7a',
        type: 'article',
      },
    ],
    meta: {
      technologies: ['Machine Learning', 'Computer Vision', 'NLP', 'LaTeX'],
      team: [
        {
          name: 'Luísa Shimabucoro',
          role: 'Gerente de Proyecto',
          image: '/team/luisa-shimabucoro.png',
          bio: 'Investigadora en ML con enfoque en PLN y Visión por Computadora.',
          linkedin: 'https://www.linkedin.com/in/lushimabucoro/',
          github:
            'https://github.com/gruporaia/BEMU/commits?author=luisashimabucoro',
        },
        {
          name: 'Gabriel Merlin',
          role: 'Desarrollador',
          image: '/team/gabriel-merlin.png',
          bio: 'Experto en Machine Learning y Deep Learning enfocado en Series Temporales.',
          linkedin: 'https://www.linkedin.com/in/gabrielcmerlin/',
        },
        {
          name: 'André Mitri',
          role: 'Ingeniero de Datos',
          image: '/team/bemu/andre-mitri.png',
          bio: 'Investigador en Series Temporales y Aprendizaje de Representación con experiencia en web scraping.',
          linkedin: 'https://www.linkedin.com/in/andre-de-mitri/',
        },
        {
          name: 'Leticia Marchezi',
          role: 'Investigadora',
          image: '/team/leticia-marchezi.png',
          bio: 'Investigadora en PLN con experiencia en extracción de textos utilizando modelos multimodales.',
          linkedin: 'https://www.linkedin.com/in/letmarchezi/',
        },
        {
          name: 'Otávio F. Coletti',
          role: 'Desarrollador',
          image: '/team/bemu/otavio-coletti.png',
          bio: 'Desarrollador especializado en análisis de PDF y extracción de datos estructurados.',
          linkedin: 'https://www.linkedin.com/in/ot%C3%A1viocoletti-012/',
        },
      ],
    },
  },
  {
    id: '3',
    title: 'EcoVision',
    description:
      'EcoVision aplica visión por computadora para la seguridad en la clasificación de residuos, identificando objetos peligrosos en tiempo real.',
    body: ecoVisionContent.es,
    image: '/projects/ecovision/ecovision.png',
    category: 'Visión Computacional',
    iconType: 'Computer Vision',
    date: '2025-05-19',
    language: 'es',
    technologies: ['YOLO v11', 'Computer Vision'],
    featured: false,
    github: 'https://github.com/gruporaia/EcoVision',
    meta: {
      technologies: ['YOLO v11', 'Computer Vision'],
      team: [
        {
          name: 'Artur De Vlieger Lima',
          role: 'Desarrollador',
          image: '/team/ecovision/artur-de-vlieger-lima.png',
          bio: 'Desarrollador especializado en técnicas de visión por computadora y detección de objetos en tiempo real.',
          github: 'https://github.com/Deflyer',
        },
        {
          name: 'Lucas de Souza Brandão',
          role: 'Científico de Datos',
          image: '/team/lucas-de-souza-brandao.png',
          bio: 'Experto en modelos de visión por computadora para el reconocimiento de objetos.',
          github: 'https://github.com/sb-lucas',
        },
        {
          name: 'Gustavo Sampaio',
          role: 'Gerente de Proyecto',
          image: '/team/ecovision/gustavo-sampaio.png',
          bio: 'Coordinador de proyectos con experiencia en visión por computadora para impacto social.',
          github: 'https://github.com/GusSampaio',
        },
        {
          name: 'Pedro L. Figueiredo',
          role: 'Ingeniero de IA',
          image: '/team/ecovision/pedro-figueiredo.png',
          bio: 'Ingeniero especializado en la implementación de modelos YOLO para la detección de objetos.',
          github: 'https://github.com/PedroLFigueiredo',
        },
      ],
    },
  },
];

export const mockProjects: MockProject[] = [
  ...mockProjectsPt,
  ...mockProjectsEn,
  ...mockProjectsEs,
];

export const projectHandlers = [
  http.get('/api/projects', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '9');
    const lang = url.searchParams.get('lang') || 'pt';

    // Filter projects by language
    const filteredProjects = mockProjects.filter(
      (project) =>
        project.language === lang || (lang === 'pt' && !project.language)
    );

    const start = (page - 1) * limit;
    const end = Math.min(start + limit, filteredProjects.length);
    const paginatedProjects = filteredProjects.slice(start, end);

    return HttpResponse.json({
      projects: paginatedProjects,
      totalPages: Math.ceil(filteredProjects.length / limit),
      currentPage: page,
      totalItems: filteredProjects.length,
    });
  }),

  http.get('/api/projects/:id', ({ params, request }) => {
    const { id } = params;
    const url = new URL(request.url);
    const lang = url.searchParams.get('lang') || 'pt';

    // Find project with the specified language
    let project = mockProjects.find((p) => p.id === id && p.language === lang);

    // If not found and language is not Portuguese, fallback to Portuguese
    if (!project && lang !== 'pt') {
      project = mockProjects.find(
        (p) => p.id === id && (p.language === 'pt' || !p.language)
      );

      if (project) {
        return HttpResponse.json({
          ...project,
          langUsed: 'pt',
        });
      }
    }

    if (project) {
      return HttpResponse.json({
        ...project,
        langUsed: project.language || 'pt',
      });
    }

    return HttpResponse.json(
      { error: `Projeto não encontrado: ${id}` },
      { status: 404 }
    );
  }),
];
