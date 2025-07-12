# MAF ACCOUNT CRAFTER- Digital Products Marketplace

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDimanjan%2Falisite)

A modern, responsive frontend-only website for showcasing and browsing digital products. Built with React, TypeScript, and UnoCSS.

## 🚀 Live Demo

🌐 **[View Live Site](https://alisite.vercel.app)** *(Deploy to see your live URL)*

## ✨ Features

- **Product Showcase**: Beautiful grid layout with detailed product cards
- **Advanced Filtering**: Search, category, price range, and tag filters
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Product Details**: Comprehensive modal with full product information
- **Modern UI**: Clean, professional design with smooth animations
- **Type Safe**: Built with TypeScript for better development experience
- **Fast & Optimized**: Powered by Vite for lightning-fast development

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: UnoCSS with Tailwind-compatible utilities
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)
 
 
## 📱 Features Overview

### Product Management
- Display products from JSON data file
- Product cards with images, ratings, pricing
- Detailed product modals with features and compatibility
- Tag-based categorization

### Search & Filter
- Real-time search across product names, descriptions, and tags
- Category-based filtering
- Price range sliders
- Multiple tag selection
- Sorting options (name, price, rating, reviews, newest)

### User Experience
- Loading states with skeleton cards
- Responsive design for all devices
- Smooth animations and hover effects
- Mobile-friendly filter sidebar
- Accessibility features

## 🚀 Quick Deploy to Vercel

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDimanjan%2Falisite)

### Manual Deploy
1. Fork this repository
2. Sign up at [Vercel](https://vercel.com)
3. Click "New Project" and import your fork
4. Vercel will auto-detect Vite and configure everything
5. Click "Deploy" - Your site will be live in minutes!

### Environment Setup (Optional)
No environment variables are required for the basic setup. The site works out of the box!

## 🏃‍♂️ Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Dimanjan/alisite.git
cd alisite
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Main navigation header
│   ├── FilterSidebar.tsx # Filter and search controls
│   ├── ProductCard.tsx  # Individual product cards
│   ├── ProductGrid.tsx  # Product grid layout
│   ├── ProductModal.tsx # Product detail modal
│   ├── LoadingCard.tsx  # Loading skeleton
│   └── __tests__/      # Component tests
├── hooks/              # Custom React hooks
│   ├── useProducts.ts  # Product data management
│   └── __tests__/      # Hook tests
├── data/               # Static data
│   └── products.json   # Product database
├── types/              # TypeScript definitions
│   └── index.ts        # Type definitions
├── test/               # Test configuration
│   └── setup.ts        # Test setup file
└── main.tsx           # Application entry point
```

## 📝 Data Management

Products are stored in `src/data/products.json`. To add or modify products:

1. Edit the JSON file with your product data
2. Follow the existing schema:

```json
{
  "id": "unique-id",
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Category Name",
  "tags": ["tag1", "tag2"],
  "image": "https://image-url.jpg",
  "rating": 4.5,
  "reviews": 123,
  "downloadUrl": "https://download-link.com",
  "features": ["Feature 1", "Feature 2"],
  "fileSize": "10 MB",
  "compatibility": ["Windows", "macOS"],
  "lastUpdated": "2024-01-15"
}
```

## 🎨 Customization

### Styling
- Colors and design tokens are configured in `uno.config.ts`
- UnoCSS provides Tailwind-compatible utilities
- Component styles use utility classes and shortcuts

### Adding New Categories
1. Add products with new categories to `products.json`
2. The category filter will automatically include new categories

### Modifying Filters
- Edit `src/hooks/useProducts.ts` to modify filtering logic
- Update `FilterSidebar.tsx` for UI changes

## 🧪 Testing

The project includes comprehensive tests for:
- Component rendering and interactions
- Hook functionality and state management
- Product filtering and sorting logic

Run tests with:
```bash
npm test
```

## 🚀 Deployment

### Vercel (Recommended)
This project is optimized for Vercel deployment:

1. **Automatic**: Use the deploy button above
2. **Manual**: Connect your GitHub repo to Vercel
3. **CLI**: Install Vercel CLI and run `vercel`

### Other Platforms
- **Netlify**: Deploy the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions to deploy the build
- **Any Static Host**: Upload the `dist` folder contents

### Build Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔮 Future Enhancements

- [ ] User authentication and favorites
- [ ] Shopping cart functionality
- [ ] Payment integration
- [ ] Admin panel for product management
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Dark mode toggle

---

Built with ❤️ using modern web technologies
