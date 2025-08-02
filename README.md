# cryptomafia

A Tauri desktop application with React frontend that can also be deployed as a web application.

## Development

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Building for Production
```bash
cd frontend
npm run build
```

## Deployment

This project is configured to automatically deploy the React frontend to GitHub Pages when changes are pushed to the main branch.

### GitHub Pages Deployment

The frontend is automatically deployed to GitHub Pages at: `https://lorenzogm.github.io/cryptomafia/`

The deployment workflow:
1. Builds the React frontend with the correct base path for GitHub Pages
2. Uploads the built files to GitHub Pages
3. Makes the site available at the GitHub Pages URL

### Manual Deployment

To deploy manually:
1. Ensure GitHub Pages is enabled in repository settings
2. Push changes to the main branch
3. The GitHub Actions workflow will automatically build and deploy

### Local Preview

To preview the built application locally:
```bash
cd frontend
npm run build
npm run preview
```