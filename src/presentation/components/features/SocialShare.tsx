'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Share2, Facebook, Twitter, Linkedin, Link, Check } from 'lucide-react'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'

interface SocialShareProps {
  url?: string
  title?: string
  description?: string
}

export function SocialShare({ 
  url,
  title = "Support EHC Königsberg",
  description = "Help our ice hockey club achieve excellence through sponsorship and donations"
}: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  // Set URL on client side to avoid SSR issues
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(url || window.location.href)
    }
  }, [url])

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
    }
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <Share2 className="h-4 w-4" />
        Share Campaign
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Share This Campaign"
        size="md"
      >
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              Help us reach more supporters by sharing our campaign on social media
            </p>
          </div>

          {/* Social Media Buttons */}
          <div className="grid grid-cols-1 gap-3">
            {shareLinks.map((platform, index) => (
              <motion.button
                key={platform.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleShare(platform.url)}
                className={`glass-button text-white p-4 rounded-lg transition-all flex items-center justify-center gap-3 font-medium hover:bg-white/20`}
              >
                <platform.icon className="h-5 w-5" />
                Share on {platform.name}
              </motion.button>
            ))}
          </div>

          {/* Copy Link */}
          <div className="border-t border-white/20 pt-4">
            <p className="text-sm text-gray-300 mb-3">Or copy the link:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentUrl}
                readOnly
                className="flex-1 p-3 glass-card text-white placeholder-gray-400 text-sm rounded-lg"
              />
              <Button
                onClick={copyToClipboard}
                variant={copied ? 'primary' : 'outline'}
                className="px-4"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Link className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Share Stats */}
          <div className="glass-card p-4 text-center">
            <p className="text-sm text-blue-300">
              Every share helps us reach potential sponsors and supporters! 🙌
            </p>
          </div>
        </div>
      </Modal>
    </div>
  )
}
