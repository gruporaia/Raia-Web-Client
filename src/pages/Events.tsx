import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ContentListPage, {
  HeroButton,
} from '../components/content/ContentListPage';
import { ContentItem } from '../components/ui/Card/ContentCard';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { MockEvent } from '../services/events';
import { CATEGORY_ICONS } from '../utils/iconMappings';
import { createScrollRoute } from '../utils/navigationUtils';
import { getEventSlug } from '../utils/slugUtils';

const Events: React.FC = () => {
  const params = useParams<{ page?: string }>();
  const navigate = useNavigate();
  const initialPage = params.page ? parseInt(params.page, 10) : 1;

  const { getContent: getEventContent } = useLocalizedContent(
    'screens',
    'events'
  );
  const { getContent: getNavContent } = useLocalizedContent(
    'navigation',
    'menu'
  );

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
        today.setHours(0, 0, 0, 0);
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

  return (
    <BaseLayout>
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
      />
    </BaseLayout>
  );
};

export default Events;
