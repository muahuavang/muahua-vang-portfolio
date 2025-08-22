# 🚀 Muahua Ulysses Vang - Portfolio Website

A modern, responsive portfolio website built with **React**, **TypeScript**, and **Framer Motion**. Features include dark/light mode toggle, mobile-responsive hamburger menu, smooth animations, and automated deployment.

## ✨ Features

### 🎨 Design & User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes with automatic system preference detection
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Modern UI**: Clean, professional design with gradient accents and glass-morphism effects

### 🔧 Functionality
- **Theme Persistence**: Remembers user's theme preference using localStorage
- **Floating Contact Button**: Appears when scrolling and follows the user
- **Smooth Scrolling**: Navigation links smoothly scroll to sections
- **Hamburger Menu**: Mobile-responsive navigation with animated transitions
- **Contact Form**: Functional contact form with validation
- **Mobile-First**: Responsive design that works perfectly on all devices

### 🛠️ Technical Features
- **React 18**: Latest React features with hooks and functional components
- **TypeScript**: Strict type checking for better code quality
- **CSS Variables**: Dynamic theming with CSS custom properties
- **Framer Motion**: Performance-optimized animations
- **Responsive Grid**: CSS Grid and Flexbox for modern layouts
- **Accessibility**: Semantic HTML and keyboard navigation support

## 📁 Project Structure

```
portfolio-react-ts/
├── public/                 # Static assets
│   ├── IMG_2526.jpeg     # Profile image
│   └── index.html        # HTML template
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── About.tsx     # About section
│   │   ├── Competencies.tsx # Skills showcase
│   │   ├── Contact.tsx   # Contact form
│   │   ├── Education.tsx # Education history
│   │   ├── FloatingContact.tsx # Floating contact button
│   │   ├── Footer.tsx    # Site footer
│   │   ├── Header.tsx    # Navigation header
│   │   ├── Hero.tsx      # Hero section
│   │   ├── Projects.tsx  # Projects showcase
│   │   └── Skills.tsx    # Technical skills
│   ├── App.tsx           # Main app component
│   ├── App.css           # Global styles
│   ├── components.css    # Component-specific styles
│   ├── index.css         # Base styles
│   └── index.tsx         # App entry point
├── .github/              # GitHub Actions workflows
├── behind_the_scenes/    # Deployment scripts and docs
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/muahuavang/My-Portfolio-Site-Draft.git
   cd My-Portfolio-Site-Draft
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

4. **Open in browser**: Navigate to `http://localhost:3000`

## 🎯 Available Scripts

- **`npm start`**: Start development server
- **`npm run build`**: Build for production
- **`npm test`**: Run tests
- **`npm run eject`**: Eject from Create React App (not recommended)

## 🚀 Deployment

### Automatic Deployment (Recommended)
The portfolio automatically deploys to GitHub Pages when you push to the main branch.

### Manual Deployment
Use the provided deployment scripts in the `behind_the_scenes/` folder:

#### Windows (PowerShell)
```powershell
.\behind_the_scenes\deploy.ps1
.\behind_the_scenes\deploy.ps1 -CommitMessage "Add new feature"
```

#### Windows (Batch)
```cmd
behind_the_scenes\deploy.bat
```

#### Cross-Platform (Bash)
```bash
chmod +x behind_the_scenes/deploy.sh
./behind_the_scenes/deploy.sh
./behind_the_scenes/deploy.sh -f  # Force deployment
```

### GitHub Actions
The repository includes a GitHub Actions workflow that:
- Automatically builds the project on push/PR
- Deploys to GitHub Pages
- Provides build status feedback
- Comments on pull requests

## 🎨 Customization

### Personal Information
Edit the following components to personalize your portfolio:
- **`Hero.tsx`**: Update name, title, and description
- **`About.tsx`**: Modify personal information and stats
- **`Projects.tsx`**: Add your projects and work
- **`Education.tsx`**: Update academic background
- **`Contact.tsx`**: Change contact details

### Styling
Modify CSS files to customize:
- **Colors**: Update CSS variables in `App.css`
- **Layouts**: Adjust grid layouts and spacing
- **Animations**: Modify transition durations and effects
- **Responsive breakpoints**: Customize mobile/tablet layouts

### Theme Colors
The portfolio uses CSS variables for easy theming:
```css
:root {
  --accent-primary: #4dabf7;    /* Blue */
  --accent-secondary: #a855f7;   /* Purple */
  --bg-primary: #ffffff;         /* Light background */
  --text-primary: #212529;       /* Dark text */
}

.dark-mode {
  --bg-primary: #1a1a1a;         /* Dark background */
  --text-primary: #ffffff;       /* Light text */
}
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🌙 Dark Mode Features

- **Automatic Detection**: Detects system preference on first visit
- **Manual Toggle**: Sun/moon icon in the header
- **Persistence**: Remembers user's choice across sessions
- **Smooth Transitions**: All elements transition smoothly between themes

## 🔧 Development

### Adding New Components
1. Create component file in `src/components/`
2. Add component to `App.tsx`
3. Import and use in your app
4. Add corresponding styles to `components.css`

### Styling Guidelines
- Use CSS variables for colors and spacing
- Follow mobile-first responsive design
- Maintain consistent naming conventions
- Use semantic HTML elements

### TypeScript Best Practices
- Define proper interfaces for props
- Use strict type checking
- Avoid `any` types
- Leverage React.FC for functional components

## 🧪 Testing

### Local Testing
- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Test responsive design on different screen sizes
- Verify all interactive elements work correctly
- Check accessibility features

### Performance Testing
- Use browser DevTools for performance analysis
- Check bundle size with `npm run build`
- Verify image optimization
- Test loading speeds on mobile devices

## 🚨 Troubleshooting

### Common Issues
1. **Build Failures**: Check TypeScript errors and dependencies
2. **Styling Issues**: Verify CSS variables and responsive breakpoints
3. **Performance Problems**: Optimize images and check bundle size
4. **Mobile Issues**: Test responsive design and touch interactions

### Debug Commands
```bash
# Check for TypeScript errors
npm run build

# Test production build locally
npx serve -s build

# Check bundle size
npm run build -- --analyze

# Run linting (if configured)
npm run lint
```

## 📚 Dependencies

### Core Dependencies
- **React**: 18.2.0 - UI library
- **TypeScript**: 4.9.5 - Type safety
- **Framer Motion**: 10.16.16 - Animations

### Development Dependencies
- **React Scripts**: 5.0.1 - Build tools
- **@types/react**: Type definitions
- **@types/node**: Node.js types

## 🌐 Hosting Options

### GitHub Pages (Current)
- **Free hosting** for static sites
- **Automatic deployment** from main branch
- **Custom domain** support
- **HTTPS enabled** by default

### Alternative Hosting
- **Netlify**: Free tier with form handling
- **Vercel**: Optimized for React apps
- **Firebase**: Google's hosting solution

## 🤝 Contributing

Feel free to:
- Report bugs or issues
- Suggest new features
- Submit improvements
- Share your customized version

## 📞 Support

For questions or support:
1. Check the [deployment guide](behind_the_scenes/DEPLOYMENT.md)
2. Review GitHub Issues
3. Check GitHub Actions for build status
4. Test locally before reporting issues

## 📄 License

This portfolio template is free to use and modify for personal and commercial projects.

---

**Built with ❤️ using React, TypeScript, and Framer Motion**

**Live Site**: [Your Portfolio](https://muahuavang.github.io/My-Portfolio-Site-Draft/)
**Repository**: [GitHub](https://github.com/muahuavang/My-Portfolio-Site-Draft)
