'use client'

import { motion } from 'framer-motion'
import { Users, Trophy, Target, Heart } from 'lucide-react'

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: '150+',
      label: 'Active Members',
      color: 'text-blue-400'
    },
    {
      icon: Trophy,
      value: '3',
      label: 'Championships Won',
      color: 'text-yellow-400'
    },
    {
      icon: Target,
      value: '12',
      label: 'Goals This Season',
      color: 'text-green-400'
    },
    {
      icon: Heart,
      value: '€15k',
      label: 'Funds Raised',
      color: 'text-red-400'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
          className="text-center"
        >
          <div className="glass-card p-6 glow transition-all duration-300">
            <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
            <div className="text-2xl font-bold text-white text-shadow mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-300">
              {stat.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
