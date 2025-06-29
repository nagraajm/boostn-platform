'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={cn('min-h-screen', className)}>
      {children}
    </div>
  );
};

export const Container: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
};

export const Section: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <section className={cn('py-16 lg:py-24', className)}>
      {children}
    </section>
  );
};
