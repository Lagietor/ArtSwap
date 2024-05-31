declare namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_URL: string;
      REACT_APP_VERSION: string;
      VITE_SITE_URL: string;
      VITE_GOOGLE_CLIENT_ID: string;
      VITE_GITHUB_CLIENT_ID: string;
    }
  }