# My Company Website

A modern, responsive company website built with React and React Router. This project showcases the company's services, team, and provides a contact form for potential clients.

## Features

- **Responsive Design**: Works on all device sizes
- **Modern UI**: Clean and professional interface
- **Interactive Elements**: Hover effects, form validation, and smooth transitions
- **Multi-page Navigation**: Seamless client-side routing
- **Contact Form**: With validation and submission feedback

## Technologies Used

- React 18
- React Router 6
- Vite (Build Tool)
- CSS-in-JS (Inline Styles)
- ES6+ JavaScript

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later) or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/my-company.git
   cd my-company
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

In the project directory, you can run:

- `npm run dev` or `yarn dev` - Starts the development server
- `npm run build` or `yarn build` - Builds the app for production
- `npm run preview` or `yarn preview` - Serves the production build locally
- `npm test` or `yarn test` - Launches the test runner

## Project Structure

```
my-company/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Navbar.jsx   # Navigation bar
│   │   └── Footer.jsx   # Footer component
│   ├── pages/           # Page components
│   │   ├── Home.jsx     # Home page
│   │   ├── About.jsx    # About page
│   │   ├── Services.jsx # Services page
│   │   └── Contact.jsx  # Contact page
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```

## Customization

### Changing Colors

To change the main theme color, update the following color values in the components:

- Primary Color: `#1a237e` (dark blue)
- Hover Color: `#0d47a1` (lighter blue)
- Background: `#f5f5f5` (light gray)
- Text: `#333` (dark gray)

### Adding New Pages

1. Create a new component in the `src/pages` directory
2. Add a new route in `src/App.jsx`
3. Update the navigation in `src/components/Navbar.jsx`

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/your-username/my-company](https://github.com/your-username/my-company)

## Acknowledgments

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)
- [Google Fonts](https://fonts.google.com/)
