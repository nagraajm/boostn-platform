'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Container } from '@/presentation/components/layout/Layout';
import { Club } from '../../../domain/entities/club.entity';
import { StatsSection } from './StatsSection';
import { SocialShare } from './SocialShare';

interface HeroSectionProps {
  club: Club | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ club }) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <Container>
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="glass-button px-4 py-2 rounded-full inline-flex items-center space-x-2 text-sm font-medium text-white"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse glow"></span>
                <span>Live Fundraising Campaign</span>
              </motion.div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white text-shadow">
                Support{' '}
                <span className="gradient-text">
                  {club?.name || 'Our Club'}
                </span>
              </h1>
              
              <p className="text-xl text-gray-200 leading-relaxed text-shadow">
                {club?.description || 'Help us reach our goals and make a difference in our community. Every contribution matters.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#packages"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 group glow text-white"
              >
                <span>Explore Packages</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="#donate"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-white/20 transition-all duration-300 text-white"
              >
                <span>Quick Donate</span>
              </motion.a>
              
              <div className="flex items-center">
                <SocialShare />
              </div>
            </div>

            {/* Stats */}
            <StatsSection />
          </motion.div>

          {/* Hero Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="glass-card p-8 space-y-6 glow">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center glow-purple">
                  <span className="text-2xl font-bold text-white">
                    {club?.name?.charAt(0) || 'C'}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white text-shadow">{club?.name || 'Club Name'}</h3>
                  <p className="text-gray-300">{club?.sport || 'Sports Club'} • {club?.location || 'Location'}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Campaign Progress</span>
                  <span className="font-semibold text-white">68%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '68%' }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full glow"
                  ></motion.div>
                </div>
                <div className="flex justify-between text-sm text-gray-300">
                  <span>€8,200 raised</span>
                  <span>€12,000 goal</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
