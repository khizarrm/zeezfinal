import React, { useState, useRef, useEffect } from 'react';
import { applyWatermark } from '../utils/watermark';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  lazy?: boolean;
  watermark?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  lazy = true,
  watermark = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [isError, setIsError] = useState(false);
  const [watermarkedSrc, setWatermarkedSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazy) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  useEffect(() => {
    if (!isInView || !src || !watermark) {
      setWatermarkedSrc(null);
      return;
    }

    let cancelled = false;

    const processWatermark = async () => {
      try {
        const result = await applyWatermark(src, {
          text: 'ZEEZ CREATIONS',
          opacity: 0.12,
          fontSize: 20,
          color: '#ffffff',
          rotate: -25,
          tile: true,
        });
        if (!cancelled) {
          setWatermarkedSrc(result);
        }
      } catch (error) {
        if (!cancelled) {
          setWatermarkedSrc(null);
        }
      }
    };

    processWatermark();

    return () => {
      cancelled = true;
    };
  }, [isInView, src, watermark]);

  const handleLoad = () => {
    setIsLoaded(true);
    setIsError(false);
  };

  const handleError = () => {
    setIsError(true);
    setIsLoaded(false);
  };

  const displaySrc = watermark && watermarkedSrc ? watermarkedSrc : src;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
        minHeight: height || '200px'
      }}
    >
      {/* Skeleton placeholder */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      )}
      
      {/* Error placeholder */}
      {isError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Image not found</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      {isInView && displaySrc && (
        <img
          ref={imgRef}
          src={displaySrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={lazy ? 'lazy' : 'eager'}
          onLoad={handleLoad}
          onError={handleError}
          decoding="async"
          fetchPriority={lazy ? 'low' : 'high'}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
