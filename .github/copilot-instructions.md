<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Boostn Platform - Copilot Instructions

## Project Overview
This is a Next.js 14 crowdfunding platform called Boostn that helps sports clubs raise funds through sponsorship packages and donations. The project follows Clean Architecture principles with MVVM pattern.

## Architecture Guidelines
- Follow Clean Architecture with clear separation between presentation, application, domain, and infrastructure layers
- Use MVVM pattern with React hooks as ViewModels
- Implement dependency injection for services
- Keep domain logic pure and framework-independent

## Design System
- Use glassmorphism design with semi-transparent elements and backdrop blur
- Primary colors: Blue gradient (#3b82f6 to #1e40af), Purple accent (#8b5cf6)
- Background: Light theme (#f8fafc to #ffffff)
- Typography: Modern, clean fonts (Inter)
- Animations: Smooth hover effects, micro-interactions with Framer Motion

## Code Style
- TypeScript strict mode
- Functional components with hooks
- Use Tailwind CSS classes with custom glass utilities
- Component composition over inheritance  
- Prefer async/await over promises
- Use proper error handling and loading states

## File Structure
- `/src/app/` - Next.js App Router pages
- `/src/presentation/` - Components, ViewModels, and UI logic
- `/src/application/` - Use cases and application services
- `/src/domain/` - Business entities and domain logic
- `/src/infrastructure/` - External integrations and data access
- `/src/shared/` - Common utilities and types

## Key Features to Implement
- Landing page with club information
- Sponsorship package system with glass cards
- Quick donation functionality
- PDF receipt generation
- Social sharing integration
- Responsive glassmorphism design
- Smooth animations and transitions
