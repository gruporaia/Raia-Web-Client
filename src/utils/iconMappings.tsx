import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessIcon from '@mui/icons-material/Business';
import ChatIcon from '@mui/icons-material/Chat';
import CodeIcon from '@mui/icons-material/Code';
import DevicesIcon from '@mui/icons-material/Devices';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SchoolIcon from '@mui/icons-material/School';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SpeedIcon from '@mui/icons-material/Speed';
import StorageIcon from '@mui/icons-material/Storage';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WorkIcon from '@mui/icons-material/Work';
import { SvgIcon } from '@mui/material';

/**
 * Central mapping of category names to their corresponding icon components
 * Used across the application for consistent category icon display
 */
export const CATEGORY_ICONS: Record<string, typeof SvgIcon> = {
  // General categories
  Project: WorkIcon,

  // Domain categories
  Energy: EnergySavingsLeafIcon,
  Healthcare: HealthAndSafetyIcon,
  Salud: HealthAndSafetyIcon,
  Finance: MonetizationOnIcon,
  Finanzas: MonetizationOnIcon,
  Finanças: MonetizationOnIcon,
  'E-commerce': ShoppingCartIcon,
  'Comercio Electrónico': ShoppingCartIcon,
  'Smart Cities': LocationCityIcon,
  'Ciudades Inteligentes': LocationCityIcon,
  'Cidades Inteligentes': LocationCityIcon,
  Education: SchoolIcon,
  Educación: SchoolIcon,
  Educação: SchoolIcon,

  // AI and ML categories
  'Artificial Intelligence': PsychologyIcon,
  'Inteligência Artificial': PsychologyIcon,
  'Inteligencia Artificial': PsychologyIcon,
  IA: PsychologyIcon,
  'Machine Learning': PsychologyIcon,
  'Computer Vision': VisibilityIcon,
  'Visão Computacional': VisibilityIcon,
  'Visión Computacional': VisibilityIcon,
  'Natural Language Processing': ChatIcon,
  'Processamento de Texto': ChatIcon,
  'Processamento de Linguagem Natural': ChatIcon,
  'Procesamiento de Texto': ChatIcon,
  NLP: ChatIcon,
  RAG: ChatIcon,
  Analytics: BarChartIcon,
  'Análise de Dados': BarChartIcon,
  'Data Science': StorageIcon,

  // Blog categories
  Development: CodeIcon,
  Desarrollo: CodeIcon,
  Desenvolvimento: CodeIcon,
  Technology: DevicesIcon,
  Tecnología: DevicesIcon,
  Tecnologia: DevicesIcon,
  Performance: SpeedIcon,
  Rendimiento: SpeedIcon,
  Desempenho: SpeedIcon,
  Business: BusinessIcon,
  Negocios: BusinessIcon,
  Negócios: BusinessIcon,
  Analítica: BarChartIcon,
  Análise: BarChartIcon,
};

/**
 * Legacy string-based category icon mapping
 * Maintained for backwards compatibility
 */
export const PROJECT_CATEGORY_ICONS_STRINGS = {
  // English categories
  'Artificial Intelligence': 'PsychologyIcon',
  'Computer Vision': 'VisibilityIcon',
  'Natural Language Processing': 'ChatIcon',
  'Data Science': 'StorageIcon',

  // Portuguese categories
  'Inteligência Artificial': 'PsychologyIcon',
  'Visão Computacional': 'VisibilityIcon',
  'Processamento de Texto': 'ChatIcon',
  'Processamento de Linguagem Natural': 'ChatIcon',
  'Análise de Dados': 'BarChartIcon',
  IA: 'PsychologyIcon',

  // Spanish categories
  'Inteligencia Artificial': 'PsychologyIcon',
  'Visión Computacional': 'VisibilityIcon',
  'Procesamiento de Texto': 'ChatIcon',

  // Common abbreviations and terms
  Analytics: 'BarChartIcon',
  NLP: 'ChatIcon',
  RAG: 'ChatIcon',
  'Machine Learning': 'PsychologyIcon',
};

/**
 * Blog category icon mapping
 * @deprecated Use CATEGORY_ICONS instead
 */
export const BLOG_CATEGORY_ICONS_STRINGS = {
  Development: 'CodeIcon',
  Desarrollo: 'CodeIcon',
  Desenvolvimento: 'CodeIcon',
  'Artificial Intelligence': 'PsychologyIcon',
  'Inteligencia Artificial': 'PsychologyIcon',
  'Inteligência Artificial': 'PsychologyIcon',
  Performance: 'SpeedIcon',
  Rendimiento: 'SpeedIcon',
  Desempenho: 'SpeedIcon',
  Technology: 'DevicesIcon',
  Tecnología: 'DevicesIcon',
  Tecnologia: 'DevicesIcon',
  Business: 'BusinessIcon',
  Negocios: 'BusinessIcon',
  Negócios: 'BusinessIcon',
  Education: 'SchoolIcon',
  Educación: 'SchoolIcon',
  Educação: 'SchoolIcon',
  Analytics: 'BarChartIcon',
  Analítica: 'BarChartIcon',
  Análise: 'BarChartIcon',
};
