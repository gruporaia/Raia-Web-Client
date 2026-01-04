import { Paper, Typography, useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import ContentDetailPage, {
  MetaDisplay,
  SidebarConfig,
} from '../components/content/ContentDetailPage';
import PageHelmet from '../components/translation/PageHelmet';
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

  const metaSections: MetaDisplay[] = [];

  // Add location if available
  if (event?.location) {
    metaSections.push({
      icon: 'LocationOnIcon',
      label: getEventText<string>('meta.location'),
      value: event.location,
    });
  }

  // Add date
  if (event?.date) {
    metaSections.push({
      icon: 'EventIcon',
      label: getEventText<string>('meta.date'),
      value: new Date(event.date).toLocaleDateString(),
    });
  }

  // Add end date if different from start date
  if (event?.endDate && event.endDate !== event.date) {
    metaSections.push({
      icon: 'EventIcon',
      label: getEventText<string>('meta.endDate'),
      value: new Date(event.endDate).toLocaleDateString(),
    });
  }

  // Add category
  if (event?.category) {
    metaSections.push({
      icon: 'CategoryIcon',
      label: getEventText<string>('meta.category'),
      value: event.category,
    });
  }

  // Add participants count if available
  if (event?.meta?.participants) {
    metaSections.push({
      icon: 'GroupsIcon',
      label: getEventText<string>('meta.participants'),
      value: `${event.meta.participants}`,
    });
  }

  // Add speakers count if available
  if (event?.meta?.speakers) {
    metaSections.push({
      icon: 'MicIcon',
      label: getEventText<string>('meta.speakers'),
      value: `${event.meta.speakers}`,
    });
  }

  const sidebarConfig: SidebarConfig = {
    showAuthorCard: false,
    showRelatedContent: false,
    metaDisplay: metaSections,
  };

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
        />
      </PageHelmet>
    </BaseLayout>
  );
};

export default EventDetails;
