# Ashish Computers - Frontend

A modern Vue.js frontend application for Ashish Computers e-commerce platform featuring user-specific pricing, product management, and cart functionality.

## Features

- 🛍️ **User-Specific Pricing**: Different price tiers for different customer types
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🔐 **Authentication**: JWT-based user authentication
- 🛒 **Shopping Cart**: Add to cart and manage items
- 📦 **Product Management**: Browse products with advanced filtering
- 💰 **MRP Display**: Clear pricing with strikethrough MRP
- 🏷️ **Category Management**: Organized product categorization
- 🖼️ **Image Gallery**: Multiple product images support

## Tech Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Vue Router** - Client-side routing
- **Pinia** - State management
- **Axios** - HTTP client for API calls

## Prerequisites

- Node.js 16+ 
- npm or yarn
- Backend API server running

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ashishcomputers-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your API endpoint
```

4. Start development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── ProductPricing.vue
│   └── ...
├── views/              # Page components
│   ├── Home.vue
│   ├── Products.vue
│   ├── Login.vue
│   └── ...
├── stores/             # Pinia stores
│   ├── auth.js
│   ├── cart.js
│   └── ...
├── router/             # Vue Router configuration
├── services/           # API service layer
└── assets/            # Static assets
```

## Key Features

### User-Specific Pricing
- Different pricing for Retail, Wholesale, and Distributor customers
- Automatic price calculation based on user type
- Clear MRP display with discounts

### Product Management
- Advanced product filtering and search
- Multiple product images
- Category-based organization
- SKU and model number support

### Authentication
- JWT-based authentication
- User type management
- Protected routes

## API Integration

The frontend communicates with a Yii2 PHP backend API. Key endpoints:

- `GET /api/products` - Product listing
- `POST /api/auth/login` - User authentication
- `GET /api/categories` - Category listing
- `POST /api/products` - Create product (admin)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is proprietary software for Ashish Computers.

## Contact

For questions or support, please contact the development team.
