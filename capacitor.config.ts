import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sightaid.app',
  appName: 'SightAid',
  webDir: 'dist',
  android: {
    allowMixedContent: true,
    backgroundColor: '#0f172a',
    webContentsDebuggingEnabled: false,
    hideScrollbar: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      backgroundColor: '#1b7ef5',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      spinnerColor: '#ffffff',
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#1b7ef5',
      overlaysWebView: false,
    },
    Geolocation: {
      permissions: ['location'],
    },
  },
  server: {
    androidScheme: 'https',
  },
};

export default config;
