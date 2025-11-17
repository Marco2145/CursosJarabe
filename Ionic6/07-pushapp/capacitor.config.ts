import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: '07-pushapp',
  webDir: 'www',
  plugins: {
    // @capacitor/push-notifications
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    // Nativamente, para enviar peticiones http
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
