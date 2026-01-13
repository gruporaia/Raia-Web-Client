import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Box,
  CardMedia,
  Chip,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';

import { MockEvent } from '../../services/events';
import { getEventSlug } from '../../utils/slugUtils';

interface EventsCarouselProps {
  events: MockEvent[];
  onEventClick: (slug: string) => void;
  height?: number;
  autoPlayInterval?: number;
}

const EventsCarousel: React.FC<EventsCarouselProps> = ({
  events,
  onEventClick,
  height = 400,
  autoPlayInterval = 5000,
}) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Only use events with images
  const displayEvents = events.filter((e) => e.image);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % displayEvents.length);
    setAutoPlay(false);
  }, [displayEvents.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + displayEvents.length) % displayEvents.length
    );
    setAutoPlay(false);
  }, [displayEvents.length]);

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay || displayEvents.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayEvents.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, displayEvents.length, autoPlayInterval]);

  // Resume auto-play after user interaction
  useEffect(() => {
    if (!autoPlay) {
      const timer = setTimeout(() => setAutoPlay(true), 10000);
      return () => clearTimeout(timer);
    }
  }, [autoPlay]);

  // Early return after all hooks
  if (displayEvents.length === 0) {
    return null;
  }

  const currentEvent = displayEvents[currentIndex];
  const currentSlug = getEventSlug(String(currentEvent.id), currentEvent.title);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
        borderRadius: theme.shape.borderRadius,
        mb: 4,
      }}
    >
      {/* Carousel Images */}
      {displayEvents.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentIndex ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            cursor: 'pointer',
          }}
          onClick={() => onEventClick(currentSlug)}
        >
          <CardMedia
            component="img"
            image={event.image}
            alt={event.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Overlay gradient */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40%',
              background:
                'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            }}
          />

          {/* Event Info Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: theme.spacing(3),
              color: 'white',
            }}
          >
            <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
              {event.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              {event.description}
            </Typography>
            {event.category && (
              <Chip
                label={event.category}
                size="small"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                }}
              />
            )}
          </motion.div>
        </motion.div>
      ))}

      {/* Navigation Buttons */}
      {displayEvents.length > 1 && (
        <>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: theme.spacing(2),
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              zIndex: 10,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.4)',
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: theme.spacing(2),
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              zIndex: 10,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.4)',
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>

          {/* Indicators */}
          <Box
            sx={{
              position: 'absolute',
              bottom: theme.spacing(2),
              right: theme.spacing(2),
              display: 'flex',
              gap: 1,
              zIndex: 10,
            }}
          >
            {displayEvents.map((_, index) => (
              <Box
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setAutoPlay(false);
                }}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor:
                    index === currentIndex
                      ? 'primary.main'
                      : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor:
                      index === currentIndex
                        ? 'primary.main'
                        : 'rgba(255,255,255,0.8)',
                  },
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default EventsCarousel;
