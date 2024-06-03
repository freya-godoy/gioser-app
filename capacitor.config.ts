import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'medic-br-desk',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
