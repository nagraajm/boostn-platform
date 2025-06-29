# Boostn Platform - Sports Club Crowdfunding Platform

A modern Next.js 14 crowdfunding platform designed to help sports clubs raise funds through sponsorship packages and donations. Built with Clean Architecture principles, TypeScript, and a professional light theme design.

## 🏒 About EHC Königsberg

This platform is specifically designed for EHC Königsberg, a sports club that offers various sponsorship packages to businesses and individuals looking to support the team while gaining valuable exposure and networking opportunities.

## ✨ Features

### Core Functionality
- **Multi-language Support** - English and German localization
- **Sponsorship Packages** - 4 different tiers (Classic, Bronze, Silver, Gold)
- **Quick Donations** - Easy donation system with preset and custom amounts
- **Business Integration** - Complete business information capture
- **Payment Processing** - Multiple payment methods support
- **Responsive Design** - Works seamlessly on desktop and mobile

### Design System
- **Professional Light Theme** - Clean, business-friendly appearance
- **Gradient Cards** - Different gradient backgrounds for each package tier
- **Smooth Animations** - Hover effects and micro-interactions
- **Typography** - Modern Inter font with proper hierarchy
- **Accessibility** - Proper contrast ratios and focus states

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd boostn-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🏗️ Architecture

### Project Structure
```
src/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Internationalized routes
│   │   ├── page.tsx             # Landing page
│   │   ├── packages/            # Packages overview
│   │   ├── package/             # Individual package routes
│   │   │   └── [packageId]/     # Dynamic package routes
│   │   │       ├── page.tsx     # Package details
│   │   │       ├── purchase/    # Purchase form
│   │   │       └── success/     # Success page
│   │   └── donate/              # Donation page
│   ├── globals.css              # Global styles
│   └── layout.tsx               # Root layout
├── presentation/                 # UI Components
│   └── components/
│       └── ui/                  # Reusable UI components
│           ├── Card.tsx         # Card component
│           └── Button.tsx       # Button component
├── application/                  # Business logic
├── domain/                      # Domain entities
├── infrastructure/              # External integrations
└── shared/                      # Common utilities
```

### Key Technologies
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Clean Architecture** - Separation of concerns
- **MVVM Pattern** - Model-View-ViewModel architecture

## 🌍 Internationalization

### Supported Languages
- **English** (`/en`) - Default language
- **German** (`/de`) - Secondary language

### Language Switching
- Available on all pages via navigation bar
- Maintains current page context when switching
- URL structure: `/{locale}/{page}`

### Content Management
Each page includes translation objects:
```typescript
const content = {
  en: { /* English content */ },
  de: { /* German content */ }
};
```

## 💳 Payment Integration

### Supported Payment Methods
1. **Credit Card** - Standard card processing
2. **Bank Transfer** - Direct bank transfer option
3. **PayPal** - PayPal integration

### Form Validation
- Client-side validation for all required fields
- Email format validation
- Real-time form state management
- Error handling and user feedback

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Touch-friendly buttons and forms
- Optimized layouts for small screens
- Responsive navigation
- Mobile-first approach

## 🔧 Development

### Available Scripts
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run type-check  # TypeScript type checking
```

### Environment Variables
Create a `.env.local` file:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Add other environment variables as needed
```

### Code Style
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript Strict Mode** - Type safety
- **Functional Components** - React hooks pattern

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Setup
1. Set production environment variables
2. Configure domain and SSL
3. Set up payment processor credentials
4. Configure email service for receipts

## 📊 Features Breakdown

### Landing Page Features
✅ Hero section with club banner  
✅ Language switcher  
✅ Simplified package cards  
✅ Navigation to packages/donate  
✅ Professional light theme  

### Packages Page Features
✅ Complete package overview  
✅ Detailed benefits comparison  
✅ Key terms and conditions  
✅ Professional card layouts  
✅ Responsive design  

### Purchase Flow Features
✅ Complete business information form  
✅ Multiple payment options  
✅ Form validation and error handling  
✅ Loading states and user feedback  
✅ Success confirmation  

### Donation Features
✅ Preset donation amounts  
✅ Custom amount input  
✅ Quick donation process  
✅ Responsive layout  

## 🎯 Business Benefits

