import ApiIcon from '@mui/icons-material/Api';
import ArticleIcon from '@mui/icons-material/Article';
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessIcon from '@mui/icons-material/Business';
import CloudIcon from '@mui/icons-material/Cloud';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import DevicesIcon from '@mui/icons-material/Devices';
import HackathonIcon from '@mui/icons-material/EmojiEvents';
import EventIcon from '@mui/icons-material/Event';
import ImageIcon from '@mui/icons-material/Image';
import PersonIcon from '@mui/icons-material/Person';
import PodcastIcon from '@mui/icons-material/Podcasts';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import StorageIcon from '@mui/icons-material/Storage';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import WorkIcon from '@mui/icons-material/Work';
import { Box, SvgIcon } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { borderRadius, layout } from '../../theme/themeUtils';
import { useThemeValues } from '../../theme/useThemeValues';

export type PlaceholderType =
  | 'blog'
  | 'project'
  | 'generic'
  | 'service'
  | 'team'
  | 'web'
  | 'mobile'
  | 'design'
  | 'marketing'
  | 'consulting'
  | 'cloud'
  | 'ai'
  | 'data'
  | 'security'
  | 'ecommerce'
  | 'software'
  | 'support'
  | 'integration'
  | 'analytics'
  | 'ai-project'
  | 'fellowship'
  | 'event'
  | 'hackathon'
  | 'education'
  | 'podcast'
  | 'video-content';

