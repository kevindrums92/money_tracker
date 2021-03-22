import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import store from './src/store';
import { bgtask, registerScheduledBackgroundTask, TASKNAME } from './src/backgroundTasks/scheduledBackgroundFetch';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
TaskManager.defineTask(TASKNAME, bgtask);

registerScheduledBackgroundTask();

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
  
  if (!isLoadingComplete) {
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