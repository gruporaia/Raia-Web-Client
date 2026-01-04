import { Box, Container, Paper, Typography, useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import ContentDetailPage, {
  MetaDisplay,
  SidebarConfig,
} from '../components/content/ContentDetailPage';
import PageHelmet from '../components/translation/PageHelmet';
import PartnerCarousel from '../components/ui/PartnerCarousel';
import { useContentById } from '../hooks/useContent';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { MockEvent } from '../services/events';
import { CATEGORY_ICONS } from '../utils/iconMappings';
import { getEventIdFromSlug } from '../utils/slugUtils';

const EventDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const theme = useTheme();

  // Convert slug to ID for the existing hook
  const eventId = slug ? getEventIdFromSlug(slug) || undefined : undefined;

  const { getContent: getEventText } = useLocalizedContent(
    'screens',
    'eventDetail'
  );
  const { getContent: getNavText } = useLocalizedContent('navigation', 'menu');

  const { document: event } = useContentById<MockEvent>('events', eventId);

  const categoryIconMap = useMemo(() => CATEGORY_ICONS, []);

  // Create breadcrumbs
  const breadcrumbs = useMemo(
    () => [
      {
        label: getNavText<string>('home'),
        href: ROUTES.PUBLIC.HOME.path,
      },
      {
        label: getNavText<string>('events'),
        href: ROUTES.EVENTS.ROOT.path,
      },
      {
        label: event?.title || slug || '',
      },
    ],
    [getNavText, event, slug]
  );

  if (!slug) {
    return (
      <BaseLayout>
        <Paper sx={{ p: 3, m: 3, borderRadius: theme.shape.borderRadius }}>
          <Typography variant="h5" color="error">
            Invalid event slug
          </Typography>
        </Paper>
      </BaseLayout>
    );
  }

  // Create sidebar metadata sections
  const metaSections: MetaDisplay[] = useMemo(() => {
    const sections: MetaDisplay[] = [];

    // Basic Info Section
    const basicInfo: MetaDisplay = {
      title: getEventText<string>('sections.basicInfo'),
      values: [],
    };

    if (event?.location) {
      basicInfo.values.push({
        label: getEventText<string>('meta.location'),
        value: event.location,
      });
    }

    if (event?.date) {
      basicInfo.values.push({
        label: getEventText<string>('meta.date'),
        value: new Date(event.date).toLocaleDateString(),
      });
    }

    if (event?.endDate && event.endDate !== event.date) {
      basicInfo.values.push({
        label: getEventText<string>('meta.endDate'),
        value: new Date(event.endDate).toLocaleDateString(),
      });
    }

    if (event?.category) {
      basicInfo.values.push({
        label: getEventText<string>('meta.category'),
        value: event.category,
      });
    }

    if (basicInfo.values.length > 0) {
      sections.push(basicInfo);
    }

    // Event Statistics Section (only for RAIA Conference)
    if (eventId === '1' && event?.meta) {
      const stats: MetaDisplay = {
        title: getEventText<string>('sections.statistics'),
        values: [],
      };

      if (event.meta.participants) {
        stats.values.push({
          label: '',
          value: (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  color: 'primary.main',
                  fontSize: { xs: '2.5rem', md: '3rem' },
                }}
              >
                +{event.meta.participants}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {getEventText<string>('stats.participants')}
              </Typography>
            </Box>
          ),
        });
      }

      if (event.meta.speakers) {
        stats.values.push({
          label: '',
          value: (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  color: 'primary.main',
                  fontSize: { xs: '2.5rem', md: '3rem' },
                }}
              >
                {event.meta.speakers}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {getEventText<string>('stats.speakers')}
              </Typography>
            </Box>
          ),
        });
      }

      if (event.meta.youtubeViews) {
        stats.values.push({
          label: '',
          value: (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  color: 'primary.main',
                  fontSize: { xs: '2.5rem', md: '3rem' },
                }}
              >
                +{event.meta.youtubeViews}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {getEventText<string>('stats.youtubeViews')}
              </Typography>
            </Box>
          ),
        });
      }

      if (stats.values.length > 0) {
        sections.push(stats);
      }
    }

    return sections;
  }, [event, eventId, getEventText]);

  const sidebarConfig: SidebarConfig = {
    metaSections,
  };

  // Extract sponsors from the event body (looking for sponsor names)
  const sponsors = useMemo(() => {
    if (!event?.body) return [];

    // Map sponsor names to their logo file names in public/partners
    const sponsorMap: Record<string, string> = {
      TRACTIAN: 'tractian.png',
      Nubank: 'nubank.png',
      'BTG Pactual': 'btgpactual.png',
      Griaule: 'griaule.png',
      beuni: 'beuni.png',
    };

    return Object.entries(sponsorMap)
      .filter(([name]) => event.body?.includes(`**${name}**`))
      .map(([name, filename]) => ({
        name,
        src: `/partners/${filename}`,
      }));
  }, [event?.body]);

  // Create afterContent with sponsors carousel and YouTube video
  const afterContent = useMemo(() => {
    if (!event) return null;

    return (
      <>
        {/* Sponsors Section */}
        {sponsors.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                color: 'text.primary',
                fontWeight: 500,
                mb: 4,
                textAlign: 'center',
              }}
            >
              {getEventText<string>('meta.sponsorsTitle')}
            </Typography>
            <Box
              sx={{
                bgcolor: 'background.default',
                py: 4,
                px: 2,
                borderRadius: 1,
              }}
            >
              <PartnerCarousel logos={sponsors} logoSize={200} />
            </Box>
          </Box>
        )}

        {/* YouTube Video Section */}
        {event.videoUrl && (
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                color: 'text.primary',
                fontWeight: 500,
                mb: 4,
                textAlign: 'center',
              }}
            >
              {getEventText<string>('meta.videoTitle')}
            </Typography>
            <Box
              sx={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                src={event.videoUrl}
                title={event.title}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </Box>
          </Box>
        )}
      </>
    );
  }, [event, sponsors, getEventText]);

  return (
    <BaseLayout>
      <PageHelmet
        title={event?.title || 'Event Details'}
        description={event?.description || 'Detailed event information'}
        translationNamespace="screens"
        translationKey="eventDetail"
      >
        <ContentDetailPage
          resource="events"
          i18nBase="screens.eventDetail"
          translationNamespace="eventDetail"
          id={eventId || ''}
          breadcrumbs={breadcrumbs}
          linkToList={ROUTES.EVENTS.ROOT.path}
          sidebar={sidebarConfig}
          categoryIconMap={categoryIconMap}
          afterContent={afterContent}
        />
      </PageHelmet>
    </BaseLayout>
  );
};

export default EventDetails;
