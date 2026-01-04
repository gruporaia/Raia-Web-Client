import { Box, Container } from '@mui/material';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import ContentListPage, {
  HeroButton,
} from '../components/content/ContentListPage';
import { ContentItem } from '../components/ui/Card/ContentCard';
import LoadingIndicator from '../components/ui/LoadingIndicator';
import HeroSection from '../components/ui/Section/HeroSection';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { fetchEvents, MockEvent } from '../services/events';
import { CATEGORY_ICONS } from '../utils/iconMappings';
import { createScrollRoute } from '../utils/navigationUtils';
import { getEventSlug } from '../utils/slugUtils';

const Events: React.FC = () => {
  const navigate = useNavigate();

  const { getContent: getEventContent } = useLocalizedContent(
    'screens',
    'events'
  );
  const { getContent: getNavContent } = useLocalizedContent(
    'navigation',
    'menu'
  );

  // Fetch all events (no status filtering - we'll show all)
  const [allEvents, setAllEvents] = React.useState<MockEvent[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        // Get upcoming events
        const upcomingData = await fetchEvents(
          1,
          100,
          undefined,
          undefined,
          'upcoming'
        );
        // Get completed events
        const completedData = await fetchEvents(
          1,
          100,
          undefined,
          undefined,
          'completed'
        );

        // Combine all events
        setAllEvents([...upcomingData.events, ...completedData.events]);
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
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison
        const eventDate = new Date(item.date);
        eventDate.setHours(0, 0, 0, 0);

        const isUpcoming = eventDate >= today;

        // Calculate days left for upcoming events
        let badge = undefined;
        if (isUpcoming) {
          const daysLeft = Math.ceil(
            (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
          );
          if (daysLeft === 0) {
            badge = 'TODAY';
          } else if (daysLeft === 1) {
            badge = '1 DAY LEFT';
          } else {
            badge = `${daysLeft} DAYS LEFT`;
          }
        }

        return {
          id: item.id,
          title: item.title,
          description: item.description,
          image: item.image,
          category: item.category || 'Event',
          ctaLink: ROUTES.EVENTS.EVENT_DETAIL({ slug }),
          ctaText: getEventContent<string>('content.viewDetails'),
          date: item.date,
          badge,
          tags: [],
          featured: item.featured || false,
        };
      });
    };
  }, [getEventContent]);

  const categoryIconMap = useMemo(() => CATEGORY_ICONS, []);

  if (loading) {
    return (
      <BaseLayout>
        <LoadingIndicator message="Loading events..." fullHeight />
      </BaseLayout>
    );
  }

  const allContentItems = mapToContentItems(allEvents);

  return (
    <BaseLayout>
      <HeroSection
        title={getEventContent<string>('hero.title')}
        subtitle={getEventContent<string>('hero.subtitle')}
        buttons={[
          {
            text: getEventContent<string>('hero.buttonText'),
            onClick: () =>
              navigate(
                createScrollRoute(ROUTES.PUBLIC.CONTACT.path, 'contact-section')
              ),
          },
        ]}
      />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* All Events in Grid */}
        {allContentItems.length > 0 ? (
          <ContentListPage
            resource="events"
            i18nBase="screens.events"
            currentPage={1}
            itemsPerPage={9}
            heroButtons={heroButtons}
            linkToItem={(id) => ROUTES.EVENTS.EVENT_DETAIL({ id })}
            linkToPage={(page) => ROUTES.EVENTS.LIST_PAGED({ page })}
            breadcrumbs={breadcrumbs}
            contentSectionId="events-section"
            mapToContentItems={mapToContentItems}
            categoryIconMap={categoryIconMap}
            hideHero={true}
          />
        ) : (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <p>No events available</p>
          </Box>
        )}
      </Container>
    </BaseLayout>
  );
};

export default Events;