interface PlaceholderImageProps {
  type?: PlaceholderType;
  title?: string;
  width?: string | number;
  height?: string | number;
  aspectRatio?: string;
  iconSize?: 'small' | 'medium' | 'large';
  customIcon?: React.ReactNode;
  category?: string;
  categoryIconMap?: Record<string, typeof SvgIcon>;
  iconComponent?: typeof SvgIcon;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  type = 'generic',
  title,
  width = '100%',
  height = 'auto',
  aspectRatio = '16/9',
  iconSize = 'large',
  customIcon,
  category,
  categoryIconMap,
}) => {
  const { color, isDarkMode, theme } = useThemeValues();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const iconSizeMap = {
    small: 24,
    medium: 40,
    large: 64,
  };

  const iconSizeInPx = iconSizeMap[iconSize] || 40;

  const getBgColor = () => {
    switch (type) {
      case 'blog':
        return isDarkMode
          ? `${theme.palette.primary.dark}15`
          : `${theme.palette.primary.light}08`;
      case 'project':
        return isDarkMode
          ? `${theme.palette.secondary.dark}15`
          : `${theme.palette.secondary.light}08`;
      case 'service':
        return isDarkMode
          ? `${theme.palette.primary.main}12`
          : `${theme.palette.primary.light}08`;
      case 'team':
        return isDarkMode
          ? `${theme.palette.secondary.main}15`
          : `${theme.palette.secondary.light}08`;
      case 'web':
        return isDarkMode
          ? `${theme.palette.primary.dark}15`
          : `${theme.palette.primary.light}08`;
      case 'mobile':
        return isDarkMode
          ? `${theme.palette.primary.main}15`
          : `${theme.palette.primary.light}10`;
      case 'design':
        return isDarkMode
          ? `${theme.palette.secondary.main}15`
          : `${theme.palette.secondary.light}10`;
      case 'marketing':
        return isDarkMode
          ? `${theme.palette.primary.dark}18`
          : `${theme.palette.primary.light}12`;
      case 'consulting':
        return isDarkMode
          ? `${theme.palette.secondary.dark}15`
          : `${theme.palette.secondary.light}10`;
      case 'cloud':
        return isDarkMode
          ? `${theme.palette.info.dark}15`
          : `${theme.palette.info.light}10`;
      case 'ai':
        return isDarkMode
          ? `${theme.palette.secondary.dark}20`
          : `${theme.palette.secondary.light}15`;
      case 'data':
        return isDarkMode
          ? `${theme.palette.info.dark}18`
          : `${theme.palette.info.light}12`;
      case 'security':
        return isDarkMode
          ? `${theme.palette.error.dark}15`
          : `${theme.palette.error.light}08`;
      case 'ecommerce':
        return isDarkMode
          ? `${theme.palette.success.dark}15`
          : `${theme.palette.success.light}08`;
      case 'software':
        return isDarkMode
          ? `${theme.palette.primary.dark}18`
          : `${theme.palette.primary.light}12`;
      case 'support':
        return isDarkMode
          ? `${theme.palette.info.main}15`
          : `${theme.palette.info.light}08`;
      case 'integration':
        return isDarkMode
          ? `${theme.palette.warning.dark}15`
          : `${theme.palette.warning.light}08`;
      case 'analytics':
        return isDarkMode
          ? `${theme.palette.info.dark}20`
          : `${theme.palette.info.light}15`;
      // New RAIA specific backgrounds
      case 'ai-project':
        return isDarkMode
          ? `${theme.palette.secondary.dark}25`
          : `${theme.palette.secondary.light}18`;
      case 'fellowship':
        return isDarkMode
          ? `${theme.palette.primary.dark}22`
          : `${theme.palette.primary.light}15`;
      case 'event':
        return isDarkMode
          ? `${theme.palette.warning.dark}18`
          : `${theme.palette.warning.light}12`;
      case 'hackathon':
        return isDarkMode
          ? `${theme.palette.success.dark}20`
          : `${theme.palette.success.light}15`;
      case 'education':
        return isDarkMode
          ? `${theme.palette.info.dark}22`
          : `${theme.palette.info.light}15`;
      case 'podcast':
        return isDarkMode
          ? `${theme.palette.secondary.main}18`
          : `${theme.palette.secondary.light}12`;
      case 'video-content':
        return isDarkMode
          ? `${theme.palette.error.main}15`
          : `${theme.palette.error.light}10`;
      default:
        return isDarkMode ? color('background.paper') : color('grey.100');
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'blog':
        return color('primary.main');
      case 'project':
        return color('secondary.main');
      case 'service':
        return color('primary.main');
      case 'team':
        return color('secondary.main');
      case 'web':
        return color('primary.dark');
      case 'mobile':
        return color('primary.main');
      case 'design':
        return color('secondary.main');
      case 'marketing':
        return color('primary.dark');
      case 'consulting':
        return color('secondary.dark');
      case 'cloud':
        return color('info.main');
      case 'ai':
        return color('secondary.dark');
      case 'data':
        return color('info.dark');
      case 'security':
        return color('error.main');
      case 'ecommerce':
        return color('success.main');
      case 'software':
        return color('primary.dark');
      case 'support':
        return color('info.main');
      case 'integration':
        return color('warning.dark');
      case 'analytics':
        return color('info.dark');
      // RAIA specific colors
      case 'ai-project':
        return color('secondary.dark');
      case 'fellowship':
        return color('primary.dark');
      case 'event':
        return color('warning.dark');
      case 'hackathon':
        return color('success.dark');
      case 'education':
        return color('info.dark');
      case 'podcast':
        return color('secondary.main');
      case 'video-content':
        return color('error.main');
      default:
        return isDarkMode ? color('grey.400') : color('grey.500');
    }
  };

  // Choose the appropriate icon component
  const getIconComponent = () => {
    if (category && categoryIconMap && categoryIconMap[category]) {
      return categoryIconMap[category];
    }
    switch (type) {
      case 'blog':
        return ArticleIcon;
      case 'project':
        return WorkIcon;
      case 'service':
        return BusinessIcon;
      case 'team':
        return PersonIcon;
      case 'web':
        return CodeIcon;
      case 'mobile':
        return DevicesIcon;
      case 'design':
        return DesignServicesIcon;
      case 'marketing':
        return BusinessIcon;
      case 'consulting':
        return PresentToAllIcon;
      case 'cloud':
        return CloudIcon;
      case 'ai':
        return SmartToyIcon;
      case 'data':
        return StorageIcon;
      case 'security':
        return SecurityIcon;
      case 'ecommerce':
        return ShoppingCartIcon;
      case 'software':
        return DeveloperModeIcon;
      case 'support':
        return SupportAgentIcon;
      case 'integration':
        return ApiIcon;
      case 'analytics':
        return BarChartIcon;
      // New RAIA specific icons
      case 'ai-project':
        return PsychologyIcon;
      case 'fellowship':
        return SchoolIcon;
      case 'event':
        return EventIcon;
      case 'hackathon':
        return HackathonIcon;
      case 'education':
        return SchoolIcon;
      case 'podcast':
        return PodcastIcon;
      case 'video-content':
        return VideoLibraryIcon;
      default:
        return ImageIcon;
    }
  };

  const IconComponent = getIconComponent();

  return (
    <Box
      sx={{
        width,
        height,
        aspectRatio,
        backgroundColor: getBgColor(),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: getIconColor(),
        borderRadius: borderRadius.xs,
        overflow: 'hidden',
        minHeight: `${layout.minContentHeight}px`,
        transition: 'background-color 0.3s ease, color 0.3s ease',
        opacity: isLoaded ? 1 : 0.8,
      }}
      role="img"
      aria-label={title || `${type} placeholder image`}
    >
      {customIcon || (
        <SvgIcon
          component={IconComponent}
          sx={{
            fontSize: iconSizeInPx,
            width: iconSizeInPx,
            height: iconSizeInPx,
            display: 'block',
            transition: 'color 0.3s ease',
          }}
        />
      )}
      {title && (
        <Box
          component="span"
          sx={{
            mt: 1,
            px: 2,
            maxWidth: '100%',
            textAlign: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </Box>
      )}
    </Box>
  );
};

export default PlaceholderImage;
