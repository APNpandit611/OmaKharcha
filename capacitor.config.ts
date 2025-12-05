import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.omakharcha.app',
  appName: 'OmaKharcha',
  server: {
     url: 'http://localhost:3000',
    // url: 'https://oma-kharcha.vercel.app', // Your running Next.js app
    cleartext: false,              // Needed for HTTP
  },
};

export default config;
