import { useEffect, useRef, useState } from 'react';
import { useScrollStore } from '@/store/scrollStore';

export const useScrollProgress = () => {
  const setProgress = useScrollStore((state) => state.setProgress);
  const setDirection = useScrollStore((state) => state.setDirection);
  const setVelocity = useScrollStore((state) => state.setVelocity);
  const setIsScrolling = useScrollStore((state) => state.setIsScrolling);
  const setActiveSection = useScrollStore((state) => state.setActiveSection);

  const prevScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollY / maxScroll;
      
      const velocity = Math.abs(scrollY - prevScrollY.current);
      const direction = scrollY > prevScrollY.current ? 'down' : 'up';
      
      setProgress(progress);
      setDirection(direction);
      setVelocity(velocity);
      setIsScrolling(true);
      
      // Calculate active section
      const sectionHeight = window.innerHeight;
      const sectionIndex = Math.floor((scrollY + sectionHeight / 2) / sectionHeight);
      setActiveSection(sectionIndex);

      prevScrollY.current = scrollY;

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [setProgress, setDirection, setVelocity, setIsScrolling, setActiveSection]);

  return null;
};
