'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/Card'
import { Button } from '@/presentation/components/ui/Button'

export default function LocaleSimplePage() {
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white text-shadow text-center gradient-text">
          Glassmorphism Theme Test - About Us
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Glass Card 1</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                This is a glassmorphism card with beautiful blur effects and transparency using the new color scheme #1a2332.
              </p>
              <Button variant="primary">Primary Button</Button>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle>Glass Card 2</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Another example of our glassmorphism design system in action with WebP images support.
              </p>
              <Button variant="secondary">Secondary Button</Button>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle>Glass Card 3</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Testing different button variants and multi-language support (English/German).
              </p>
              <Button variant="outline">Outline Button</Button>
            </CardContent>
          </Card>
        </div>

        <div className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold text-white text-shadow mb-4">
            New Color Scheme: #1a2332
          </h2>
          <p className="text-gray-200 mb-6">
            The background features an animated gradient with the new color #1a2332 and floating particles. 
            All package details have been updated according to the requirements.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="destructive">Destructive Button</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