### For Sponsors
- **Networking**: Access to entrepreneur network events
- **Branding**: Logo usage rights and company presentation
- **Tickets**: Season tickets for games and events
- **Partnership**: Official partnership recognition
- **Marketing**: Business promotion opportunities

### For the Club
- **Funding**: Sustainable revenue stream
- **Community**: Strong business partnerships
- **Growth**: Expansion and development opportunities
- **Recognition**: Professional sponsorship management

## 📞 Support & Contact

For technical support or business inquiries:
- **Email**: support@ehc-koenigsberg.de
- **Phone**: Contact information available on site
- **Website**: Official club website integration

## 📄 License

This project is proprietary software developed for EHC Königsberg.

---

**Built with ❤️ for EHC Königsberg**

*Professional crowdfunding platform designed to connect businesses with sports excellence.*
- **State Management**: React hooks with MVVM pattern
- **Architecture**: Clean Architecture with Dependency Injection

## 🎨 Design System

- **Theme**: Glassmorphism with blue/purple gradient palette
- **Colors**: 
  - Primary: Blue gradient (#3b82f6 to #1e40af)
  - Accent: Purple (#8b5cf6)
  - Background: Light gradient (#f8fafc to #ffffff)
- **Typography**: Inter font family
- **Glass Effects**: Semi-transparent backgrounds with backdrop blur
- **Animations**: Smooth hover effects and micro-interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd boostn-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Usage

### For Club Administrators
1. **Configure Club Information**: Update club details in the domain entities
2. **Create Sponsorship Packages**: Define tiered sponsorship options with benefits
3. **Monitor Donations**: Track incoming donations and sponsorships
4. **Generate Reports**: Download PDF receipts and donation summaries

### For Supporters
1. **Browse Packages**: View available sponsorship tiers and benefits
2. **Make Donations**: Quick one-click donations or custom amounts
3. **Purchase Sponsorships**: Complete sponsorship forms with business details
4. **Share Campaigns**: Share on social media to increase reach

## 📱 User Flow & Navigation

### 1. Landing Page (`/[locale]`)
**Path**: `/en` or `/de`

**Features**:
- Hero section with club banner image
- Language switcher (English/German)
- Simplified package cards showing:
  - Package name with gradient styling
  - Pricing information
  - Ticket benefits (with emoji icons)
  - "Select Package" button
- Two main CTAs:
  - **"Explore Packages"** → Navigate to full packages page
  - **"Donate Now"** → Navigate to donation page

### 2. Packages Overview (`/[locale]/packages`)
**Path**: `/en/packages` or `/de/packages`

**Features**:
- Complete overview of all 4 sponsorship packages
- Detailed information for each package:
  - Full ticket benefits breakdown
  - Complete business benefits with checkmarks
  - Pricing information
- **"Key Terms & Benefits"** section with:
  - Common benefits for all packages
  - Important terms and conditions
  - Cancellation policies
- "Select Package" buttons → Navigate to purchase forms

**Package Tiers**:
- **Classic** - €229 + VAT - 6 Standing Day Tickets
- **Bronze** - Contact for pricing - 30 Standing Day Tickets  
- **Silver** - Contact for pricing - 2 Standing Season Tickets
- **Gold** - Contact for pricing - 2 Seated Season Tickets

### 3. Package Details (`/[locale]/package/[packageId]`)
**Path**: `/en/package/classic`, `/en/package/bronze`, etc.

**Features**:
- Individual package detail view
- Complete ticket and business benefits
- "Key Terms & Benefits" section
- "Select This Package" button → Navigate to purchase form

### 4. Purchase Form (`/[locale]/package/[packageId]/purchase`)
**Path**: `/en/package/classic/purchase`, etc.

**Features**:
- **Business Information Form**:
  - Business Name (required)
  - Contact Person (required)
  - Email Address (required)
  - Phone Number
  - Company Registration Number
- **Payment Options**:
  - Credit Card
  - Bank Transfer
  - PayPal
- **Form Validation**:
  - Required field validation
  - Email format validation
  - Real-time form state management
- **Processing Flow**:
  - Form submission with loading state
  - Redirect to success page after completion

### 5. Donation Page (`/[locale]/donate`)
**Path**: `/en/donate` or `/de/donate`

**Features**:
- **Preset Donation Amounts**: €10, €25, €50, €100, €250, €500
- **Custom Amount Input**: Enter any donation amount
- **Quick Donation Form**: Streamlined donation process
- **Responsive Grid**: Donation amounts displayed in clean grid layout

### 6. Success Pages
**Path**: `/[locale]/package/[packageId]/success`

**Features**:
- Purchase confirmation
- Receipt information
- Thank you message
- Navigation back to home

## 🗺️ Complete Navigation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        LANDING PAGE (/en)                       │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │ Explore Packages│    │   Donate Now    │                    │
│  └─────────┬───────┘    └─────────┬───────┘                    │
└───────────┬┴───────────────────────┴───────────────────────────┘
            │                        │
            ▼                        ▼
┌─────────────────────┐    ┌─────────────────────┐
│   PACKAGES PAGE     │    │   DONATION PAGE     │
│   (/en/packages)    │    │   (/en/donate)      │
│                     │    │                     │
│ ┌─────────────────┐ │    │ • Preset amounts    │
│ │ Select Package  │ │    │ • Custom amount     │
│ └─────────┬───────┘ │    │ • Quick donation    │
└───────────┼─────────┘    └─────────────────────┘
            │
            ▼
┌─────────────────────┐
│  PACKAGE DETAILS    │
│ (/en/package/[id])  │
│                     │
│ ┌─────────────────┐ │
│ │ Select Package  │ │
│ └─────────┬───────┘ │
└───────────┼─────────┘
            │
            ▼
┌─────────────────────┐    ┌─────────────────────┐
│   PURCHASE FORM     │───▶│   SUCCESS PAGE      │
│(/en/package/[id]/   │    │(/en/package/[id]/   │
│     purchase)       │    │     success)        │
│                     │    │                     │
│ • Business info     │    │ • Confirmation      │
│ • Payment options   │    │ • Receipt details   │
│ • Form validation   │    │ • Thank you         │
└─────────────────────┘    └─────────────────────┘
```

## 🔄 User Journey Examples

### Sponsorship Journey
1. **Discovery**: User lands on home page `/en`
2. **Exploration**: Clicks "Explore Packages" → `/en/packages`
3. **Selection**: Reviews all packages, clicks "Select Package" for Gold → `/en/package/gold`
4. **Details**: Reviews Gold package details, clicks "Select This Package" → `/en/package/gold/purchase`
5. **Purchase**: Fills out business information, selects payment method, submits
6. **Confirmation**: Redirected to success page `/en/package/gold/success`

### Quick Donation Journey
1. **Discovery**: User lands on home page `/en`
2. **Intent**: Clicks "Donate Now" → `/en/donate`
3. **Amount**: Selects preset amount (€50) or enters custom amount
4. **Donation**: Completes quick donation form
5. **Confirmation**: Receives confirmation and receipt

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3b82f6 to #1e40af)
- **Secondary**: Purple accent (#8b5cf6)
- **Background**: Light gradient (#f8fafc to #ffffff)
- **Text**: Professional grays (#1a2332, #6b7280)

### Package Card Variants
```css
.card-classic   /* Light gray gradient */
.card-bronze    /* Warm yellow gradient */
.card-silver    /* Cool gray gradient */
.card-gold      /* Golden yellow gradient */
```

### Typography
- **Primary Font**: Inter
- **Headings**: Gradient text effects
- **Body**: Clean, readable typography hierarchy

## 🧪 Development

### Project Structure
- `/src/app/` - Next.js pages and routing
- `/src/presentation/` - React components and ViewModels
- `/src/application/` - Business use cases and services
- `/src/domain/` - Core business logic and entities
- `/src/infrastructure/` - External dependencies and data access
- `/src/shared/` - Common utilities and types

### Key Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

### Testing
```bash
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CLUB_NAME="EHC Königsberg"
```

### Customization
1. **Club Information**: Update `/src/infrastructure/repositories/in-memory-club.repository.ts`
2. **Sponsorship Packages**: Modify packages in `/src/infrastructure/repositories/in-memory-package.repository.ts`
3. **Design System**: Customize colors and styles in `/src/app/globals.css` and `tailwind.config.ts`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Issues

If you encounter any issues, please create an issue on GitHub with:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

---

**Built with ❤️ for EHC Königsberg**

*Professional crowdfunding platform designed to connect businesses with sports excellence.*
