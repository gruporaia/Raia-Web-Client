import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Box,
  IconButton,
  Modal,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

import ContentDetailPage, {
  MetaDisplay,
  SidebarConfig,
} from '../components/content/ContentDetailPage';
import PageHelmet from '../components/translation/PageHelmet';
import { Carousel } from '../components/ui';
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

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Gallery images for different events
  const eventGalleries: Record<
    string,
    { images: string[]; folder: string; title: string }
  > = {
    '1': {
      images: [
        'IMG_0042.JPG',
        'IMG_0643.JPG',
        'IMG_0736.JPG',
        'IMG_1164.JPG',
        'IMG_2971.JPG',
        'IMG_3148.JPG',
      ],
      folder: 'conference-2025',
      title: 'RAIA Conference 2025',
    },
    '2': {
      images: [
        'IMG_0147.JPG',
        'IMG_0305.JPG',
        'IMG_0314.JPG',
        'IMG_0318.JPG',
        'IMG_0324.JPG',
        'IMG_0368.JPG',
      ],
      folder: 'llm-spring-2025',
      title: 'LLM Spring School 2025',
    },
    '3': {
      images: ['IMG_1.jpg', 'IMG_2.jpg', 'IMG_3.jpg'],
      folder: 'hackathon-raia-monks',
      title: 'Hackathon Raia + Monks',
    },
  };

  const currentGallery = eventId ? eventGalleries[eventId] : null;
  const galleryImages = useMemo(
    () => currentGallery?.images || [],
    [currentGallery?.images]
  );
  const galleryFolder = currentGallery?.folder || '';
  const galleryTitle = currentGallery?.title || '';

  const handleImageClick = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const handlePrevImage = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  }, [galleryImages.length]);

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  }, [galleryImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!lightboxOpen) return;

      switch (event.key) {
        case 'Escape':
          handleCloseLightbox();
          break;
        case 'ArrowLeft':
          handlePrevImage();
          break;
        case 'ArrowRight':
          handleNextImage();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, handleCloseLightbox, handlePrevImage, handleNextImage]);

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
      .filter(([name]) => {
        // Check for both markdown (**name**) and HTML (<strong>name</strong>) formats
        return (
          event.body?.includes(`**${name}**`) ||
          event.body?.includes(`<strong>${name}</strong>`)
        );
      })
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
              <Carousel items={sponsors} itemSize={200} />
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

        {/* Event Images Gallery */}
        {currentGallery && galleryImages.length > 0 && (
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
              Galeria de Fotos / Photo Gallery
            </Typography>
            <Box
              sx={{
                '& .slick-slider': {
                  '& .slick-prev, & .slick-next': {
                    zIndex: 1,
                    '&:before': {
                      fontSize: '40px',
                      opacity: 0.75,
                    },
                  },
                  '& .slick-prev': {
                    left: '10px',
                  },
                  '& .slick-next': {
                    right: '10px',
                  },
                  '& .slick-dots': {
                    bottom: '-35px',
                    '& li button:before': {
                      fontSize: '12px',
                      color: theme.palette.primary.main,
                    },
                    '& li.slick-active button:before': {
                      color: theme.palette.primary.main,
                    },
                  },
                },
              }}
            >
              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={3}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={3000}
                responsive={[
                  {
                    breakpoint: 960,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                    },
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    },
                  },
                ]}
              >
                {galleryImages.map((img, index) => (
                  <Box key={img} sx={{ px: 1 }}>
                    <Box
                      component="img"
                      src={`/events/${galleryFolder}/${img}`}
                      alt={`${galleryTitle} - ${img}`}
                      onClick={() => handleImageClick(index)}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 1,
                        boxShadow: 2,
                        objectFit: 'cover',
                        aspectRatio: '4/3',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.02)',
                        },
                      }}
                    />
                  </Box>
                ))}
              </Slider>
            </Box>

            {/* Lightbox Modal */}
            <Modal
              open={lightboxOpen}
              onClose={handleCloseLightbox}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  outline: 'none',
                  maxWidth: '54vw',
                  maxHeight: '54vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={(e) => {
                  // Close on background click, but not on image click
                  if (e.target === e.currentTarget) {
                    handleCloseLightbox();
                  }
                }}
              >
                {/* Close Button */}
                <IconButton
                  onClick={handleCloseLightbox}
                  sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    color: 'white',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 2,
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>

                {/* Previous Button */}
                <IconButton
                  onClick={handlePrevImage}
                  sx={{
                    position: 'absolute',
                    left: 20,
                    color: 'white',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 2,
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                >
                  <NavigateBeforeIcon />
                </IconButton>

                {/* Next Button */}
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: 'absolute',
                    right: 20,
                    color: 'white',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 2,
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                >
                  <NavigateNextIcon />
                </IconButton>

                {/* Image */}
                <Box
                  component="img"
                  src={`/events/${galleryFolder}/${galleryImages[selectedImageIndex]}`}
                  alt={`${galleryTitle} - ${galleryImages[selectedImageIndex]}`}
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    borderRadius: 1,
                    boxShadow: 24,
                  }}
                />

                {/* Image Counter */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'white',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    zIndex: 2,
                  }}
                >
                  <Typography variant="body2">
                    {selectedImageIndex + 1} / {galleryImages.length}
                  </Typography>
                </Box>
              </Box>
            </Modal>
          </Box>
        )}
      </>
    );
  }, [
    event,
    sponsors,
    getEventText,
    theme.palette.primary.main,
    currentGallery,
    galleryImages,
    galleryFolder,
    galleryTitle,
    handleImageClick,
    lightboxOpen,
    handleCloseLightbox,
    handlePrevImage,
    handleNextImage,
    selectedImageIndex,
  ]);

  // Early return after all hooks
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
