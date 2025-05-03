# NationScope

![NationScope Logo](web-app/public/logo.png)

NationScope is a modern web application that allows users to explore and discover information about countries around the world. The platform provides detailed country profiles, comparison tools, and a favorites system to help users organize and track countries of interest.


## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Development Tools](#development-tools)

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Building for Production](#building-for-production)
  - 

- [Project Structure](#project-structure)
- [Usage](#usage)
  - [Public Pages](#public-pages)
  - [Protected Pages (requires login)](#protected-pages-requires-login)

- [Testing](#testing)
  - [Automated Test Suite](#automated-test-suite)
  - [Prerequisites](#prerequisites-1)
  - [Test Structure](#test-structure)
  - [Running Tests](#running-tests)
  - [View reports](#view-reports)
  - [Test Configuration](#test-configuration)

- [Acknowledgements](#acknowledgements)
- [REST Countries API Endpoints](#rest-countries-api-endpoints)
- [Contact](#contact)

## Features

- **Country Exploration**: Browse and search through a comprehensive database of countries
- **Detailed Country Profiles**: Access in-depth information about demographics, economy, geography, and more
- **Region-based Filtering**: Explore countries by geographical regions
- **Favorites System**: Save and organize your favorite countries for quick access
- **User Authentication**: Secure login system to protect user data and preferences
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Dark/Light Theme**: Choose your preferred visual theme for a better user experience

## Technologies Used

### Frontend
- React 19
- React Router v7
- Ant Design (UI components)
- TailwindCSS (styling)
- ApexCharts (data visualization)
- Firebase (authentication)

### Development Tools
- Vite (build tool)
- ESLint (code linting)
- Prettier (code formatting)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-devkyoshi.git
   ```

2. Install dependencies for the web application:
   ```bash
   cd web-app
   npm install
   ```

3. Create a `.env` file in the web-app directory with your Firebase configuration:
   ```
   VITE_REACT_COUNTRY_API_URL=https://restcountries.com/v3.1
   SKIP_PREFLIGHT_CHECK=true
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### Running the Application

1. Start the development server:
   ```bash
    npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
    npm run build
```

The built files will be in the `dist` directory and can be served using any static file server.

## Project Structure

```
nationscope/
├── web-app/                  # Main web application
│   ├── public/               # Static assets (images, icons)
│   ├── src/                  # Source code
│   │   ├── components/       # Reusable UI components
│   │   ├── config/           # Configuration files
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Application pages
│   │   ├── tests/            # Test files
│   │   ├── services/         # API services
│   │   ├── App.jsx           # Main application component
│   │   └── main.jsx          # Application entry point
│   ├── .env                  # Environment variables
│   ├── index.html            # HTML template
│   ├── package.json          # Dependencies and scripts
│   └── vite.config.js        # Vite configuration
└── README.md                 # Project documentation
```

## Usage

### Public Pages

- **Home Page**: Introduction to NationScope with feature highlights
- **Login Page**: User authentication

### Protected Pages (requires login)

- **Dashboard**: Overview of countries with search and filtering options
- **Country Profile**: Detailed information about a specific country
- **Region Page**: Browse countries by geographical regions
- **User Profile**: Manage user settings and preferences


## Testing

### Automated Test Suite

NationScope includes a comprehensive test suite using Python, pytest, and Selenium WebDriver to validate critical functionality across the application.

**Features**:
- Cross-browser testing (Edge/Chromium)
- Parallel test execution support
- HTML test reports generation
- Headless mode for CI/CD pipelines
- Automatic browser driver management

### Prerequisites
- Python 3.8+
- pip package manager
- Microsoft Edge browser
- Application running at `http://localhost:5173`

### Test Structure

- **tests/**: Directory containing all test files
  - **test_auth_login.py**: Tests for user authentication and login functionality
  - **test_country_profile.py**: Tests for country profile page functionality
  - **test_region_page.py**: Tests for region page functionality
  - **test_favorites.py**: Tests for favorites system functionality
  - **conftest.py**: Configuration file for pytest, including fixtures and setup
  


### Running Tests

1. **Install dependencies**:
```bash
  pip install -r tests/requirements.txt
```

### Execute tests

``` bash 
   # Run all tests with verbose output
   pytest tests/ -v
   
   # Generate HTML report
   pytest tests/ -v --html=test-report.html
   
   # Run specific test file
   pytest tests/test_auth_login.py -v
   
   # Run in headless mode (no browser window)
   pytest tests/ -v --headless

```

### View reports
- Open `test-report.html` in a web browser to view the test report.

### Test Configuration
- Environment variables in `conftest.py`:
- BASE_URL: Application URL (default: http://localhost:5173)
- HEADLESS_MODE: Set to True for CI/CD pipelines
- IMPLICIT_WAIT: Global timeout for element location (default: 10s)



## Acknowledgements

- Country data provided by [REST Countries API](https://restcountries.com/)
- Icons from [Ant Design Icons](https://ant.design/components/icon/) and [Lucide React](https://lucide.dev/)
- Background images from [Freepik](https://freepik.com/)


## REST Countries API Endpoints

| Endpoint                     | Description             |
|------------------------------|-------------------------|
| `/v3.1/all`                  | Get all countries       |
| `/v3.1/name/{name}`          | Get country by name     |
| `/v3.1/alpha/{currencyCode}` | Get country by currency |
| `/v3.1/region/{region}`      | Get countries by region |



## Contact and Developer Information

- Ashan Tharindu - [GitHub Profile](https://github.com/devkyoshi)

- Project Link: [https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-devkyoshi#](https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-devkyoshi#)

- Live Demo: [NationScope](https://nationscope.vercel.app/)