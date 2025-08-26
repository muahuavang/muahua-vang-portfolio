# Muahua Vang Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Framer Motion. This portfolio showcases professional experience, projects, and skills with a focus on user experience and accessibility.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark/Light Theme**: User preference-based theme switching with local storage persistence
- **Smooth Animations**: Framer Motion powered animations for enhanced user engagement
- **Accessibility**: Semantic HTML and ARIA-compliant components
- **Performance**: Optimized images, lazy loading, and efficient rendering
- **SEO Ready**: Meta tags and structured data for search engine optimization

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with strict type checking
- **Framer Motion** - Smooth animations and transitions
- **CSS3** - Custom CSS with CSS variables for theming
- **Font Awesome** - Icon library for visual elements

### Development Tools
- **Create React App** - Development environment and build tools
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation and theme toggle
│   ├── Hero.tsx        # Landing section
│   ├── About.tsx       # About section
│   ├── Projects.tsx    # Project showcase
│   ├── Education.tsx   # Educational background
│   ├── Competencies.tsx # Professional competencies
│   ├── Skills.tsx      # Technical skills
│   ├── Contact.tsx     # Contact form
│   ├── Footer.tsx      # Footer information
│   └── FloatingContact.tsx # Floating contact button
├── App.tsx             # Main application component
├── App.css             # Global application styles
├── components.css      # Component-specific styles
├── index.tsx           # Application entry point
└── index.css           # Global styles and CSS variables
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd muahua-vang-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration values
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App (not recommended)

## 🎨 Design System

### Color Palette
- **Primary**: #007bff (Blue)
- **Secondary**: #6c757d (Gray)
- **Success**: #28a745 (Green)
- **Warning**: #ffc107 (Yellow)
- **Danger**: #dc3545 (Red)
- **Light**: #f8f9fa
- **Dark**: #343a40

### Typography
- **Primary Font**: System fonts (San Francisco, Segoe UI, Roboto)
- **Heading Sizes**: h1 (3rem), h2 (2.5rem), h3 (2rem), h4 (1.5rem)
- **Body Text**: 1rem (16px) with 1.6 line height

### Spacing
- **Base Unit**: 0.25rem (4px)
- **Spacing Scale**: 0.25, 0.5, 1, 1.5, 2, 3, 4, 5, 6

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_ENVIRONMENT=development
REACT_APP_GOOGLE_ANALYTICS_ID=your_ga_id_here
REACT_APP_CONTACT_FORM_ENDPOINT=https://your-backend.com/api/contact
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_DEBUG_MODE=true
```

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy!

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 📚 API Documentation

### Contact Form Endpoint

**POST** `/api/contact`

Submit a contact form message.

#### Request Body
```json
{
  "email": "user@example.com",
  "message": "Hello, I'd like to discuss a project opportunity.",
  "name": "John Doe"
}
```

#### Response
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": "msg_123",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format"
  }
}
```

## 🔒 Security

- All user inputs are validated and sanitized
- Environment variables are used for sensitive configuration
- HTTPS is enforced in production
- CORS is properly configured for API endpoints

## 📈 Performance

- Images are optimized and lazy-loaded
- Code splitting for better initial load times
- CSS and JavaScript are minified in production
- Service worker for offline functionality (planned)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style Guidelines

- Use TypeScript for all new code
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new functionality
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Muahua Vang**
- Email: muahuavang@gmail.com
- Location: Madison, WI
- Phone: 608-658-6206

## 🙏 Acknowledgments

- React team for the amazing framework
- Framer Motion for smooth animations
- Font Awesome for the icon library
- The open-source community for inspiration and tools

---

**Note**: This portfolio is actively maintained and updated. For the latest version, please check the repository or contact the author directly.
