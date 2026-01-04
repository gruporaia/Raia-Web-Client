import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ContentListPage, {
  HeroButton,
} from '../components/content/ContentListPage';
import { ContentItem } from '../components/ui/Card/ContentCard';
import LoadingIndicator from '../components/ui/LoadingIndicator';
import { usePaginatedContent } from '../hooks/useContent';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { fetchEvents, MockEvent } from '../services/events';
import { CATEGORY_ICONS } from '../utils/iconMappings';
import { createScrollRoute } from '../utils/navigationUtils';
import { getEventSlug } from '../utils/slugUtils';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`event-tabpanel-${index}`}
      aria-labelledby={`event-tab-${index}`}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const Events: React.FC = () => {
  const params = useParams<{ page?: string }>();
  const navigate = useNavigate();
  const initialPage = params.page ? parseInt(params.page, 10) : 1;
  const [tabValue, setTabValue] = useState(0);

  const { getContent: getEventContent } = useLocalizedContent(
    'screens',
    'events'
  );
  const { getContent: getNavContent } = useLocalizedContent(
    'navigation',
    'menu'
  );

  // We'll fetch data directly since we need more control for status filtering
  const [upcomingEvents, setUpcomingEvents] = React.useState<MockEvent[]>([]);
  const [completedEvents, setCompletedEvents] = React.useState<MockEvent[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        // Get both upcoming and completed events
        const upcomingData = await fetchEvents(
          1,
          100,
          undefined,
          undefined,
          'upcoming'
        );
        const completedData = await fetchEvents(
          1,
          100,
          undefined,
          undefined,
          'completed'
        );

        setUpcomingEvents(upcomingData.events);
        setCompletedEvents(completedData.events);
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const heroButtons: HeroButton[] = [
    {
      text: getEventContent<string>('hero.buttonText'),
      onClick: () =>
        navigate(
          createScrollRoute(ROUTES.PUBLIC.CONTACT.path, 'contact-section')
        ),
      variant: 'contained',
      color: 'primary',
    },
  ];

  const breadcrumbs = [
    {
      label: getNavContent<string>('home'),
      href: ROUTES.PUBLIC.HOME.path,
    },
    {
      label: getNavContent<string>('events'),
    },
  ];

  const mapToContentItems = useMemo(() => {
    return (items: MockEvent[]): ContentItem[] => {
      return items.map((item) => {
        const slug = getEventSlug(String(item.id), item.title);

        return {
          id: item.id,
          title: item.title,
          description: item.description,
          image: item.image,
          category: item.category || 'Event',
          ctaLink: ROUTES.EVENTS.EVENT_DETAIL({ slug }),
          ctaText: getEventContent<string>('content.viewDetails'),
          date: item.date,
          tags: item.meta?.technologies || [],
          featured: item.featured || false,
        };
      });
    };
  }, [getEventContent]);

  const categoryIconMap = useMemo(() => CATEGORY_ICONS, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <BaseLayout>
        <LoadingIndicator message="Loading events..." fullHeight />
      </BaseLayout>
    );
  }

  const upcomingContentItems = mapToContentItems(upcomingEvents);
  const completedContentItems = mapToContentItems(completedEvents);

  return (
    <BaseLayout>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="event sections"
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
        >
          <Tab
            label={getEventContent<string>('tabs.upcoming')}
            id="event-tab-0"
            icon={
              <span>
                {upcomingEvents.length > 0 ? `(${upcomingEvents.length})` : ''}
              </span>
            }
            iconPosition="end"
          />
          <Tab
            label={getEventContent<string>('tabs.completed')}
            id="event-tab-1"
            icon={
              <span>
                {completedEvents.length > 0
                  ? `(${completedEvents.length})`
                  : ''}
              </span>
            }
            iconPosition="end"
          />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          {upcomingContentItems.length > 0 ? (
            <ContentListPage
              resource="events"
              i18nBase="screens.events"
              currentPage={initialPage}
              itemsPerPage={9}
              heroButtons={heroButtons}
              linkToItem={(id) => ROUTES.EVENTS.EVENT_DETAIL({ id })}
              linkToPage={(page) => ROUTES.EVENTS.LIST_PAGED({ page })}
              breadcrumbs={breadcrumbs}
              contentSectionId="events-section"
              mapToContentItems={mapToContentItems}
              categoryIconMap={categoryIconMap}
              items={upcomingEvents}
              totalPages={1}
              totalItems={upcomingEvents.length}
            />
          ) : (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                {getEventContent<string>('noUpcomingEvents')}
              </Typography>
            </Box>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {completedContentItems.length > 0 ? (
            <ContentListPage
              resource="events"
              i18nBase="screens.events"
              currentPage={initialPage}
              itemsPerPage={9}
              heroButtons={heroButtons}
              linkToItem={(id) => ROUTES.EVENTS.EVENT_DETAIL({ id })}
              linkToPage={(page) => ROUTES.EVENTS.LIST_PAGED({ page })}
              breadcrumbs={breadcrumbs}
              contentSectionId="events-section"
              mapToContentItems={mapToContentItems}
              categoryIconMap={categoryIconMap}
              items={completedEvents}
              totalPages={1}
              totalItems={completedEvents.length}
            />
          ) : (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                {getEventContent<string>('noCompletedEvents')}
              </Typography>
            </Box>
          )}
        </TabPanel>
      </Box>
    </BaseLayout>
  );
};

export default Events;
