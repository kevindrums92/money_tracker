import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import store from './src/store';
import { initDB } from './src/database/connector';

import { registerScheduledBackgroundTask } from './src/backgroundTasks/scheduledBackgroundFetch';
import * as Notifications from 'expo-notifications';
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [dbLoaded, setDbLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function _initDB() {
      try {
        await initDB();
        setDbLoaded(true);
      } catch (error) {
        console.log(error);
        setDbLoaded(true);
      }
    }
    _initDB();

    registerScheduledBackgroundTask();
  });

  if (!isLoadingComplete || !dbLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar style="light" />
        </Provider>
      </SafeAreaProvider>
    );
  }
}