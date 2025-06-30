'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Share2, Facebook, Twitter, Linkedin, Link, Check, MessageCircle, Instagram } from 'lucide-react'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'

interface SocialShareProps {
  url?: string
  title?: string
  description?: string
  variant?: 'button' | 'icon'
  size?: 'sm' | 'md' | 'lg'
}

export function SocialShare({ 
  url,
  title = "Support EHC Koenigsbrunn",
  description = "Help our ice hockey club achieve excellence through sponsorship and donations",
  variant = 'button',
  size = 'md'
}: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const [modalId] = useState(() => Math.random().toString(36).substr(2, 9))

  // Set URL on client side to avoid SSR issues
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(url || window.location.href)
    }
  }, [url])

  const shareText = `${title} - ${description}`

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2] hover:bg-[#166FE5]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      color: 'bg-[#1DA1F2] hover:bg-[#1A91DA]',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}&hashtags=SupportLocal,Hockey,Sponsorship,EHCKoenigsbrunn`
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] hover:bg-[#20BD5A]',
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${currentUrl}`)}`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-[#0A66C2] hover:bg-[#095BA8]',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-r from-[#E4405F] to-[#833AB4] hover:from-[#D93E57] hover:to-[#7A359F]',
      url: `https://www.instagram.com/`,
      isSpecial: true // Instagram doesn't support direct URL sharing
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

  const handleShare = (shareUrl: string, isSpecial?: boolean) => {
    setShared(true)
    
    if (isSpecial) {
      // For Instagram, copy URL and show better message
      copyToClipboard()
      
      // Create a more user-friendly notification
      const message = `✅ URL copied to clipboard!\n\n📱 To share on Instagram:\n1. Open Instagram app\n2. Create a new post or story\n3. Paste the link in your caption or add it to your bio\n4. Tag @ehc_koenigsburg to help spread the word!`
      
      if (window.confirm(message + '\n\nClick OK to open Instagram web (optional)')) {
        window.open('https://www.instagram.com/', '_blank')
      }
      
      // Auto-close modal after a delay
      setTimeout(() => {
        setIsOpen(false)
        setShared(false)
      }, 2000)
      return
    }
    
    // Open share window
    window.open(shareUrl, '_blank', 'width=600,height=400')
    
    // Auto-close modal after sharing (with a slight delay)
    setTimeout(() => {
      setIsOpen(false)
      setShared(false)
    }, 1000)
  }

  const buttonSizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <div>
      {variant === 'button' ? (
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 ${buttonSizeClasses[size]}`}
        >
          <Share2 className="h-4 w-4" />
          Share Campaign
        </Button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          title="Share"
        >
          <Share2 className="h-5 w-5" />
        </button>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Share This Campaign"
        size="md"
        key={modalId}
      >
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
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
                onClick={() => handleShare(platform.url, platform.isSpecial)}
                className={`${platform.color} text-white p-4 rounded-lg transition-all flex items-center justify-center gap-3 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
              >
                <platform.icon className="h-5 w-5" />
                Share on {platform.name}
                {platform.isSpecial && (
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Copy Link</span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Copy Link */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600 mb-3">Or copy the link:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentUrl}
                readOnly
                className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-700 text-sm bg-gray-50"
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
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
            {shared ? (
              <p className="text-sm text-green-700 font-medium">
                Thank you for sharing! 🎉 Your support helps us reach more people!
              </p>
            ) : (
              <p className="text-sm text-blue-700">
                Every share helps us reach potential sponsors and supporters! 🙌
              </p>
            )}
          </div>

          {/* Close Button */}
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="px-6 py-2"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
