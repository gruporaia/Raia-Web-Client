import { Box, useTheme } from '@mui/material';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { debounce } from '../../utils/animationUtils';

interface Institution {
  id: number;
  name: string;
  website: string;
  src: string;
}

interface InstitutionsCarouselProps {
  institutions: Institution[];
  speed?: number;
  squareSize?: number;
  padding?: string;
  align?: 'center' | 'start' | 'end' | 'stretch';
}

const InstitutionsCarousel: React.FC<InstitutionsCarouselProps> = ({
  institutions = [],
  speed = 15,
  squareSize = 120,
  padding = '0 20px',
  align = 'center',
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [totalWidth, setTotalWidth] = useState(0);
  const totalWidthRef = useRef(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const shouldAnimateRef = useRef(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animationOffset, setAnimationOffset] = useState(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const [, setLoadedImages] = useState(0);
  const isReadyRef = useRef(false);
  const expectedImageCount = useMemo(
    () => institutions.length,
    [institutions.length]
  );

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const resumeAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInstitutionClick = useCallback((website?: string) => {
    if (website) {
      window.open(website, '_blank', 'noopener,noreferrer');
    }
  }, []);

  const startRAF = useCallback(() => {
    if (animationRef.current) return;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = timestamp - lastTimeRef.current;
      const pixelsPerMs = totalWidthRef.current / (speed * 1000);

      offsetRef.current =
        (offsetRef.current + elapsed * pixelsPerMs) % totalWidthRef.current;

      setAnimationOffset(offsetRef.current);

      lastTimeRef.current = timestamp;
      animationRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = null;
    animationRef.current = requestAnimationFrame(animate);
  }, [speed]);

  const stopRAF = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    lastTimeRef.current = null;
  }, []);

  const pauseAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    lastTimeRef.current = null;
  }, []);

  const resumeAnimation = useCallback(() => {
    // Clear any pending resume timeout
    if (resumeAnimationTimeoutRef.current) {
      clearTimeout(resumeAnimationTimeoutRef.current);
    }

    // Resume animation after a short delay to let the drag settle
    resumeAnimationTimeoutRef.current = setTimeout(() => {
      if (shouldAnimateRef.current && isReadyRef.current) {
        startRAF();
      }
    }, 100);
  }, [startRAF]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!shouldAnimateRef.current) return;
      isDraggingRef.current = true;
      setIsDragging(true);
      dragStartXRef.current = e.clientX;
      dragStartOffsetRef.current = offsetRef.current;
      pauseAnimation();
    },
    [pauseAnimation]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - dragStartXRef.current;
      const newOffset = dragStartOffsetRef.current - deltaX;

      // Clamp offset to valid range
      const clampedOffset = Math.max(
        0,
        Math.min(newOffset, totalWidthRef.current)
      );

      offsetRef.current = clampedOffset;
      setAnimationOffset(clampedOffset);
    },
    [] // Empty deps since we're using refs
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
    resumeAnimation();
  }, [resumeAnimation]);

  const handleMouseLeave = useCallback(() => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      resumeAnimation();
    }
  }, [resumeAnimation]);

  const displayItems = useMemo(() => {
    if (!institutions || institutions.length === 0) return [];
    if (!shouldAnimate) return institutions;
    return [...institutions, ...institutions, ...institutions];
  }, [institutions, shouldAnimate]);

  const resetAnimation = useCallback(() => {
    offsetRef.current = 0;
    setAnimationOffset(0);
    stopRAF();

    if (
      shouldAnimateRef.current &&
      isReadyRef.current &&
      totalWidthRef.current > 0
    ) {
      startRAF();
    }
  }, [startRAF, stopRAF]);

  const recalculateDimensions = useCallback(() => {
    if (!containerRef.current || !innerRef.current || institutions.length === 0)
      return;

    const containerWidth = containerRef.current.clientWidth;

    const originalFlexWrap = innerRef.current.style.flexWrap;
    const originalVisibility = innerRef.current.style.visibility;
    const originalPosition = innerRef.current.style.position;

    innerRef.current.style.flexWrap = 'nowrap';
    innerRef.current.style.visibility = 'hidden';
    innerRef.current.style.position = 'absolute';
    innerRef.current.style.width = 'auto';

    const itemsWidth = innerRef.current.scrollWidth;

    innerRef.current.style.flexWrap = originalFlexWrap;
    innerRef.current.style.visibility = originalVisibility;
    innerRef.current.style.position = originalPosition;
    innerRef.current.style.width = '';

    const originalItemsWidth = shouldAnimateRef.current
      ? itemsWidth / 3
      : itemsWidth;

    if (originalItemsWidth !== totalWidthRef.current) {
      totalWidthRef.current = originalItemsWidth;
      setTotalWidth(originalItemsWidth);
    }

    // Force animation for carousels with 3+ items even if they fit in container
    const newShouldAnimate =
      institutions.length >= 3 || originalItemsWidth > containerWidth;

    if (newShouldAnimate !== shouldAnimateRef.current) {
      shouldAnimateRef.current = newShouldAnimate;
      setShouldAnimate(newShouldAnimate);

      resetAnimation();
    }
  }, [institutions.length, resetAnimation]);

  const handleImageLoad = useCallback(() => {
    setLoadedImages((prev) => {
      const newCount = prev + 1;
      if (newCount >= expectedImageCount && !isReadyRef.current) {
        isReadyRef.current = true;
        setTimeout(recalculateDimensions, 50);
      }
      return newCount;
    });
  }, [expectedImageCount, recalculateDimensions]);

  const debouncedRecalculate = useMemo(
    () => debounce(recalculateDimensions, 100),
    [recalculateDimensions]
  );

  useEffect(() => {
    if (institutions.length === 0) return;
    setLoadedImages(0);
    isReadyRef.current = false;
  }, [institutions]);

  useEffect(() => {
    if (!containerRef.current || institutions.length === 0) return;

    const resizeObserver = new ResizeObserver(debouncedRecalculate);
    resizeObserver.observe(containerRef.current);

    window.addEventListener('resize', debouncedRecalculate);
    window.addEventListener('orientationchange', debouncedRecalculate);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', debouncedRecalculate);
      window.removeEventListener('orientationchange', debouncedRecalculate);
      stopRAF();
    };
  }, [institutions.length, debouncedRecalculate, stopRAF]);

  useEffect(() => {
    if (shouldAnimate && isReadyRef.current && totalWidthRef.current > 0) {
      startRAF();
    } else {
      stopRAF();
    }

    return () => {
      stopRAF();
    };
  }, [shouldAnimate, totalWidth, speed, startRAF, stopRAF]);

  useEffect(() => {
    // Cleanup resume animation timeout on unmount
    return () => {
      if (resumeAnimationTimeoutRef.current) {
        clearTimeout(resumeAnimationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'transparent',
        py: 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        ref={innerRef}
        sx={{
          display: 'flex',
          alignItems: align,
          justifyContent: shouldAnimate ? 'flex-start' : 'center',
          flexWrap: 'nowrap',
          width: shouldAnimate ? 'fit-content' : '100%',
          gap: 3,
          transform: shouldAnimate
            ? `translateX(-${animationOffset}px)`
            : 'none',
          willChange: shouldAnimate ? 'transform' : 'auto',
        }}
      >
        {displayItems.map((institution, index) => {
          const cloneGroup = Math.floor(index / institutions.length);
          const originalIndex = index % institutions.length;
          const uniqueKey = shouldAnimate
            ? `institution-${originalIndex}-clone-${cloneGroup}`
            : `institution-${originalIndex}`;

          return (
            <Box
              key={uniqueKey}
              sx={{
                padding: padding,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: squareSize,
                maxWidth: squareSize,
                height: squareSize,
                flexShrink: 0,
              }}
            >
              {/* Inner wrapper for hover effects */}
              <Box
                sx={{
                  transition: 'all 0.3s ease',
                  transform:
                    hoveredIndex === index ? 'scale(1.08)' : 'scale(1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: squareSize,
                  height: squareSize,
                  padding: 0,
                  backgroundColor: isDarkMode
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.02)',
                  borderRadius: 2,
                  cursor: institution.website ? 'pointer' : 'default',
                  border: '1px solid',
                  borderColor: isDarkMode
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.08)',
                  '&:hover': {
                    borderColor: isDarkMode
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'rgba(0, 0, 0, 0.15)',
                    backgroundColor: isDarkMode
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleInstitutionClick(institution.website)}
                role={institution.website ? 'button' : undefined}
                tabIndex={institution.website ? 0 : undefined}
                onKeyDown={(e) => {
                  if (
                    institution.website &&
                    (e.key === 'Enter' || e.key === ' ')
                  ) {
                    e.preventDefault();
                    handleInstitutionClick(institution.website);
                  }
                }}
                aria-label={
                  institution.website
                    ? `Visit ${institution.name} website`
                    : undefined
                }
              >
                <img
                  src={institution.src}
                  alt={institution.name}
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    borderRadius: 4,
                    padding: '12px',
                    boxSizing: 'border-box',
                    opacity: hoveredIndex === index ? 1 : 0.85,
                    transition: 'opacity 0.3s ease, filter 0.3s ease',
                    filter:
                      hoveredIndex === index
                        ? isDarkMode
                          ? 'brightness(1.1) drop-shadow(0 2px 4px rgba(255,255,255,0.2))'
                          : 'brightness(1) drop-shadow(0 2px 4px rgba(0,0,0,0.15))'
                        : isDarkMode
                          ? 'brightness(0.9) grayscale(20%)'
                          : 'brightness(1) grayscale(10%)',
                  }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default InstitutionsCarousel;
