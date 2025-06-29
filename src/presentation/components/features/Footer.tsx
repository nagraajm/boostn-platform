'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Heart, Facebook, Twitter, Instagram } from 'lucide-react'
import { Container } from '@/presentation/components/layout/Container'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="glass-footer py-16 mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Club Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-4 text-white text-shadow">EHC Koenigsbrunn</h3>
            <p className="text-gray-200 mb-4 text-shadow">
              Supporting ice hockey excellence in Koenigsbrunn since 1952. 
              Building champions on and off the ice.
            </p>
            <div className="flex items-center gap-2 text-red-400">
              <Heart className="h-4 w-4" />
              <span className="text-sm">Made with passion for hockey</span>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white text-shadow">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-200 text-sm">
                  Eisstadion Koenigsbrunn<br />
                  Sportstraße 15, 39104 Koenigsbrunn
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-200 text-sm">+49 391 123456</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-200 text-sm">info@ehc-koenigsberg.de</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white text-shadow">Quick Links</h3>
            <div className="space-y-2">
              {[
                { label: 'About Us', href: '#about' },
                { label: 'Sponsorship Packages', href: '#packages' },
                { label: 'Donate', href: '#donate' },
                { label: 'Team', href: '#team' },
                { label: 'News', href: '#news' },
                { label: 'Contact', href: '#contact' }
              ].map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="block text-gray-200 hover:text-white transition-colors text-sm"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white text-shadow">Follow Us</h3>
            <div className="flex gap-4 mb-6">
              {[
                { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
                { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                { icon: Twitter, href: '#', color: 'hover:text-blue-300' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`text-gray-300 ${social.color} transition-colors`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
            
            <div className="text-sm text-gray-300">
              <p className="mb-2">Stay updated with our latest news</p>
              <p>Game schedules • Training updates • Events</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-gray-300 text-sm mb-4 md:mb-0">
            © {currentYear} EHC Koenigsbrunn. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-300">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Imprint
            </a>
          </div>
        </motion.div>
      </Container>
    </footer>
  )
}
